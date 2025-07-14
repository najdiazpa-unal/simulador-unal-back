const express = require('express');
const cors = require('cors');
const { simulacionesEjemplo } = require('./mocks/mockData');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Example in-memory data (replace with DB in production)
let simulaciones = simulacionesEjemplo;

// GET all simulaciones
app.get('/api/simulaciones', (req, res) => {
  res.json(simulaciones);
});

// GET one simulacion by id
app.get('/api/simulaciones/:id', (req, res) => {
  const simulacion = simulaciones.find(s => s.id === req.params.id);
  if (!simulacion) return res.status(404).json({ error: 'Not found' });
  res.json(simulacion);
});

// CREATE new simulacion
app.post('/api/simulaciones', (req, res) => {
  const nueva = { ...req.body, id: Date.now().toString() };
  simulaciones.push(nueva);
  res.status(201).json(nueva);
});

// UPDATE simulacion
app.put('/api/simulaciones/:id', (req, res) => {
  const idx = simulaciones.findIndex(s => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  simulaciones[idx] = { ...simulaciones[idx], ...req.body };
  res.json(simulaciones[idx]);
});

// DELETE simulacion
app.delete('/api/simulaciones/:id', (req, res) => {
  simulaciones = simulaciones.filter(s => s.id !== req.params.id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});