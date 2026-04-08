
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

app.get('/api/texte/:livre/:file', (req, res) => {
  const { livre, file } = req.params;

  const filePath = path.join(__dirname, 'data', 'livres', livre, 'texte', file);

  if (!fs.existsSync(filePath)) {
    return res.send('');
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  res.send(content);
});

app.post('/api/texte/save/:livre/:file', (req, res) => {
  const { livre, file } = req.params;
  const { content } = req.body;

  const dirPath = path.join(__dirname, 'data', 'livres', livre, 'texte');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, file);

  fs.writeFileSync(filePath, content);

  res.json({ success: true });
});

const { Document, Packer, Paragraph } = require('docx');

app.get('/api/export/:livre/:file', async (req, res) => {
  const { livre, file } = req.params;

  const filePath = path.join(__dirname, 'data', 'livres', livre, 'texte', file);

  const text = fs.readFileSync(filePath, 'utf-8');

  const doc = new Document({
    sections: [{
      children: text.split('\n').map(line => new Paragraph(line))
    }]
  });

  const buffer = await Packer.toBuffer(doc);

  res.setHeader('Content-Disposition', `attachment; filename=${file}.docx`);
  res.send(buffer);
});


app.get('/api/texte/:livre', (req, res) => {
  const { livre } = req.params;

  const dirPath = path.join(__dirname, 'data', 'livres', livre, 'texte');

  if (!fs.existsSync(dirPath)) {
    return res.json([]);
  }

  const files = fs.readdirSync(dirPath);

  res.json(files);
});

app.post('/api/stats', (req, res) => {
  const { written, net } = req.body;

  const filePath = path.join(__dirname, 'data', 'stats.json');

  let stats = {};

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      stats = raw ? JSON.parse(raw) : {};
    }
  } catch {
    stats = {};
  }

  const today = new Date().toISOString().split('T')[0];

  if (!stats[today]) {
    stats[today] = { written: 0, net: 0 };
  }

  stats[today].written += written;
  stats[today].net += net;

  fs.writeFileSync(filePath, JSON.stringify(stats, null, 2));

  res.json(stats);
});



app.get('/api/stats', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'stats.json');

  try {
    if (!fs.existsSync(filePath)) {
      return res.json({});
    }

    const raw = fs.readFileSync(filePath, 'utf-8');

    if (!raw) {
      return res.json({});
    }

    const stats = JSON.parse(raw);

    res.json(stats);

  } catch (err) {
    console.error("Erreur lecture stats :", err);
    res.json({}); // évite crash front
  }
});

app.get('/api/totalWords/:livre', (req, res) => {
  const { livre } = req.params;

  const dirPath = path.join(__dirname, 'data', 'livres', livre, 'texte');

  if (!fs.existsSync(dirPath)) {
    return res.json({ total: 0 });
  }

  const files = fs.readdirSync(dirPath);

  let total = 0;

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const text = fs.readFileSync(filePath, 'utf-8');

    const words = text
      .replace(/<[^>]*>/g, '') // enlève HTML
      .trim()
      .split(/\s+/)
      .filter(w => w.length > 0).length;

    total += words;
  });

  res.json({ total });
});

app.get('/api/search/:livre', (req, res) => {
  const { livre } = req.params;
  const query = req.query.q?.toLowerCase();

  const dirPath = path.join(__dirname, 'data/livres', livre, 'texte');

  if (!fs.existsSync(dirPath)) {
    return res.json([]);
  }

  const files = fs.readdirSync(dirPath);

  const results = [];

  files.forEach(file => {
    const text = fs.readFileSync(path.join(dirPath, file), 'utf-8');

    if (text.toLowerCase().includes(query)) {
      results.push({
        file,
        preview: text.substring(0, 200)
      });
    }
  });

  res.json(results);
});



app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


