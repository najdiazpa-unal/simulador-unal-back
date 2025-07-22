//crud de simulaciones
const fs               = require('fs');
const path             = require('path');
const AsignaturaModel  = require('./asignaturaModel');

const filePath = path.join(__dirname, '../data/simulaciones.json');

function leerSimulaciones () {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

function guardarSimulaciones (simulaciones) {
  fs.writeFileSync(filePath, JSON.stringify(simulaciones, null, 2));
}

  // Encontrar el ID numérico más alto
function getNextNumericId () {
  const simulaciones = leerSimulaciones();
  if (simulaciones.length === 0) return '1';

  const numericIds = simulaciones
    .map(s => parseInt(s.id))
    .filter(id => !isNaN(id))
    .sort((a, b) => b - a);

  const nextId = numericIds.length > 0 ? numericIds[0] + 1 : 1;
  return nextId.toString();
}

function purgeRemovedAsignaturas (userId) {
  const simulaciones           = leerSimulaciones();
  const codigosVigentes        = new Set(
    AsignaturaModel.getAll().map(a => a.codigo)
  );

  const asignaturasEliminadas  = [];
  let   huboCambios            = false;

  simulaciones.forEach(sim => {
    if (sim.usuario !== userId) return;

    sim.matriculas.forEach(m => {
      if (!Array.isArray(m.asignaturas)) return;

      m.asignaturas = m.asignaturas.filter(asig => {
        const sigueVigente = codigosVigentes.has(asig.codigo);
        if (!sigueVigente) {
          asignaturasEliminadas.push({
            codigo : asig.codigo,
            nombre : asig.nombre
          });
          huboCambios = true;
        }
        return sigueVigente;
      });
    });
  });

  if (huboCambios) guardarSimulaciones(simulaciones);
  return asignaturasEliminadas;
}

module.exports = {
  getAll         : ()            => leerSimulaciones(),
  getAllByUser   : (userId)      => leerSimulaciones().filter(s => s.usuario === userId),
  getById        : (id)          => leerSimulaciones().find(s => s.id === id),

  create         : (nueva)       => {
    const simulaciones = leerSimulaciones();
    simulaciones.push(nueva);
    guardarSimulaciones(simulaciones);
    return nueva;
  },

  update         : (id, data)    => {
    const simulaciones = leerSimulaciones();
    const idx          = simulaciones.findIndex(s => s.id === id);
    if (idx === -1) return null;
    simulaciones[idx]  = { ...simulaciones[idx], ...data };
    guardarSimulaciones(simulaciones);
    return simulaciones[idx];
  },

  remove         : (id)          => {
    let simulaciones     = leerSimulaciones();
    const originalLength = simulaciones.length;
    simulaciones         = simulaciones.filter(s => s.id !== id);
    guardarSimulaciones(simulaciones);
    return simulaciones.length < originalLength;
  },

  getNextNumericId,
  purgeRemovedAsignaturas     
};
