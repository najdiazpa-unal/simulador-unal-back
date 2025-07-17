const path = './data/asignaturas.json';
const { readJSON, writeJSON } = require('../utils');

class AsignaturaModel {
  static _read() {
    return readJSON(path);              
  }

  static getAll() {
    return this._read().asignaturas;
  }

  static getByCodigo(codigo) {
    return this._read().asignaturas.find(a => a.codigo === codigo);
  }

  static create(data) {
    const db = this._read();
    const nueva = { ...data, id: Date.now().toString() };
    db.asignaturas.push(nueva);
    writeJSON(path, db);
    return nueva;
  }

  static update(codigo, cambios) {
    const db = this._read();
    const idx = db.asignaturas.findIndex(a => a.codigo === codigo);
    if (idx === -1) return null;
    db.asignaturas[idx] = { ...db.asignaturas[idx], ...cambios };
    writeJSON(path, db);
    return db.asignaturas[idx];
  }

  static remove(codigo) {
    const db = this._read();
    db.asignaturas = db.asignaturas.filter(a => a.codigo !== codigo);
    writeJSON(path, db);
  }
}

module.exports = AsignaturaModel;
