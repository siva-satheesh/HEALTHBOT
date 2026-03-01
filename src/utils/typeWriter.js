export function typeWriter(
  text,
  speed = 0.5, // smaller = slower, bigger = faster
  onUpdate,
  onComplete
) {
  let index = 0;
  let animationFrame;
  let isStopped = false;

  function animate() {
    if (isStopped) return;

    // Gradual character increase (smooth growth)
    index += speed;

    if (index < text.length) {
      onUpdate(text.slice(0, Math.floor(index)));
      animationFrame = requestAnimationFrame(animate);
    } else {
      onUpdate(text); // ensure full text renders
      if (onComplete) onComplete();
    }
  }

  animationFrame = requestAnimationFrame(animate);

  // Stop function
  return (instantComplete = false) => {
    isStopped = true;
    cancelAnimationFrame(animationFrame);

    if (instantComplete) {
      onUpdate(text);
      if (onComplete) onComplete();
    }
  };
}