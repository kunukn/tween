var t = require('../dist/tween.umd.min.js');
var t2 = require('../dist/tween.cjs.min.js');

var tween = t.default || t;
var tween2 = t2.default || t2;

var log = console
  .log
  .bind(console);

function onComplete(params) {
  log(params);
  log('** example done');
  log('**  example start 2');
  tween2({duration: 300, update: log, complete: onComplete2});
}

function onComplete2(params) {
  log(params);
  log('** example done 2');
  log(t.default, t);
}

log('**  example start');
tween({duration: 500, update: log, complete: onComplete});
