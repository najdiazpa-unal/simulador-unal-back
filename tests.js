const { argv } = require('node:process');
const fs = require('node:fs');
const { writeJSON } = require('./utils');

const testCase = argv[2];
let object;

if (['estudiante', 'admin', 'dev'].includes(testCase)) {
    object = [
    {
      'correo': 'csanchezor',
      'rol': testCase
    }
  ];
} else {
  switch (testCase) {
    case 'vacio':
      object = [];
      break;
  }
}

writeJSON('./data/usuarios.json', object);