const SimulacionModel = require('../models/simulacionModel');

class SimulacionController {
  // Obtener todas las simulaciones
  static async getAllSimulaciones(req, res) {
    try {
      const simulaciones = await SimulacionModel.getAll();
      res.status(200).json(simulaciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener simulaciones', error });
    }
  }
}

module.exports = SimulacionController;