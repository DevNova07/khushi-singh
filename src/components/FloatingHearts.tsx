import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingHeart {
  id: number;
  type: 'tiny' | 'glowing' | 'glass' | 'solid' | 'outline' | 'pulse' | 'sparkle';
  x: number; // percentage across screen 0 - 100
  y: number; // percentage down screen
  size: number;
  depth: number; // 0 (background/blurred) to 1 (foreground)
  duration: number;
  delay: number;
  rotate: number;
  opacity: number;
}

export const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Detect mobile vs desktop
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 12 : 28;

    const heartTypes: FloatingHeart['type'][] = [
      'tiny', 'glowing', 'glass', 'solid', 'outline', 'pulse', 'sparkle'
    ];

    const generated: FloatingHeart[] = Array.from({ length: count }, (_, i) => {
      const type = heartTypes[i % heartTypes.length];
      const depth = Math.random();
      const baseSize = type === 'glass' ? 44 : type === 'tiny' ? 12 : 22;

      return {
        id: i,
        type,
        x: Math.random() * 92 + 4, // keep padding from absolute edge
        y: Math.random() * 100,
        size: baseSize + Math.random() * 14,
        depth,
        duration: 14 + Math.random() * 18,
        delay: Math.random() * 5,
        rotate: (Math.random() - 0.5) * 45,
        opacity: 0.25 + depth * 0.45
      };
    });

    setHearts(generated);

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 30;
      const y = (e.clientY / innerHeight - 0.5) * 30;
      setMouseOffset({ x, y });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => {
        const blur = heart.depth < 0.4 ? 'blur-[1.5px]' : 'blur-0';
        const parallaxX = mouseOffset.x * heart.depth;

        return (
          <motion.div
            key={heart.id}
            className={`absolute ${blur}`}
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
              width: heart.size,
              height: heart.size,
              opacity: heart.opacity,
              filter: heart.type === 'glowing' ? 'drop-shadow(0 0 8px rgba(233, 30, 99, 0.6))' : undefined
            }}
            animate={{
              y: [0, -180, -360],
              x: [0, Math.sin(heart.id) * 30 + parallaxX, 0],
              rotate: [heart.rotate, heart.rotate + 15, heart.rotate - 15],
              scale: heart.type === 'pulse' ? [1, 1.18, 1] : [1, 1.05, 1],
            }}
            transition={{
              y: {
                repeat: Infinity,
                duration: heart.duration,
                ease: 'linear',
                delay: heart.delay,
              },
              x: {
                repeat: Infinity,
                duration: heart.duration * 0.7,
                ease: 'easeInOut',
              },
              rotate: {
                repeat: Infinity,
                duration: 7,
                ease: 'easeInOut',
              },
              scale: {
                repeat: Infinity,
                duration: heart.type === 'pulse' ? 2.2 : 6,
                ease: 'easeInOut',
              },
            }}
          >
            {/* 8 Heart Types Rendering */}
            {heart.type === 'tiny' && (
              <svg viewBox="0 0 24 24" fill="#E91E63" className="w-full h-full opacity-70">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}

            {heart.type === 'glowing' && (
              <svg viewBox="0 0 24 24" fill="url(#glowing-heart-grad)" className="w-full h-full">
                <defs>
                  <linearGradient id="glowing-heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF4081" />
                    <stop offset="100%" stopColor="#C2185B" />
                  </linearGradient>
                </defs>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}

            {heart.type === 'glass' && (
              <div className="w-full h-full rounded-full flex items-center justify-center p-1 bg-white/40 backdrop-blur-md border border-pink-200/60 shadow-lg shadow-pink-500/10">
                <svg viewBox="0 0 24 24" fill="#E91E63" className="w-3/4 h-3/4 opacity-85">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            )}

            {heart.type === 'outline' && (
              <svg viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="1.8" className="w-full h-full opacity-60">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}

            {heart.type === 'solid' && (
              <svg viewBox="0 0 24 24" fill="#F8BBD0" className="w-full h-full opacity-80">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}

            {heart.type === 'pulse' && (
              <svg viewBox="0 0 24 24" fill="#C2185B" className="w-full h-full opacity-75">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}

            {heart.type === 'sparkle' && (
              <div className="relative w-full h-full">
                <svg viewBox="0 0 24 24" fill="#D6A85F" className="w-full h-full opacity-80">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="absolute -top-1 -right-1 text-[10px] text-[#D6A85F] animate-pulse">✨</span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};
