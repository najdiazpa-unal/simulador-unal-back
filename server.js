const express = require('express');
const cors    = require('cors');
const simulacionesEjemplo  = require('./mocks/mockData');
const UserController       = require('./controllers/userController');
const AsignaturaController = require('./controllers/asignaturaController');
const AsignaturaModel      = require('./models/asignaturaModel');
const { readJSON }         = require('./utils');

const app  = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// USUARIOS
app.post('/api/auth', UserController.authenticate);

// Example in-memory data (replace with DB in production)
let simulaciones = simulacionesEjemplo;

// SIMULACIONES
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

// ASIGNATURAS 
// Search asignaturas
app.get('/api/asignaturas/search/:termino', (req, res) => {
  const term  = req.params.termino.toLowerCase();
  const lista = AsignaturaModel.getAll().filter(a =>
    a.nombre.toLowerCase().includes(term)   ||
    a.codigo.toLowerCase().includes(term)   ||
    a.tipologia.toLowerCase().includes(term)
  );
  res.json(lista);
});

// GET asignaturas by tipologia
app.get('/api/asignaturas/tipologia/:tipologia', (req, res) => {
  const lista = AsignaturaModel
                 .getAll()
                 .filter(a => a.tipologia === req.params.tipologia);
  res.json(lista);
});

// GET asignatura by codigo
app.get('/api/asignaturas/:codigo', (req, res) => {
  const asignatura = AsignaturaModel.getByCodigo(req.params.codigo);
  if (!asignatura) return res.status(404).json({ error: 'Asignatura not found' });
  res.json(asignatura);
});

// GET all asignaturas
app.get('/api/asignaturas', AsignaturaController.list);

// CREATE asignatura
app.post('/api/asignaturas', AsignaturaController.create);

// UPDATE asignatura
app.put('/api/asignaturas/:codigo', AsignaturaController.update);

// DELETE asignatura
app.delete('/api/asignaturas/:codigo', AsignaturaController.remove);

// GET tipologias
app.get('/api/tipologias', (req, res) => {
  console.log('API REQUEST: GET /api/tipologias - Frontend solicitando tipologias');
  const db = readJSON('./data/asignaturas.json');
  res.json(db.tipologias);
});

// GET configuracion
app.get('/api/configuracion', (req, res) => {
  const db = readJSON('./data/asignaturas.json');
  res.json(db.configuracion);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
