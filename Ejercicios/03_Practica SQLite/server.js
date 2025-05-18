const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('.'));

// Conexión a la base de datos
const db = new sqlite3.Database('./imdb.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message); 
  }
  console.log('Conectado a la base de datos imdb.db');
});

// Obtener datos de las tablas
app.post('/api/data', (req, res) => {
  const { table } = req.body;
  
  if (!['Actor', 'Casting', 'Movie'].includes(table)) {
    return res.status(400).json({ error: 'Tabla no válida' });
  }

  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?`, [table], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (!row) {
      return res.status(404).json({ error: `La tabla ${table} no existe en la base de datos` });
    }

    db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows || []);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});