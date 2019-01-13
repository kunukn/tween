var root = typeof window !== 'undefined'
  ? window
  : global;

var rAF = root.requestAnimationFrame
  ? requestAnimationFrame.bind(root)
  : function(callback){setTimeout(callback, 16)};

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
    var range = elapsedTime / duration;
    if (elapsedTime >= duration) {
      ensureLast && prevRange !== range && update && update(1);
      complete && complete({startTime: startTime, now: now, elapsedTime: elapsedTime});
    } else {
      update && update(range);
      prevRange = range;
      rAF(play);
    }
  }

  var prevRange;
  var startTime = getNow();

  if (duration > 0) {
    update && update(0);
    rAF(play);
  }
};

module.exports = tween;
