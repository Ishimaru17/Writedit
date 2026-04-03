
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// GET ALL
app.get('/api/personnages/:livre', (req, res) => {
  const livre = req.params.livre;

  const dirPath = path.join(__dirname, 'data', 'livres', livre, 'personnages');

   if (!fs.existsSync(dirPath)) {
    return res.json([]);
  }

  const files = fs.readdirSync(dirPath);

  const data = files.map(file => {
    const content = JSON.parse(fs.readFileSync(path.join(dirPath, file)));
    return {
      ...content,
      filename: file
    };
  });

  res.json(data);
});


// UPDATE
app.post('/api/personnages/update/:livre', (req, res) => {
  const livre = req.params.livre;

  const dirPath = path.join(__dirname, 'data', 'livres', livre, 'personnages');

  const updatedChar = req.body;

  const filePath = path.join(dirPath, updatedChar.filename);

  fs.writeFileSync(filePath, JSON.stringify(updatedChar, null, 2));

  res.json(updatedChar);
});



// CREATE
app.post('/api/personnages/create/:livre', (req, res) => {
  const livre = req.params.livre;

  const dirPath = path.join(__dirname, 'data', 'livres', livre, 'personnages');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const newChar = req.body;

  const filename = 'char_' + Date.now() + '.json';

  const filePath = path.join(dirPath, filename);

  fs.writeFileSync(filePath, JSON.stringify(newChar, null, 2));

  res.json(newChar);
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

//Wiki
app.get('/api/wiki/:livre', (req, res) => {
  const livre = req.params.livre;

  const dirPath = path.join(__dirname, 'data', 'livres', livre, 'wiki');

  const files = fs.readdirSync(dirPath);

  const data = files.map(file => ({
    name: file,
    path: `/wiki/${livre}/wiki/${file}`
  }));

  res.json(data);
});


// servir les images wiki
app.use('/wiki', express.static(path.join(__dirname, 'data', 'livres')));



app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


