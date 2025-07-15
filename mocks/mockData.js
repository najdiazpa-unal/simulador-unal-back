export const simulacionesEjemplo = [
  {
    id: '1',
    nombre: 'Plan Principal',
    fechaCreacion: '2024-01-15',
    matriculas: [
      {
        id: 'm1',
        posicion: 1,
        asignaturas: []
      },
      {
        id: 'm2', 
        posicion: 2,
        asignaturas: []
      },
      {
        id: 'm3',
        posicion: 3,
        asignaturas: []
      }
    ],
    creditos: {
      fundamentacion_obligatoria: 15,
      fundamentacion_optativa: 10,
      disciplinar_obligatoria: 10,
      disciplinar_optativa: 10,
      libreEleccion: 20,
      total: 25
    }
  },
  {
    id: '2',
    nombre: 'Plan Alternativo',
    fechaCreacion: '2024-02-10',
    matriculas: [
      {
        id: 'm4',
        posicion: 1,
        asignaturas: []
      },
      {
        id: 'm5',
        posicion: 2,
        asignaturas: []
      }
    ],
    creditos: {
      fundamentacion_obligatoria: 14,
      fundamentacion_optativa: 0,
      disciplinar_obligatoria: 3,
      disciplinar_optativa: 0,
      libreEleccion: 0,
      total: 17
    }
  },
  {
    id: '3',
    nombre: 'Plan Acelerado',
    fechaCreacion: '2024-03-05',
    matriculas: [],
    creditos: {
      fundamentacion_obligatoria: 0,
      fundamentacion_optativa: 0,
      disciplinar_obligatoria: 0,
      disciplinar_optativa: 0,
      libreEleccion: 0,
      total: 0
    }
  }
];