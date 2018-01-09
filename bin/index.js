const program = require('commander');
//const tarsFromSubDirs = require('../lib/tarsFromSubDirs');
const createTars = require('../lib/createTars');
const tarFromCurDir = require('../lib/tarFromCurDir');
const split = require('ramda/src/split');
const isEmpty = require('ramda/src/isEmpty');
const is = require('ramda/src/is');
const dir = process.cwd();

Promise.resolve(
    program
    .option("-m, --multi", "Create .tars for each subfolder in root", "")
    .option("-e, --ext <types>", "Specify extensions", split(/\s+/), '')
    .parse(process.argv)
)
.then(({ multi, ext }) => multi ? createTars(dir, ext) : tarFromCurDir(dir, ext))
.catch(error => { 
    console.log(error); 
    return process.exit(1);
});




