const root = typeof window !== 'undefined' ? window : global;
const rAF = root.requestAnimationFrame
  ? root.requestAnimationFrame.bind(root)
  : callback => root.setTimeout(callback, 16);
const getNow = () => new Date().getTime();

const tween = ({
  duration = 300,
  update,
  complete,
  ensureLast = true,
} = {}) => {

  duration = +duration;

  const play = () => {
    const now = getNow();
    const elapsedTime = Math.min(duration, now - startTime);
    if (elapsedTime >= duration) {
      ensureLast && update && update(1);
      complete && complete({ startTime, now, elapsedTime });
    } else {
      const range = elapsedTime / duration;
      update && update(range);
      rAF(play);
    }
  };

  const startTime = getNow();

  if (duration > 0) {
    update && update(0);
    rAF(play);
  }
};

module.exports = tween;
