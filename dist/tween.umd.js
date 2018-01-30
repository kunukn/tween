(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.tween = mod.exports;
  }
})(this, function (module) {
  'use strict';

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

  module.exports = tween;
});
