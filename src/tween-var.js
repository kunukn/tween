var tween = (function () {

  function getNow() {
    return Date.now();
  };

  return function tween(args) {

    var prevRange;
    var cancelled = false;
    var startTime;

    var attrs = args || {};

    var update = attrs.update;
    var complete = attrs.complete;
    var duration = attrs.duration != null
      ? + (attrs.duration)
      : 300;
    var ensureLast = attrs.ensureLast != null
      ? attrs.ensureLast
      : true;

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
      if (cancelled) 
        return;
      
      var current = getCurrent(startTime);

      if (current.elapsedTime >= duration) {
        ensureLast && prevRange !== current.range && update && update(1);
        complete && complete(current);
      } else {
        update && update(current.range);
        prevRange = current.range;
        requestAnimationFrame(play);
      }
    }

    startTime = getNow();

    if (duration > 0) {
      update && update(0);
      requestAnimationFrame(play);
    }

    return function cancel(callback) {
      cancelled = true;
      callback && callback(getCurrent(startTime));
    }
  };

})();
