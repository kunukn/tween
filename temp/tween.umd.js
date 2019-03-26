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
  var rAF = root.requestAnimationFrame ? requestAnimationFrame.bind(root) : function (callback) {
    setTimeout(callback, 16);
  };

  function getNow() {
    return Date.now();
  }

  ;

  function tween(params) {
    var prevRange;
    var cancelled = false;
    var startTime;
    var attrs = params || {};
    var update = attrs.update;
    var complete = attrs.complete;
    var duration = attrs.duration != null ? +attrs.duration : 300;
    var cAF = null;

    function getCurrent(startTime) {
      var now = getNow();
      var elapsedTime = now - startTime;
      return {
        startTime: startTime,
        now: now,
        elapsedTime: elapsedTime,
        range: Math.min(elapsedTime / duration, 1)
      };
    }

    function play() {
      if (cancelled) return;
      var current = getCurrent(startTime);

      if (current.elapsedTime >= duration) {
        prevRange !== current.range && update && update(1);
        complete && complete(current);
      } else {
        update && update(current.range);
        prevRange = current.range;
        cAF = rAF(play);
      }
    }

    startTime = getNow();

    if (duration > 0) {
      update && update(0);
      cAF = rAF(play);
    }

    return function cancel(callback) {
      cancelled = true;
      cAF && cAF();
      callback && callback(getCurrent(startTime));
    };
  }

  ;
  module.exports = tween;
});
