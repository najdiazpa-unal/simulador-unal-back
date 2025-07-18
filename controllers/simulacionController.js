const { v4: uuidv4 } = require('uuid');
const SimulacionModel = require('../models/simulacionModel');

class SimulacionController {
  static async getAll(req, res) {
    try {
      const simulaciones = await SimulacionModel.getAll();
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
}

module.exports = SimulacionController;