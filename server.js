const express = require('express');
const SimulacionesModel = require('.SimulacionesModel.js');
const cors = require('cors');
//const simulacionesEjemplo = require('./mocks/mockData'); //Borar después
const UserController = require('./controllers/userController');
const asignaturasData = require('./data/asignaturas.json');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// USUARIOS
app.post('/api/auth', UserController.authenticate);

// Example in-memory data (replace with DB in production)
//let simulaciones = simulacionesEjemplo; //Borrar despues   

// SIMULACIONES
// GET all simulaciones
app.get('/api/simulaciones', (req, res) => {
  const simulaciones = SimulacionModel.getAll();
  res.json(simulaciones);
});

// GET one simulacion by id
app.get('/api/simulaciones/:id', (req, res) => {
  const simulacion = SimulacionModel.getById(req.params.id);
  if (!simulacion) return res.status(404).json({ error: 'Simulación no encontrada' });
  res.json(simulacion);
});

// CREATE new simulacion
app.post('/api/simulaciones', (req, res) => {
  const nueva = { ...req.body, id: Date.now().toString() };
  const creada = SimulacionModel.create(nueva);
  res.status(201).json(creada);
});

// UPDATE simulacion
app.put('/api/simulaciones/:id', (req, res) => {
  const actualizada = SimulacionModel.update(req.params.id, req.body);
  if (!actualizada) return res.status(404).json({ error: 'Simulación no encontrada' });
  res.json(actualizada);
});

// DELETE simulacion
app.delete('/api/simulaciones/:id', (req, res) => {
  const eliminada = SimulacionModel.remove(req.params.id);
  if (!eliminada) return res.status(404).json({ error: 'Simulación no encontrada' });
  res.status(204).end();
});


// ASIGNATURAS
// GET all asignaturas
app.get('/api/asignaturas', (req, res) => {
  console.log('API REQUEST: GET /api/asignaturas - Frontend solicitando asignaturas');
  res.json(asignaturasData.asignaturas);
});

// GET asignatura by codigo
app.get('/api/asignaturas/:codigo', (req, res) => {
  const asignatura = asignaturasData.asignaturas.find(a => a.codigo === req.params.codigo);
  if (!asignatura) return res.status(404).json({ error: 'Asignatura not found' });
  res.json(asignatura);
});

// GET asignaturas by tipologia
app.get('/api/asignaturas/tipologia/:tipologia', (req, res) => {
  const asignaturas = asignaturasData.asignaturas.filter(a => a.tipologia === req.params.tipologia);
  res.json(asignaturas);
});

// Search asignaturas
app.get('/api/asignaturas/search/:termino', (req, res) => {
  const termino = req.params.termino.toLowerCase();
  const asignaturas = asignaturasData.asignaturas.filter(a => 
    a.nombre.toLowerCase().includes(termino) ||
    a.codigo.toLowerCase().includes(termino) ||
    a.tipologia.toLowerCase().includes(termino)
  );
  res.json(asignaturas);
});

// GET tipologias
app.get('/api/tipologias', (req, res) => {
  console.log('API REQUEST: GET /api/tipologias - Frontend solicitando tipologias');
  res.json(asignaturasData.tipologias);
});

// GET configuracion
app.get('/api/configuracion', (req, res) => {
  res.json(asignaturasData.configuracion);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


