const tarFromDir = require('./tarFromDir');
const { basename, extname } = require('path');

module.exports = (dir, extNames) =>
    new Promise(resolve => {
        console.log(`\nCreating .tar from files in '/${basename(dir)}'/...`); 
        resolve(dir, extNames)})
    .then(tarFromDir(dir, extNames))
    .then(console.log)
    .catch(console.error);
