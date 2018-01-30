const root = typeof window !== 'undefined' ? window : global;
const rAF = root.requestAnimationFrame
  ? root.requestAnimationFrame.bind(root)
  : callback => root.setTimeout(callback, 16);
const getNow = () => new Date().getTime();

const tween = ({ duration = 300, update, complete } = {}) => {
  const play = () => {
    if (duration <= 0) return;

    const now = getNow();
    const elapsedTime = Math.min(duration, now - startTime);
    if (elapsedTime >= duration) {
      update && update(1);
      complete && complete({ startTime, now, elapsedTime });
    } else {
      const range = elapsedTime / duration;
      update && update(range);
      rAF(play);
    }
  };

  const startTime = getNow();
  update && update(0);
  play();
};

module.exports = tween;
