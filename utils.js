const fs   = require('node:fs');
const path = require('node:path');

function readJSON(filePath) {
  const abs = path.resolve(filePath);
  return JSON.parse(fs.readFileSync(abs, 'utf8'));
}

function writeJSON(filePath, object) {
  const abs  = path.resolve(filePath);
  const json = JSON.stringify(object, null, 2);
  fs.writeFileSync(abs, json, 'utf8');
}

module.exports = { readJSON, writeJSON };
