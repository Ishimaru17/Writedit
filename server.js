
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

// GET ALL
app.get('/api/personnages', (req, res) => {
  const files = fs.readdirSync(DATA_PATH);

  const characters = files.map(file => {
    const data = fs.readFileSync(path.join(DATA_PATH, file));
    const json = JSON.parse(data);
    json._filename = file;
    return json;
  });

  res.json(characters);
});

// UPDATE
app.post('/api/personnages/update', (req, res) => {
  const char = req.body;

  if (!char._filename) {
    return res.status(400).send('Missing filename');
  }

  const filePath = path.join(DATA_PATH, char._filename);

  // on clone sans _filename
  const { _filename, ...cleanChar } = char;

  fs.writeFileSync(filePath, JSON.stringify(cleanChar, null, 2));

  res.sendStatus(200);
});


// CREATE
app.post('/api/personnages/create', (req, res) => {
  const char = req.body;

  const filename = `char_${Date.now()}.json`;
  const filePath = path.join(DATA_PATH, filename);

  char._filename = filename;

  fs.writeFileSync(filePath, JSON.stringify(char, null, 2));

  res.json(char);
});


//Upload image
const multer = require('multer');

// stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // dossier images
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// route pour upload image
app.post('/api/upload', upload.single('image'), (req, res) => {
  console.log(req.file); // DEBUG : pour vérifier que le fichier est reçu
  res.json({ path: '/images/' + req.file.filename });
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


