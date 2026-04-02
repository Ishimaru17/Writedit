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

function goHome() {
  document.getElementById('sidebar').classList.add('hidden');

  const content = document.getElementById('content');
  content.innerHTML = `
    <h1>Serment maudit</h1>
    <button onclick="enterApp()">Entrer</button>
  `;
}

function enterApp() {
  document.getElementById('sidebar').classList.remove('hidden');
  loadCharacters(); // page par défaut
}

function showDetail(index) {
  const char = characters[index];
  const content = document.getElementById('content');

  content.innerHTML = `
    <div>
      <h2>${char.prenom} ${char.nom}</h2>

      <div class="category">
        <h3 onclick="toggleCategory(this)">Etat civil ▾</h3>
        <div class="category-content">
          <div class="inline-fields">
            <div>
              <label>Prénom</label>
              <input id="prenom" value="${char.prenom || ''}">
            </div>
            <div>
              <label>Nom</label>
              <input id="nom" value="${char.nom || ''}">
            </div>
            <div>
              <label>Surnoms</label>
              <input id="surnoms" value="${char.surnoms || ''}">
            </div>
          </div>

          <div class="inline-fields">
            <div>
              <label>Race</label>
              <input id="race" value="${char.race || ''}">
            </div>
            <div>
              <label>Sexe</label>
              <input id="sexe" value="${char.sexe || ''}">
            </div>
            <div>
              <label>Orientation sexuelle</label>
              <input id="orientation" value="${char.orientation || ''}">
            </div>
          </div>


          <div class="inline-fields">
            <div>
              <label>Age</label>
              <input id="age" value="${char.age || ''}">
            </div>
            <div>
              <label>Date naissance</label>
              <input id="daten" value="${char.daten || ''}">
            </div>
            <div>
              <label>Lieu naissance</label>
              <input id="lieun" value="${char.lieun || ''}">
            </div>
          </div>


          <div class="inline-fields">
            <div>
              <label>Lieu résidence</label>
              <input id="lieur" value="${char.lieur || ''}">
            </div>
            <div>
              <label>Occupation</label>
              <input id="occupation" value="${char.occupation || ''}">
            </div>
            <div>
              <label>Ame soeur</label>
              <input id="amesoeur" value="${char.amesoeur || ''}">
            </div>
            <div>
              <label>Situation de famille</label>
              <input id="sfamille" value="${char.sfamille || ''}">
            </div>
          </div>
        </div>
      </div>

      <div class="category">
        <h3 onclick="toggleCategory(this)">Apparence ▾</h3>
        <div class="category-content">
          <div class="inline-fields">
            <div>
              <label>Taille</label>
              <input id="taille" value="${char.taille || ''}">
            </div>
            <div>
              <label>Corpulence</label>
              <input id="corpulence" value="${char.corpulence || ''}">
            </div>
            <div>
              <label>Voix</label>
              <input id="voix" value="${char.voix || ''}">
            </div>
          </div>

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

      <div class="category">
        <h3 onclick="toggleCategory(this)">Caractère ▾</h3>
        <div class="category-content">
          <div class="inline-fields">
            <div>
              <label>Qualités</label>
              <textarea id="qualites">${char.qualites || ''}</textarea>
            </div>
            <div>
              <label>Défauts</label>
              <textarea id="defauts">${char.defauts || ''}</textarea>
            </div>
          </div>

          <div class="inline-fields">
            <div>
              <label>Goûts</label>
              <textarea id="gouts">${char.gouts || ''}</textarea>
            </div>
            <div>
              <label>Tics</label>
              <textarea id="tics">${char.tics || ''}</textarea>
            </div>
            <div>
              <label>Peurs</label>
              <textarea id="peurs">${char.peurs || ''}</textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="category">
        <h3 onclick="toggleCategory(this)">Profil ▾</h3>
        <div class="category-content">
          <div class="inline-fields">
            <div>
              <label>Expressions</label>
              <textarea id="expressions">${char.expressions || ''}</textarea>
            </div>
            <div>
              <label>Pouvoirs</label>
              <textarea id="pouvoirs">${char.pouvoirs || ''}</textarea>
            </div>
          </div>

          <div class="inline-fields">
            <div>
              <label>Secrets</label>
              <textarea id="secrets">${char.secrets || ''}</textarea>
            </div>
            <div>
              <label>Lieux marquants</label>
              <textarea id="lieuxm">${char.lieuxm || ''}</textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="category">
        <h3 onclick="toggleCategory(this)">Evolution ▾</h3>
        <div class="category-content">
          <div class="inline-fields">
            <div>
              <label>Buts, Objectifs</label>
              <textarea id="buts">${char.buts || ''}</textarea>
            </div>
          </div>

          <div class="inline-fields">
            <div>
              <label>Passé</label>
              <textarea id="passe">${char.passe || ''}</textarea>
            </div>
            <div>
              <label>Présent</label>
              <textarea id="present">${char.present || ''}</textarea>
            </div>
            <div>
              <label>Futur</label>
              <textarea id="futur">${char.futur || ''}</textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="category">
        <h3 onclick="toggleCategory(this)">Stats ▾</h3>
        <div class="category-content">
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
            <div>
              <label>Robustesse</label>
              <input id="robustesse" type="number" value="${char.stats?.robustesse || 0}">
            </div>
          </div>

          <div class="inline-fields">
            <div>
              <label>Sociabilité</label>
              <input id="sociabilite" type="number" value="${char.stats?.sociabilite || 0}">
            </div>
            <div>
              <label>Empathie</label>
              <input id="empathie" type="number" value="${char.stats?.empathie || 0}">
            </div>
            <div>
              <label>Perception</label>
              <input id="perception" type="number" value="${char.stats?.perception || 0}">
            </div>
          </div>

          <div class="chart-container">
            <canvas id="statsChart"></canvas>
          </div>
      </div>
    </div


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
        labels: ['Intelligence', 'Agilité', 'Force', 'Robustesse', 'Sociabilité', 'Empathie', 'Perception'],
        datasets: [{
          label: 'Stats',
          data: [
            char.stats?.intelligence || 0,
            char.stats?.agilite || 0,
            char.stats?.force || 0,
            char.stats?.robustesse || 0,
            char.stats?.sociabilite || 0,
            char.stats?.empathie || 0,
            char.stats?.perception || 0
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        scales: {
          r: {
            min: 0,
            max: 20
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
  char.qualites = document.getElementById('qualites').value;
  char.defauts = document.getElementById('defauts').value;
  char.gouts = document.getElementById('gouts').value;
  char.tics = document.getElementById('tics').value;
  char.peurs = document.getElementById('peurs').value;
  char.expressions = document.getElementById('expressions').value;
  char.pouvoirs = document.getElementById('pouvoirs').value;
  char.secrets = document.getElementById('secrets').value;
  char.lieuxm = document.getElementById('lieuxm').value;
  char.buts = document.getElementById('buts').value;
  char.passe = document.getElementById('passe').value;
  char.present = document.getElementById('present').value;
  char.futur = document.getElementById('futur').value;
  char.stats = {
    intelligence: Number(document.getElementById('intelligence').value),
    agilite: Number(document.getElementById('agilite').value),
    force: Number(document.getElementById('force').value),
    robustesse: Number(document.getElementById('robustesse').value),
    sociabilite: Number(document.getElementById('sociabilite').value),
    empathie: Number(document.getElementById('empathie').value),
    perception: Number(document.getElementById('perception').value)
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
    qualites: '',
    defauts: '',
    gouts: '',
    tics: '',
    peurs: '',
    expressions: '',
    pouvoirs: '',
    secrets: '',
    lieuxm: '',
    buts: '',
    passe: '',
    present: '',
    futur: '',
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

async function loadWiki() {
  const res = await fetch('/api/wiki');
  const files = await res.json();

  const content = document.getElementById('content');
  content.innerHTML = '<h2>Wiki</h2><div class="grid"></div>';

  const grid = content.querySelector('.grid');

  files.forEach(file => {
    const card = document.createElement('div');
    card.className = 'card';

    if (file.type === 'image') {
      card.innerHTML = `
        <img src="${file.path}">
        <p>${file.name}</p>
      `;
    } else {
      card.innerHTML = `
        <div class="text-card">📄</div>
        <p>${file.name}</p>
      `;
    }

    card.onclick = () => openWiki(file);

    grid.appendChild(card);
  });
}

async function openWiki(file) {
  const content = document.getElementById('content');

  if (file.type === 'image') {
    content.innerHTML = `
      <h2>${file.name}</h2>
      <img src="${file.path}" style="max-width:100%">
      <button onclick="loadWiki()">Retour</button>
    `;
  } else {
    const res = await fetch(file.path);
    const text = await res.text();

    content.innerHTML = `
      <h2>${file.name}</h2>
      <pre>${text}</pre>
      <button onclick="loadWiki()">Retour</button>
    `;
  }
}


goHome();