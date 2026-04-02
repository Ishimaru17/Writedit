
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const DATA_PATH = path.join(__dirname, 'data/personnages');

// Récupérer tous les personnages
app.get('/api/personnages', (req, res) => {
  fs.readdir(DATA_PATH, (err, files) => {
    if (err) return res.status(500).send(err);

    const characters = files.map(file => {
      const data = fs.readFileSync(path.join(DATA_PATH, file));
      return JSON.parse(data);
    });

    res.json(characters);
  });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

