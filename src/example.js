var tween = require('../dist/tween.umd.min.js');
var log = console.log.bind(console);

log('example start');
tween({ duration: 500, update: log, complete: log });
log('example done');
