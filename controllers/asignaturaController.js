const Asig = require('../models/asignaturaModel');

class AsignaturaController {
  static list(req, res) {
    res.json(Asig.getAll());
  }

  static create(req, res) {
    const nueva = Asig.create(req.body);
    res.status(201).json(nueva);
  }

  static update(req, res) {
    const actualizada = Asig.update(req.params.codigo, req.body);
    if (!actualizada) return res.status(404).json({ error: 'Not found' });
    res.json(actualizada);
  }

  static remove(req, res) {
    Asig.remove(req.params.codigo);
    res.status(204).end();
  }
}

module.exports = AsignaturaController;
