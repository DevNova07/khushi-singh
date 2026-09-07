import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
}

interface Bokeh {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  speedX: number;
  speedY: number;
  alpha: number;
  pulseSpeed: number;
  pulsePhase: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  fadeSpeed: number;
  fadingOut: boolean;
}

export const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const petalCount = isMobile ? 12 : 24;
    const bokehCount = isMobile ? 6 : 12;
    const sparkleCount = isMobile ? 15 : 30;

    // Rose petals
    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 7 + Math.random() * 8,
      speedX: (Math.random() - 0.5) * 0.8 + 0.3,
      speedY: 0.6 + Math.random() * 0.9,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.35 + Math.random() * 0.35,
      color: Math.random() > 0.4 ? 'rgba(248, 212, 223, ' : 'rgba(233, 30, 99, '
    }));

    // Soft pink bokeh circles
    const bokehs: Bokeh[] = Array.from({ length: bokehCount }, () => {
      const baseRadius = 40 + Math.random() * (isMobile ? 50 : 90);
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: baseRadius,
        baseRadius,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        alpha: 0.08 + Math.random() * 0.12,
        pulseSpeed: 0.01 + Math.random() * 0.015,
        pulsePhase: Math.random() * Math.PI * 2
      };
    });

    // Golden & pink sparkles
    const sparkles: Sparkle[] = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.5,
      alpha: Math.random() * 0.7,
      fadeSpeed: 0.008 + Math.random() * 0.015,
      fadingOut: Math.random() > 0.5
    }));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Bokeh
      bokehs.forEach((b) => {
        b.x += b.speedX;
        b.y += b.speedY;
        b.pulsePhase += b.pulseSpeed;
        b.radius = b.baseRadius + Math.sin(b.pulsePhase) * 12;

        if (b.x < -b.radius) b.x = width + b.radius;
        if (b.x > width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = height + b.radius;
        if (b.y > height + b.radius) b.y = -b.radius;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
        grad.addColorStop(0, `rgba(252, 231, 239, ${b.alpha * 1.5})`);
        grad.addColorStop(0.6, `rgba(248, 212, 223, ${b.alpha * 0.7})`);
        grad.addColorStop(1, 'rgba(255, 249, 251, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += Math.sin(p.rotation) * 0.6 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.beginPath();
        // Delicate curved petal path
        ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 3. Draw Sparkles
      sparkles.forEach((s) => {
        if (s.fadingOut) {
          s.alpha -= s.fadeSpeed;
          if (s.alpha <= 0.05) {
            s.fadingOut = false;
            s.x = Math.random() * width;
            s.y = Math.random() * height;
          }
        } else {
          s.alpha += s.fadeSpeed;
          if (s.alpha >= 0.75) {
            s.fadingOut = true;
          }
        }

        ctx.fillStyle = `rgba(214, 168, 95, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
