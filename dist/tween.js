var tween = function () {
  var root = typeof window !== 'undefined' ? window : global;
  var rAF = root.requestAnimationFrame ? root.requestAnimationFrame.bind(root) : function (callback) {
    return root.setTimeout(callback, 16);
  };
  var getNow = function getNow() {
    return new Date().getTime();
  };

  var tween = function tween() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 300 : _ref$duration,
        update = _ref.update,
        complete = _ref.complete;

    var play = function play() {
      if (duration <= 0) return;

      var now = getNow();
      var elapsedTime = Math.min(duration, now - startTime);
      if (elapsedTime >= duration) {
        update && update(1);
        complete && complete({ startTime: startTime, now: now, elapsedTime: elapsedTime });
      } else {
        var range = elapsedTime / duration;
        update && update(range);
        rAF(play);
      }
    };

    var startTime = getNow();
    play();
  };
  tween.version = '0.0.3';
  return tween;
}();

// const l = console.log.bind(console);
// tween({ duration: 500, update: l, complete: l });
