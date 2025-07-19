const { v4: uuidv4 } = require('uuid');
const SimulacionModel = require('../models/simulacionModel');

class SimulacionController {
  static async getAll(req, res) {
    try {
      const simulaciones = await SimulacionModel.getAllByUser(req.headers['x-user-id']);
      res.status(200).json(simulaciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener simulaciones', error });
    }
  }

  static async create(req, res) {
    const nueva = { ...req.body, id: uuidv4() }; // Use uuid for id
    const creada = SimulacionModel.create(nueva);
    res.status(201).json(creada);
  }

  static async update(req, res) {
    const actualizada = SimulacionModel.update(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ error: 'Simulación no encontrada' });
    res.json(actualizada);
  }

  static async getById(req, res) {
    const simulacion = SimulacionModel.getById(req.params.id);
    if (!simulacion) return res.status(404).json({ error: 'Simulación no encontrada' });
    res.json(simulacion);
  }

  static async delete(req, res) {
    const eliminada = SimulacionModel.remove(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'Simulación no encontrada' });
    res.status(204).end();
  }
}

module.exports = SimulacionController;