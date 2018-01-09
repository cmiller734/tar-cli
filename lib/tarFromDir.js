const tar = require('tar');
const { basename, extname } = require('path');
const { local: { readDir } } = require('io');
const compose = require('ramda/src/compose');
const not = require('ramda/src/not');
const equals = require('ramda/src/equals');
const filter = require('ramda/src/filter');
const always = require('ramda/src/always');

module.exports = (dir, extNames) => readDir(dir)
    .then(filteredFiles => filteredFiles.map(file => basename(file)))
    .then(filter(compose(not, equals('.DS_Store'), basename)))
    .then(filter(compose(not, equals('.gz'), extname)))
    .then(files => extNames.length > 0 ? files.filter(item => extNames.find(ext => ext === extname(item))) : files)
    .then(filteredFiles => tar.c({
            cwd: dir,
            gzip: true,
            file: `${basename(dir)}/${basename(dir)}.tar.gz`,
        },
            filteredFiles
        ))
