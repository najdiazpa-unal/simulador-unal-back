const MatriculaModel = require('../models/matriculaModel');

class MatriculaController {
static list(req, res) {
    const { id } = req.params; // ID de la simulación
    const data = MatriculaModel.getBySimulacionId(id);
    res.json(data);
}

static add(req, res) {
    const { id } = req.params; // ID de la simulación
    const { codigoAsignatura } = req.body;

    if (!codigoAsignatura) {
    return res.status(400).json({ error: 'Falta el código de la asignatura' });
    }

    const nueva = MatriculaModel.add(id, codigoAsignatura);
    if (!nueva) {
    return res.status(409).json({ error: 'La asignatura ya está matriculada en esta simulación' });
    }

    res.status(201).json(nueva);
}

static remove(req, res) {
    const { id, codigo } = req.params; // simulacionId y codigoAsignatura

    const ok = MatriculaModel.remove(id, codigo);
    if (!ok) return res.status(404).json({ error: 'No se encontró la matrícula a eliminar' });

    res.status(204).end();
}
}

module.exports = MatriculaController;
