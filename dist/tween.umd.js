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

  function getNow() {
    return new Date().getTime();
  }

  ;

  function tween(args) {
    var attrs = args || {};
    var update = attrs.update;
    var complete = attrs.complete;
    var duration = attrs.duration != null ? +attrs.duration : 300;
    var ensureLast = attrs.ensureLast != null ? attrs.ensureLast : true;

    function play() {
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
    }

    var startTime = getNow();

    if (duration > 0) {
      update && update(0);
      rAF(play);
    }
  }

  ;
  module.exports = tween;
});
