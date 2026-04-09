let characters = [];
let currentBook = null;
let lastWordCount = 0;
let isLoading = false;
let currentChar = null;


function goHome() {
  document.getElementById('sidebar').classList.add('hidden');

  const content = document.getElementById('content');

  content.innerHTML = `

    <h1>Choisir un livre</h1>

    <div class="grid">
      <div class="card" onclick="selectBook('serment-maudit')">
        <h3>Serment maudit</h3>
      </div>

      <div class="card" onclick="selectBook('egisse-jed')">
        <h3>Egisse-Jed</h3>
      </div>
    </div>
  `;

  document.querySelector('header h1').textContent = "Writedit";

  hideChaptersSidebar();
}

function selectBook(book) {
  currentBook = book;

  document.getElementById('sidebar').classList.remove('hidden');

  updateTitle();
  loadCharacters();
}

function updateTitle() {
  const title = document.querySelector('header h1');

  if (currentBook === 'serment-maudit') {
    title.textContent = 'Serment maudit';
  } else if (currentBook === 'egisse-jed') {
    title.textContent = 'Egisse-Jed';
  } else {
    tile.textContent = 'Writedit'
  }
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
              <label>Ame soeur/Familier</label>
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

async function fetchCharacters() {
  const res = await fetch(`/api/personnages/${currentBook}`);
  characters = await res.json();

  characters.sort((a, b) => {
    return Number(a.filename) - Number(b.filename);
  });
}

async function loadCharacters() {
  await fetchCharacters();

  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Personnages</h2>
    <button onclick="createCharacter()">➕ Nouveau personnage</button>
    <div class="grid" id="charactersGrid"></div>
  `;

  const grid = document.getElementById('charactersGrid');

  characters.forEach((char, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      ${char.image ? `<img src="${char.image}">` : ''}
      <h3>${char.prenom} ${char.nom}</h3>
    `;

    card.onclick = () => showDetail(index);

    grid.appendChild(card);
  });

  hideChaptersSidebar();
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

  await fetch(`/api/personnages/update/${currentBook}`, {
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

  const res = await fetch(`/api/personnages/create/${currentBook}`, {
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
  const res = await fetch(`/api/wiki/${currentBook}`);
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
        ${file.name.endsWith('.png') ? `<img src="${file.path}">` : '<div class="text-card">📄</div>'}
        <p>${file.name}</p>
      `;
    }

    card.onclick = () => openWiki(file);

    grid.appendChild(card);
  });

  hideChaptersSidebar();
}

function openWiki(file) {
  const content = document.getElementById('content');

  if (file.name.endsWith('.png') || file.name.endsWith('.jpg')) {
    content.innerHTML = `
      <h2>${file.name}</h2>
      <img src="${file.path}" style="max-width:100%">
      <button onclick="loadWiki()">Retour</button>
    `;
  } else {
    fetch(file.path)
      .then(res => res.text())
      .then(text => {
        content.innerHTML = `
          <h2>${file.name}</h2>
          <pre>${text}</pre>
          <button onclick="loadWiki()">Retour</button>
        `;
      });
  }
}

function loadTranslator() {
  const content = document.getElementById('content');

  content.innerHTML = `
    <h2>🌍 Traducteur</h2>

    <label>Texte</label>
    <textarea id="translateInput"></textarea>

    <label>De</label>
    <select id="sourceLang">
      <option value="fr">Français</option>
      <option value="en">Anglais</option>
    </select>

    <label>Vers</label>
    <select id="targetLang">
      <option value="en">Anglais</option>
      <option value="fr">Français</option>
    </select>

    <button onclick="translateText()">Traduire</button>

    <h3>Résultat</h3>
    <textarea id="translateOutput" readonly></textarea>
  `;

  hideChaptersSidebar();
}

function translateText() {
  const text = document.getElementById('translateInput').value;
  const source = document.getElementById('sourceLang').value;
  const target = document.getElementById('targetLang').value;

  const url = `https://translate.google.com/?sl=${source}&tl=${target}&text=${encodeURIComponent(text)}&op=translate`;

  window.open(url, '_blank');
}

function loadSynonyms() {
  const content = document.getElementById('content');

  content.innerHTML = `
    <h2>💡 Synonymes</h2>

    <label>Mot</label>
    <input id="synonymInput" placeholder="ex: sombre">

    <button onclick="getSynonyms()">Chercher</button>

    <h3>Résultats</h3>
    <div id="synonymResults"></div>
  `;

  hideChaptersSidebar();
}

async function getSynonyms() {
  const word = document.getElementById('synonymInput').value;

  const res = await fetch(`https://api.datamuse.com/words?ml=${word}`);
  const data = await res.json();

  const resultsDiv = document.getElementById('synonymResults');
  resultsDiv.innerHTML = '';

  data.slice(0, 20).forEach(item => {
    const span = document.createElement('span');
    span.textContent = item.word;
    span.className = 'synonym';

    span.onclick = () => {
      document.getElementById('synonymInput').value = item.word;
    };

    resultsDiv.appendChild(span);
  });
}

async function loadTextEditor(file = null) {
  document.getElementById('chaptersSidebar').classList.remove('hidden');


  const res = await fetch(`/api/texte/${currentBook}`);
  const files = await res.json();

  // tri numérique
  files.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/));
    const numB = parseInt(b.match(/\d+/));
    return numA - numB;
  });

  // 👉 prendre le dernier
  if (!file) {
    file = files[files.length - 1];
  }

  currentFile = file;

  const content = document.getElementById('content');

  content.innerHTML = `
    <h2>✍️ ${file}</h2>

    <div id="saveStatus">📝 En cours...</div>

    <p id="wordCount">0 mots</p>

    <div id="editor" contenteditable="true"></div>

    <button onclick="saveText('${file}')">💾 Sauvegarder</button>
    <button onclick="exportDocx('${file}')">📄 Export Word</button>
    <button id="scrollTopBtn" onclick="scrollEditorTop()">⬆ Haut</button>

  `;

  isLoading = true;

  await loadChapters();
  await fetchCharacters();
  loadCharactersSidebar();



  fetch(`/api/texte/${currentBook}/${file}`)
    .then(res => res.text())
    .then(text => {

      text = linkCharacters(text, characters); // 👈 IMPORTANT

      document.getElementById('editor').innerHTML = text;

      const initialCount = countWords(editor.innerText);
      lastWordCount = initialCount;
      updateWordCount(); // 👈 affiche direct le bon nombre
      
      isLoading = false;
    });

  let saveTimeout;

  document.getElementById('editor').addEventListener('input', () => {
    clearTimeout(saveTimeout);

    showSaveStatus("📝 En cours...");

    saveTimeout = setTimeout(() => {
      saveText(file);
      showSaveStatus("💾 Sauvegardé");
    }, 2000); // 2 secondes après arrêt frappe
  });

  document.getElementById('editor').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  });

  document.getElementById('editor').addEventListener('input', () => {
    if (isLoading) return;

    const current = countWords(editor.innerText);
    const diff = current - lastWordCount;

    let written = 0;
    let net = diff;

    if (diff > 0 && diff < 20) {
      written = diff;
    }

    if (Math.abs(diff) < 20) {
      sendStats(written, net);
    }

    lastWordCount = current;

    updateWordCount();
    });

    lastWordCount = countWords(editor.innerText);

    let quoteOpen = true;

    editor.addEventListener('keydown', (e) => {
      if (e.key === '"') {
        e.preventDefault();

        if (quoteOpen) {
          document.execCommand('insertText', false, '« ');
        } else {
          document.execCommand('insertText', false, ' »');
        }

        quoteOpen = !quoteOpen;
      }
    });

    document.addEventListener('click', (e) => {
      console.log("CLICK", e.target);
      console.log(e.target.dataset.id);
      if (e.target.classList.contains('char-link')) {
        console.log("CHAR CLICKED");

        const id = e.target.dataset.id;

        const char = characters.find(c => c.filename === id);

        if (char) {
          showCharacterDetails(char);
        } else {
          console.log("NOT FOUND", id);
        }
      }
    });


  const colorRes = await fetch(`/api/chapters/color/${currentBook}/${file}`);
  const colorData = await colorRes.json();

  editor.style.background = colorData.color || 'white';
}

function linkCharacters(text, characters) {

  characters.forEach(char => {
    const prenom = char.prenom;

    const regex = new RegExp(`\\b${prenom}\\b`, 'g');

    text = text.replace(regex,
      `<span class="char-link" data-id="${char.filename}">${prenom}</span>`
    );
  });

  return text;
}

async function saveText(file) {
  const text = document.getElementById('editor').innerHTML;

  await fetch(`/api/texte/save/${currentBook}/${file}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: text })
  });
}

function countWords(text) {
  if (!text) return 0;

  return text
    .replace(/\n/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0).length;
}

function exportDocx(file = "chapitre1.txt") {
  window.open(`/api/export/${currentBook}/${file}`);
}

async function loadChapters() {
  const res = await fetch(`/api/texte/${currentBook}`);
  const files = await res.json();
  files.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/));
    const numB = parseInt(b.match(/\d+/));
    return numA - numB;
  });


  const list = document.getElementById('chaptersList');
  list.innerHTML = '';

  files.forEach(file => {
    const div = document.createElement('div');
    div.textContent = file;

    div.onclick = () => loadTextEditor(file);

    list.appendChild(div);
  });
}

function formatText(command) {
  document.execCommand(command, false, null);
}

async function createChapter() {
  const name = prompt("Nom du chapitre ?");
  if (!name) return;

  const file = name.replace(/\s+/g, '-') + '.txt';

  await fetch(`/api/texte/save/${currentBook}/${file}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: "" })
  });

  loadChapters();
}

function hideChaptersSidebar() {
  document.getElementById('chaptersSidebar').classList.add('hidden');
}

function updateWordCount() {
  const text = document.getElementById('editor').innerText;
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);

  document.getElementById('wordCount').textContent = words.length + " mots";
}

async function sendStats(written, net) {
  await fetch('/api/stats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ written, net })
  });
}

async function loadStats() {
  hideChaptersSidebar();

  const res = await fetch('/api/stats');
  const stats = await res.json();

  const today = new Date().toISOString().split('T')[0];
  const dayStats = stats[today] || { written: 0, net: 0 };

  const totalRes = await fetch(`/api/totalWords/${currentBook}`);
  const totalData = await totalRes.json();

  const goal = 300;
  const percent = Math.min((dayStats.net / goal) * 100, 100);

  content.innerHTML = `
    <h2>📊 Stats du jour</h2>

    <p>✍️ Écrits : ${dayStats.written} mots</p>
    <p>🧹 Net : ${dayStats.net} mots</p>

    <p>🎯 Objectif : ${goal} mots</p>

    <div style="background:#ddd; border-radius:10px;">
      <div style="width:${percent}%; background:green; color:white; padding:5px;">
        ${Math.floor(percent)}%
      </div>
    </div>

    <p>📚 Total histoire : ${totalData.total} mots</p>
  `;
}

async function loadCharactersSidebar() {
  const res = await fetch(`/api/personnages/${currentBook}`);
  const characters = await res.json();

  const list = document.getElementById('charactersList');
  list.innerHTML = '';

  characters.forEach(char => {
    const div = document.createElement('div');
    div.className = 'sidebar-char';

    div.textContent = `${char.prenom} ${char.nom}`;

    div.onclick = () => showCharacterDetails(char);

    list.appendChild(div);
  });
}

function showCharacterInline(char) {
  const editor = document.getElementById('editor');

  const text = `
    --- PERSONNAGE ---
    Nom: ${char.prenom} ${char.nom}
    Race: ${char.race}
    Sexe: ${char.sexe}
    Age: ${char.age}
    Description: ${char.description}
    `;

  document.execCommand('insertText', false, text);
}

function showCharacterDetails(char) {
  currentChar = char;
  console.log(currentChar)
  const container = document.getElementById('characterDetails');

  container.innerHTML = `
    <strong>${char.prenom} ${char.nom}</strong><br><br>

    <strong>Etat Civil</strong><br>
    Surnoms: ${char.surnoms || ''}<br>
    Race: ${char.race || ''}<br>
    Age: ${char.age || ''}<br>
    Ame soeur: ${char.amesoeur || ''}<br><br>

    <strong>Apparence</strong><br>
    Taille: ${char.taille || ''}<br>
    Corpulence: ${char.corpulence || ''}<br>
    Couleur peau: ${char.couleurp || ''}<br>
    Couleur yeux: ${char.couleury || ''}<br>
    Couleur cheveux: ${char.couleurc || ''}<br>
    Eancrage: ${char.eancrage || ''}<br>
    Tatouage: ${char.tatouage || ''}<br>
    Cicatrise: ${char.cicatrise || ''}<br>
    Description: ${char.description || ''}<br><br>


    <strong>Profil</strong><br>
    Expressions: ${char.expressions || ''}<br>
    Pouvoirs: ${char.pouvoirs || ''}<br>
    Secrets: ${char.secrets || ''}<br>
    Buts: ${char.buts || ''}<br><br>

    <strong>Stats</strong><br>
    Intelligence: ${char.stats.intelligence || 0}<br>
    Agilité: ${char.stats.agilite || 0}<br>
    Force: ${char.stats.force || 0}<br>
    Robustesse: ${char.stats.robustesse || 0}<br>
    Sociabilité: ${char.stats.sociabilite || 0}<br>
    Empathie: ${char.stats.empathie || 0}<br>
    Perception: ${char.stats.perception || 0}<br><br>
  `;
}

function insertCharacter() {
  if (!currentChar) return;

  document.execCommand(
    'insertText',
    false,
    `${currentChar.prenom} ${currentChar.nom}`
  );
}

function showSaveStatus(text) {
  const el = document.getElementById('saveStatus');
  el.textContent = text;
  el.style.opacity = 1;

  setTimeout(() => {
    el.style.opacity = 0;
  }, 1500);
}

async function search() {
  const q = document.getElementById('searchInput').value;

  const res = await fetch(`/api/search/${currentBook}?q=${q}`);
  const results = await res.json();

  const content = document.getElementById('content');

  content.innerHTML = `<h2>Résultats</h2>`;

  results.forEach(r => {
    const div = document.createElement('div');
    div.className = 'card';

    div.innerHTML = `
      <h3>${r.file}</h3>
      <p>${r.preview}...</p>
    `;

    div.onclick = () => loadTextEditor(r.file);

    content.appendChild(div);
  });
}

function scrollEditorTop() {
  const editor = document.getElementById('editor');

  if (editor) {
    editor.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}


async function setChapterColor(color, clickedButton) {
  const editor = document.getElementById('editor');
  editor.style.background = color;

  await fetch(`/api/chapters/color/${currentBook}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      file: currentFile,
      color
    })
  });

  document.querySelectorAll('.chapter-colors button')
    .forEach(btn => btn.classList.remove('active'));

  if (clickedButton) {
    clickedButton.classList.add('active');
  }
}






goHome();