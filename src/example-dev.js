var tween = require('./tween.js');

var log = console.log.bind(console);

function onComplete(arg){
  log(arg);
  log('** example done');
  log('**  example start 2');
  tween({ duration: 300, update: log, complete: onComplete2 });  
}

function onComplete2(arg){
  log(arg);
  log('** example done 2');
}

log('**  example start');
var cancel = tween({ duration: 500, update: log, complete: onComplete });

//setTimeout(() => cancel(range => log('cancelled', range)), 300);
