
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
  const universe = getUniverseFromBook(req.params.livre);

  const dirPath = path.join(
    __dirname,
    'data',
    'univers',
    universe,
    'personnages'
  );

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
  const universe = getUniverseFromBook(req.params.livre);

  const dirPath = path.join(
    __dirname,
    'data',
    'univers',
    universe,
    'wiki'
  );
  
  const files = fs.readdirSync(dirPath);

  const data = files.map(file => ({
    name: file,
    path: `/wiki/${universe}/wiki/${file}`
  }));

  res.json(data);
});


// servir les images wiki
app.use(
  '/wiki',
  express.static(path.join(__dirname, 'data', 'univers'))
);

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

const { Document, Packer, Paragraph, TextRun, AlignmentType } = require('docx');

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


// =============================
// Couleurs de chapitres
// =============================

app.get('/api/chapters/color/:livre/:file', (req, res) => {
  const { livre, file } = req.params;

  const colorPath = path.join(
    __dirname,
    'data/livres',
    livre,
    'chapterColors.json'
  );

  if (!fs.existsSync(colorPath)) {
    return res.json({ color: 'white' });
  }

  const colors = JSON.parse(fs.readFileSync(colorPath, 'utf-8'));

  res.json({
    color: colors[file] || 'white'
  });
});


app.post('/api/chapters/color/:livre', (req, res) => {
  const { livre } = req.params;
  const { file, color } = req.body;

  const colorPath = path.join(
    __dirname,
    'data/livres',
    livre,
    'chapterColors.json'
  );

  let colors = {};

  if (fs.existsSync(colorPath)) {
    colors = JSON.parse(fs.readFileSync(colorPath, 'utf-8'));
  }

  colors[file] = color;

  fs.writeFileSync(
    colorPath,
    JSON.stringify(colors, null, 2)
  );

  res.json({ success: true });
});


//const { Document, Packer, Paragraph, TextRun } = require("docx");

app.get('/api/full-export/:livre', async (req, res) => {
  console.log("REQ PARAMS =", req.params);
  const { livre } = req.params;

  const dirPath = path.join(__dirname, 'data', 'livres', livre, 'texte');
  

  let files = fs.readdirSync(dirPath);

  // tri numérique
  files.sort((a, b) => {
    const numA = parseInt(a.match(/\d+/));
    const numB = parseInt(b.match(/\d+/));
    return numA - numB;
  });

  const paragraphs = [];

   files.forEach((file, index) => {
    let text = fs.readFileSync(path.join(dirPath, file), 'utf-8');

    // =======================
    // 🔥 NETTOYAGE WORD + HTML
    // =======================

    text = text.replace(/<span class="char-link".*?>(.*?)<\/span>/gi, '$1');

    text = text.replace(/<span[\s\S]*?>/gi, '');
    text = text.replace(/<\/span>/gi, '');

    text = text.replace(/<o:p>\s*<\/o:p>/gi, '');
    text = text.replace(/<o:p>/gi, '');
    text = text.replace(/<\/o:p>/gi, '');

    text = text.replace(/&nbsp;/g, ' ');

    text = text.replace(/<br\s*\/?>/gi, '\n');

    text = text.replace(/<\/p>/gi, '\n\n');
    text = text.replace(/<p[^>]*>/gi, '');

    text = text.replace(/<\/div>/gi, '\n\n');
    text = text.replace(/<div[^>]*>/gi, '');

    // garder seulement b / i / u
    text = text.replace(/<(?!\/?(b|strong|i|u)\b)[^>]+>/gi, '');

    // =======================
    // 🔥 RÉPARATION TEXTE (UNE SEULE FOIS)
    // =======================

    text = text.replace(/\r\n/g, '\n');

    let rawLines = text.split('\n');
    let rebuilt = '';

    for (let i = 0; i < rawLines.length; i++) {
      let line = rawLines[i].trim();

      if (!line) {
        rebuilt += '\n\n';
        continue;
      }

      if (!line.match(/[.!?:»"]$/)) {
        rebuilt += line + ' ';
      } else {
        rebuilt += line + '\n';
      }
    }

    text = rebuilt.trim();


    // =======================
    // 🔥 CONVERSION DOCX
    // =======================

    const finalLines = text.split('\n');

    finalLines.forEach(line => {

      if (!line.trim()) return;

      const runs = [];

      const parts = line.split(/(<\/?b>|<\/?strong>|<\/?i>|<\/?u>)/i);

      let bold = false;
      let italic = false;
      let underline = false;

      parts.forEach(part => {

        if (!part) return;

        const lower = part.toLowerCase();

        if (lower === '<b>' || lower === '<strong>') {
          bold = true;
          return;
        }

        if (lower === '</b>' || lower === '</strong>') {
          bold = false;
          return;
        }

        if (lower === '<i>') {
          italic = true;
          return;
        }

        if (lower === '</i>') {
          italic = false;
          return;
        }

        if (lower === '<u>') {
          underline = true;
          return;
        }

        if (lower === '</u>') {
          underline = false;
          return;
        }

        const clean = part.replace(/<[^>]+>/g, '');

        if (!clean.trim()) return;

        runs.push(new TextRun({
          text: clean,
          bold,
          italics: italic,
          underline: underline ? {} : undefined
        }));

      });

      if (runs.length > 0) {

        const trimmed = line.trim();

        const isDialogue =
          trimmed.startsWith('-') ||
          trimmed.startsWith('—');

        const nextLine = finalLines[index + 1]?.trim() || '';

        const nextIsDialogue =
          nextLine.startsWith('-') ||
          nextLine.startsWith('—');

        paragraphs.push(
          new Paragraph({
            children: runs,

            alignment: AlignmentType.JUSTIFIED,

          

            spacing: {
              before: isDialogue ? 0 : 120,
              after: nextIsDialogue ? 0 : (isDialogue ? 0 : 200),
              line: 300
            },


            indent: isDialogue
              ? {
                  left: 300,
                  //hanging: -700
                }
              : undefined
          })
        );
      }



    });

    // saut de page sauf dernier
    if (index < files.length - 1) {
      paragraphs.push(
        new Paragraph({
          children: [],
          pageBreakBefore: true
        })
      );
    }
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs
    }]
  });

  const buffer = await Packer.toBuffer(doc);

  res.setHeader('Content-Disposition', `attachment; filename=${livre}.docx`);
  res.send(buffer);
});

function getUniverseFromBook(book) {

  const metaPath = path.join(
    __dirname,
    'data',
    'livres',
    book,
    'meta.json'
  );

  const meta = JSON.parse(
    fs.readFileSync(metaPath, 'utf-8')
  );

  return meta.universe;
}

app.get('/api/universes', (req, res) => {

  const booksDir = path.join(__dirname, 'data', 'livres');

  const books = fs.readdirSync(booksDir);

  const universes = {};

  books.forEach(book => {

    const metaPath = path.join(
      booksDir,
      book,
      'meta.json'
    );

    if (!fs.existsSync(metaPath)) return;

    const meta = JSON.parse(
      fs.readFileSync(metaPath, 'utf-8')
    );

    if (!universes[meta.universe]) {
      universes[meta.universe] = [];
    }

    universes[meta.universe].push({
      id: book,
      title: meta.title,
      status: meta.status || 'draft',
      order: meta.order || 0
    });
  });

  // tri tomes
  Object.values(universes).forEach(list => {
    list.sort((a, b) => a.order - b.order);
  });

  res.json(universes);
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


