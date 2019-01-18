(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.tween = mod.exports;
  }
})(this || self, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var root = typeof window !== 'undefined' ? window : global;
  var rAF = root.requestAnimationFrame ? requestAnimationFrame.bind(root) : function (callback) {
    setTimeout(callback, 16);
  };

  function getNow() {
    return new Date().getTime();
  }

  ;

  function tween(args) {
    var prevRange;
    var cancelled = false;
    var startTime;
    var attrs = args || {};
    var update = attrs.update;
    var complete = attrs.complete;
    var duration = attrs.duration != null ? +attrs.duration : 300;
    var ensureLast = attrs.ensureLast != null ? attrs.ensureLast : true;

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
        ensureLast && prevRange !== current.range && update && update(1);
        complete && complete(current);
      } else {
        update && update(current.range);
        prevRange = current.range;
        rAF(play);
      }
    }

    startTime = getNow();

    if (duration > 0) {
      update && update(0);
      rAF(play);
    }

    return function cancel(callback) {
      cancelled = true;
      callback && callback(getCurrent(startTime));
    };
  }

  var _default = tween;
  _exports.default = _default;
});
