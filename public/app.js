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
      <h3>${char.nom} ${char.prenom}</h3>
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
      <h2>${char.nom} ${char.prenom}</h2>

      <input id="prenom" value="${char.prenom || ''}" placeholder="Nom">
      <input id="nom" value="${char.nom || ''}" placeholder="Prénom">
      <input id="race" value="${char.race || ''}" placeholder="Race">
      <input id="sexe" value="${char.sexe || ''}" placeholder="Sexe">
      <textarea id="description">${char.description || ''}</textarea>
      
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

loadCharacters();