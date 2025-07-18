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

module.exports = {
  getAll: () => leerSimulaciones(),

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

  remove: (id) => {
    let simulaciones = leerSimulaciones();
    const originalLength = simulaciones.length;
    simulaciones = simulaciones.filter(s => s.id !== id);
    guardarSimulaciones(simulaciones);
    return simulaciones.length < originalLength;
  }
};
