import confetti from 'canvas-confetti';

// Big celebratory confetti burst for YES button and Cake blowout
export function triggerCelebrationConfetti() {
  const count = 75;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Pink, rose, blush, gold colors
  const colors = ['#E91E63', '#C2185B', '#F8D4DF', '#D6A85F', '#FFFFFF', '#FF80AB'];

  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors
  });
  fire(0.2, {
    spread: 60,
    colors
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.2,
    colors
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.4,
    colors
  });
  fire(0.1, {
    spread: 130,
    startVelocity: 45,
    colors
  });
}

// Gentle romantic sparkle burst
export function triggerSparkleConfetti() {
  confetti({
    particleCount: 25,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: ['#E91E63', '#D6A85F', '#FF80AB'],
    zIndex: 9999
  });
  confetti({
    particleCount: 25,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: ['#E91E63', '#D6A85F', '#FF80AB'],
    zIndex: 9999
  });
}
