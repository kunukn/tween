var tween = require('../dist/tween.umd.min.js');
var log = console.log.bind(console);

function onComplete(arg){
  log(arg);
  log('** example done');
}

log('**  example start');
tween({ duration: 500, update: log, complete: onComplete });

