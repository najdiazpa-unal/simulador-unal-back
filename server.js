const express = require('express');
const cors = require('cors');
const UserController = require('./controllers/userController');
const SimulacionController = require('./controllers/simulacionController');
const asignaturasData = require('./data/asignaturas.json');
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

// SIMULACIONES
// GET all simulaciones
app.get('/api/simulaciones', SimulacionController.getAll);

// GET one simulacion by id
app.get('/api/simulaciones/:id', SimulacionController.getById);

// CREATE new simulacion
app.post('/api/simulaciones', SimulacionController.create);

// UPDATE simulacion
app.put('/api/simulaciones/:id', SimulacionController.update);

// DELETE simulacion
app.delete('/api/simulaciones/:id', SimulacionController.delete);

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