const { stat, readdir } = require('fs');
const { promisify } = require('util');
const head = require('ramda/src/head');
const always = require('ramda/src/always');
const zipWith = require('ramda/src/zipWith');
const filter = require('ramda/src/filter');
const equals = require('ramda/src/equals');
const isNil = require('ramda/src/isNil');
const map = require('ramda/src/map');
const not = require('ramda/src/not');
const compose = require('ramda/src/compose');
const { basename, extname } = require('path');
const tarFromDir = require('./tarFromDir');
const isDirectory = stats => stats.isDirectory();
const isDir = path => promisify(stat)(path).then(isDirectory);

module.exports = (dir, extNames) => promisify(readdir(dir))
    .then(filter(compose(not, equals('.'), head)))
    .then(filter(compose(not, equals('tar'), basename)))
    .then(results =>
        Promise.all(results.map(isDir))
            .then(zipWith((file, isDir) => isDir ? file : null, results)))
    .then(filter(compose(not, isNil)))
    .then(dirs => Promise.all(dirs.map(dir => tarFromDir(dir, extNames))))
    .then(console.log('.tar files created!'));
