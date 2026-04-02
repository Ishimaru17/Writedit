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
          <label>Ame soeur</label>
          <input id="amesoeur" value="${char.amesoeur || ''}">
          <label>Situation de famille</label>
          <input id="sfamille" value="${char.sfamille || ''}">
        </div>
      </div>

      <div class="category">
        <h3 onclick="toggleCategory(this)">Apparence ▾</h3>
        <div class="category-content">
          <label>Taille</label>
          <input id="taille" value="${char.taille || ''}">
          <label>Corpulence</label>
          <input id="corpulence" value="${char.corpulence || ''}">
          <label>Voix</label>
          <input id="voix" value="${char.voix || ''}">

          <div class="inline-fields">
            <div>
              <label>Couleur peau</label>
              <input id="couleurp" value="${char.couleurp || ''}">
            </div>
            <div>
              <label>Couleur yeux</label>
              <input id="couleury" value="${char.couleury || ''}">
            </div>
            <div>
              <label>Couleur cheveux</label>
              <input id="couleurc" value="${char.couleurc || ''}">
            </div>
          </div>

          <div class="inline-fields">
            <div>
              <label>Tenue</label>
              <textarea id="tenue">${char.tenue || ''}</textarea>
            </div>
            <div>
              <label>Accessoires</label>
              <textarea id="accessoires">${char.accessoires || ''}</textarea>
            </div>
          </div>

          <div class="inline-fields">
            <div>
              <label>Eancrage</label>
              <input id="eancrage" value="${char.eancrage || ''}">
            </div>
            <div>
              <label>Tatouage</label>
              <input id="tatouage" value="${char.tatouage || ''}">
            </div>
            <div>
              <label>Cicatrise</label>
              <input id="cicatrise" value="${char.cicatrise || ''}">
            </div>
          </div>

          <label>Description</label>
          <textarea id="description">${char.description || ''}</textarea>
        </div>
      </div>

      <h3>Stats</h3>
      <div class="inline-fields">
        <div>
          <label>Intelligence</label>
          <input id="intelligence" type="number" value="${char.stats?.intelligence || 0}">
        </div>
        <div>
          <label>Agilité</label>
          <input id="agilite" type="number" value="${char.stats?.agilite || 0}">
        </div>
        <div>
          <label>Force</label>
          <input id="force" type="number" value="${char.stats?.force || 0}">
        </div>
      </div>

      <div class="inline-fields">
        <div>
          <label>Charisme</label>
          <input id="charisme" type="number" value="${char.stats?.charisme || 0}">
        </div>
        <div>
          <label>Endurance</label>
          <input id="endurance" type="number" value="${char.stats?.endurance || 0}">
        </div>
      </div>

      <div class="chart-container">
        <canvas id="statsChart"></canvas>
      </div>


      <label>Image locale</label>
      <input type="file" id="imageFile">
      ${char.image ? `<img src="${char.image}" style="max-width:200px;">` : ''}

      <button onclick="saveCharacter(${index})">Enregistrer</button>
      <button onclick="loadCharacters()">Retour</button>
    </div>
  `;

  setTimeout(() => {
    const ctx = document.getElementById('statsChart');

    if (!ctx) return;

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Intelligence', 'Agilité', 'Force', 'Charisme', 'Endurance'],
        datasets: [{
          label: 'Stats',
          data: [
            char.stats?.intelligence || 0,
            char.stats?.agilite || 0,
            char.stats?.force || 0,
            char.stats?.charisme || 0,
            char.stats?.endurance || 0
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
          r: {
            min: 0,
            max: 10
          }
        }
      }
    });
  }, 0);

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
  char.amesoeur = document.getElementById('amesoeur').value;
  char.sfamille = document.getElementById('sfamille').value;
  char.taille = document.getElementById('taille').value;
  char.corpulence = document.getElementById('corpulence').value;
  char.couleurc = document.getElementById('couleurc').value;
  char.couleury = document.getElementById('couleury').value;
  char.couleurp = document.getElementById('couleurp').value;
  char.voix = document.getElementById('voix').value;
  char.tenue = document.getElementById('tenue').value;
  char.accessoires = document.getElementById('accessoires').value;
  char.eancrage = document.getElementById('eancrage').value;
  char.tatouage = document.getElementById('tatouage').value;
  char.cicatrise = document.getElementById('cicatrise').value;
  char.description = document.getElementById('description').value;
  char.stats = {
    intelligence: Number(document.getElementById('intelligence').value),
    agilite: Number(document.getElementById('agilite').value),
    force: Number(document.getElementById('force').value),
    charisme: Number(document.getElementById('charisme').value),
    endurance: Number(document.getElementById('endurance').value)
  };
  
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
    amesoeur: '',
    sfamille: '',
    taille: '',
    corpulence: '',
    couleurc: '',
    couleury: '',
    couleurp: '',
    voix: '',
    tenue: '',
    accessoires: '',
    eancrage: '',
    tatouage: '',
    cicatrise: '',
    description: '',
    stats: {
      intelligence: 5,
      agilite: 5,
      force: 5,
      charisme: 5,
      endurance: 5
    },
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