const { v4: uuidv4 } = require('uuid');
const SimulacionModel = require('../models/simulacionModel');

class SimulacionController {
  static async getAll(req, res) {
    try {
      const userId = req.headers['x-user-id'];
      console.log('BACKEND: Obteniendo simulaciones para userId:', userId);
      
      if (!userId) {
        return res.status(400).json({ message: 'x-user-id header requerido' });
      }
      
      const simulaciones = await SimulacionModel.getAllByUser(userId);
      console.log('BACKEND: Simulaciones encontradas:', simulaciones.length);
      
      res.status(200).json(simulaciones);
    } catch (error) {
      console.error('BACKEND: Error al obtener simulaciones:', error);
      res.status(500).json({ message: 'Error al obtener simulaciones', error });
    }
  }

  static async create(req, res) {
    try {
      const userId = req.headers['x-user-id'] || req.body.usuario;
      if (!userId) {
        return res.status(400).json({ error: 'Usuario requerido' });
      }
      
      const nueva = { 
        ...req.body, 
        id: uuidv4(),
        usuario: userId
      };
      
      const creada = SimulacionModel.create(nueva);
      res.status(201).json(creada);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear simulación', error });
    }
  }

  static async update(req, res) {
    try {
      const actualizada = SimulacionModel.update(req.params.id, req.body);
      if (!actualizada) return res.status(404).json({ error: 'Simulación no encontrada' });
      res.json(actualizada);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar simulación', error });
    }
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