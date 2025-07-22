const fs = require('fs');
const path = require('path');
const { writeJSON } = require('../utils');

const matriculasPath = path.join(__dirname, '../data/matriculas.json');

// Cargar datos actuales
function loadMatriculas() {
if (!fs.existsSync(matriculasPath)) return [];
const data = fs.readFileSync(matriculasPath);
return JSON.parse(data);
}

class MatriculaModel {
static getAll() {
    return loadMatriculas();
}

static getBySimulacionId(simulacionId) {
    return loadMatriculas().filter(m => m.simulacionId === simulacionId);
}

static add(simulacionId, codigoAsignatura, estado = 'matriculada') {
    const matriculas = loadMatriculas();

    // Validar que no se repita
    const exists = matriculas.find(m =>
    m.simulacionId === simulacionId && m.codigoAsignatura === codigoAsignatura
    );
    if (exists) return null;

    const nueva = { simulacionId, codigoAsignatura, estado };
    matriculas.push(nueva);
    writeJSON(matriculasPath, matriculas);
    return nueva;
}

static remove(simulacionId, codigoAsignatura) {
    let matriculas = loadMatriculas();
    const prevLength = matriculas.length;

    matriculas = matriculas.filter(m =>
    !(m.simulacionId === simulacionId && m.codigoAsignatura === codigoAsignatura)
    );

    if (matriculas.length === prevLength) return false;

    writeJSON(matriculasPath, matriculas);
    return true;
}
}

module.exports = MatriculaModel;
