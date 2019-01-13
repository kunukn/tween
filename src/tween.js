var root = typeof window !== 'undefined'
  ? window
  : global;
var rAF = root.requestAnimationFrame
  ? root
    .requestAnimationFrame
    .bind(root)
  : callback => root.setTimeout(callback, 16);

function getNow() {
  return new Date().getTime();
};

function tween(args) {

  var attrs = args || {};

  var update = attrs.update;
  var complete = attrs.complete;
  var duration = attrs.duration != null
    ? + (attrs.duration)
    : 300;
  var ensureLast = attrs.ensureLast != null
    ? attrs.ensureLast
    : true;

  function play() {
    var now = getNow();
    var elapsedTime = Math.min(duration, now - startTime);
    if (elapsedTime >= duration) {
      ensureLast && update && update(1);
      complete && complete({startTime, now, elapsedTime});
    } else {
      var range = elapsedTime / duration;
      update && update(range);
      rAF(play);
    }
  }

  var startTime = getNow();

  if (duration > 0) {
    update && update(0);
    rAF(play);
  }
};

module.exports = tween;
