export function typeWriter(text, speed = 18, onUpdate, onComplete) {
  let index = 0;

  const interval = setInterval(() => {
    onUpdate(text.slice(0, index));
    index++;

    if (index > text.length) {
      clearInterval(interval);
      onComplete && onComplete();
    }
  }, speed);
}
