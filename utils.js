const fs = require('node:fs');

function writeJSON(path, object) {
    const string = JSON.stringify(object, null, 2);
    fs.writeFileSync(path, string, 'utf8');
}

module.exports = { writeJSON };