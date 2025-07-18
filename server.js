const express = require('express');
const cors = require('cors');
const UserController = require('./controllers/userController');

const SimulacionController = require('./controllers/simulacionController');
const asignaturasData = require('./data/asignaturas.json');

const app = express();
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


