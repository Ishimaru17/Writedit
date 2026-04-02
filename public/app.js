let characters = [];

async function loadCharacters() {
  const res = await fetch('/api/personnages');
  characters = await res.json();

  const content = document.getElementById('content');
  content.innerHTML = '';

  characters.forEach((char, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      ${char.image ? `<img src="${char.image}">` : ''}
      <h3>${char.prenom} ${char.nom}</h3>
    `;

    card.onclick = () => showDetail(index);

    content.appendChild(card);
  });
}

function showDetail(index) {
  const char = characters[index];
  const content = document.getElementById('content');

  content.innerHTML = `
    <div>
      <h2>${char.prenom} ${char.nom}</h2>

      <div class="category">
        <h3 onclick="toggleCategory(this)">ETAT CIVIL ▾</h3>
        <div class="category-content">
          <label>Prénom</label>
          <input id="prenom" value="${char.prenom || ''}">
          <label>Nom</label>
          <input id="nom" value="${char.nom || ''}">
          <label>Race</label>
          <input id="race" value="${char.race || ''}">
          <label>Sexe</label>
          <input id="sexe" value="${char.sexe || ''}">
          <label>Orientation sexuelle</label>
          <input id="orientation" value="${char.orientation || ''}">
          <label>Surnoms</label>
          <input id="surnoms" value="${char.surnoms || ''}">
          <label>Age</label>
          <input id="age" value="${char.age || ''}">
          <label>Date naissance</label>
          <input id="daten" value="${char.daten || ''}">
          <label>Lieu naissance</label>
          <input id="lieun" value="${char.lieun || ''}">
          <label>Lieu résidence</label>
          <input id="lieur" value="${char.lieur || ''}">
          <label>Occupation</label>
          <input id="occupation" value="${char.occupation || ''}">
        </div>
      </div>

      <div class="category">
        <h3 onclick="toggleCategory(this)">Apparence ▾</h3>
      <div class="category-content">
      <label>Description</label>
      <textarea id="description">${char.description || ''}</textarea>
      </div>
      </div>

      <label>Image locale</label>
      <input type="file" id="imageFile">
      ${char.image ? `<img src="${char.image}" style="max-width:200px;">` : ''}

      <button onclick="saveCharacter(${index})">Enregistrer</button>
      <button onclick="loadCharacters()">Retour</button>
    </div>
  `;
}

async function saveCharacter(index) {
  const char = characters[index];

  char.nom = document.getElementById('nom').value;
  char.prenom = document.getElementById('prenom').value;
  char.race = document.getElementById('race').value;
  char.sexe = document.getElementById('sexe').value;
  char.orientation = document.getElementById('orientation').value;
  char.surnoms = document.getElementById('surnoms').value;
  char.age = document.getElementById('age').value;
  char.daten = document.getElementById('daten').value;
  char.lieun = document.getElementById('lieun').value;
  char.lieur = document.getElementById('lieur').value;
  char.occupation = document.getElementById('occupation').value;
  char.description = document.getElementById('description').value;
  
  const fileInput = document.getElementById('imageFile');

  if (fileInput.files.length > 0) {
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    char.image = data.path;
  }

  await fetch('/api/personnages/update', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(char)
  });

  loadCharacters();
}

async function createCharacter() {
  const newChar = {
    prenom: 'Nouveau',
    nom: '',
    race: '',
    sexe: '',
    orientation: '',
    surnoms: '',
    age: '',
    daten: '',
    lieun: '',
    lieur: '',
    occupation: '',
    description: '',
    image: ''
  };

  const res = await fetch('/api/personnages/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newChar)
  });

  const created = await res.json();
  characters.push(created);

  loadCharacters();
}

function toggleCategory(header) {
  const content = header.nextElementSibling;
  if(content.style.display === 'none') {
    content.style.display = 'block';
    header.textContent = header.textContent.replace('▸','▾');
  } else {
    content.style.display = 'none';
    header.textContent = header.textContent.replace('▾','▸');
  }
}

loadCharacters();