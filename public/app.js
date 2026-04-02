let characters = [];

async function loadCharacters() {
  const res = await fetch('/api/personnages');
  characters = await res.json();

  const content = document.getElementById('content');
  content.innerHTML = '';

  characters.forEach((char, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    let img = '';
    if (char.image) {
      img = `<img src="${char.image}">`;
    }

    card.innerHTML = `
      ${img}
      <h3>${char.nom} ${char.prenom}</h3>
    `;

    card.onclick = () => showDetail(index);

    content.appendChild(card);
  });
}

function showDetail(index) {
  const char = characters[index];
  const content = document.getElementById('content');

  let img = '';
  if (char.image) {
    img = `<img src="${char.image}" style="max-width:300px;">`;
  }

  content.innerHTML = `
    <div id="detail">
      <h2>${char.nom} ${char.prenom}</h2>

      <p><strong>Race :</strong> ${char.race || ''}</p>
      <p><strong>Sexe :</strong> ${char.sexe || ''}</p>
      <p><strong>Description :</strong> ${char.description || ''}</p>

      ${img}

      <br><br>
      <button onclick="loadCharacters()">Retour</button>
    </div>
  `;
}

// lancer au chargement
loadCharacters();
