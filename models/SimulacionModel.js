//crud de simulaciones  
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/simulaciones.json');

function leerSimulaciones() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function guardarSimulaciones(simulaciones) {
  fs.writeFileSync(filePath, JSON.stringify(simulaciones, null, 2));
}

function getNextNumericId() {
  const simulaciones = leerSimulaciones();
  if (simulaciones.length === 0) return "1";
  
  // Encontrar el ID numérico más alto
  const numericIds = simulaciones
    .map(s => parseInt(s.id))
    .filter(id => !isNaN(id))
    .sort((a, b) => b - a);
  
  const nextId = numericIds.length > 0 ? numericIds[0] + 1 : 1;
  return nextId.toString();
}

module.exports = {
  getAll: () => leerSimulaciones(),

  getAllByUser: (userId) => {
    const simulaciones = leerSimulaciones();
    return simulaciones.filter(s => s.usuario === userId);
  },

  getById: (id) => {
    const simulaciones = leerSimulaciones();
    return simulaciones.find(s => s.id === id);
  },

  create: (nueva) => {
    const simulaciones = leerSimulaciones();
    simulaciones.push(nueva);
    guardarSimulaciones(simulaciones);
    return nueva;
  },

  update: (id, data) => {
    const simulaciones = leerSimulaciones();
    const idx = simulaciones.findIndex(s => s.id === id);
    if (idx === -1) return null;
    simulaciones[idx] = { ...simulaciones[idx], ...data };
    guardarSimulaciones(simulaciones);
    return simulaciones[idx];
  },

  getNextNumericId: () => getNextNumericId(),

  remove: (id) => {
    let simulaciones = leerSimulaciones();
    const originalLength = simulaciones.length;
    simulaciones = simulaciones.filter(s => s.id !== id);
    guardarSimulaciones(simulaciones);
    return simulaciones.length < originalLength;
  }
};
