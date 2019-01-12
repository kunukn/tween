(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.tween = mod.exports;
  }
})(this, function () {
  "use strict";

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
        duration = _ref$duration === void 0 ? 300 : _ref$duration,
        update = _ref.update,
        complete = _ref.complete,
        _ref$ensureLast = _ref.ensureLast,
        ensureLast = _ref$ensureLast === void 0 ? true : _ref$ensureLast;

    duration = +duration;

    var play = function play() {
      var now = getNow();
      var elapsedTime = Math.min(duration, now - startTime);

      if (elapsedTime >= duration) {
        ensureLast && update && update(1);
        complete && complete({
          startTime: startTime,
          now: now,
          elapsedTime: elapsedTime
        });
      } else {
        var range = elapsedTime / duration;
        update && update(range);
        rAF(play);
      }
    };

    var startTime = getNow();

    if (duration > 0) {
      update && update(0);
      rAF(play);
    }
  };

  module.exports = tween;
});
