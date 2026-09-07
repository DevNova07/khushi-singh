import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color: string;
}

interface PhotoInteractiveWrapperProps {
  children: React.ReactNode;
  photoName?: string;
  className?: string;
}

const HEART_COLORS = ['#FF2D55', '#FF375F', '#FF6482', '#FF85A1', '#E91E63', '#D6A85F'];

export const PhotoInteractiveWrapper: React.FC<PhotoInteractiveWrapperProps> = ({
  children,
  photoName = 'Khushi',
  className = '',
}) => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);
  const [loveCount, setLoveCount] = useState(5);
  const [showToast, setShowToast] = useState(false);
  const lastTapRef = useRef<number>(0);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spawnHearts = (originX?: number, originY?: number) => {
    romanticAudio.playSparkle();
    setLoveCount((prev) => prev + 1);

    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setShowToast(false), 2000);

    const newParticles: HeartParticle[] = [];
    const count = 7;
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + Math.random(),
        x: (originX !== undefined ? originX : 50) + (Math.random() * 40 - 20),
        y: (originY !== undefined ? originY : 50) + (Math.random() * 20 - 10),
        scale: 0.8 + Math.random() * 0.7,
        rotation: (Math.random() - 0.5) * 45,
        color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.some((np) => np.id === p.id)));
    }, 1400);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap < 350 && timeSinceLastTap > 0) {
      // Double tap detected!
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 100;
      const clickY = ((e.clientY - rect.top) / rect.height) * 100;
      spawnHearts(clickX, clickY);
      lastTapRef.current = 0;
    } else {
      lastTapRef.current = now;
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Interactive Photo container */}
      <div
        onPointerDown={handlePointerDown}
        className="relative cursor-pointer select-none"
      >
        {children}

        {/* Floating Heart Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                opacity: 0,
                scale: 0.2,
                x: `${p.x}%`,
                y: `${p.y}%`,
                rotate: 0,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.2, p.scale * 1.3, p.scale],
                x: `${p.x + (Math.random() * 30 - 15)}%`,
                y: `${p.y - 45 - Math.random() * 35}%`,
                rotate: p.rotation,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute pointer-events-none z-30 transform -translate-x-1/2 -translate-y-1/2"
              style={{ color: p.color }}
            >
              <Heart className="w-8 h-8 fill-current drop-shadow-md" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Little interactive love pill badge at bottom right */}
        <div className="absolute bottom-3 right-3 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              spawnHearts(85, 85);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/80 text-[#E91E63] font-mono text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            title="Double-tap photo or tap to shower love"
          >
            <Heart className="w-3.5 h-3.5 fill-[#E91E63] animate-pulse" />
            <span>{loveCount}</span>
            <Sparkles className="w-3 h-3 text-[#D6A85F]" />
          </button>
        </div>

        {/* Hint text on hover / tap */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-xs">
            Double tap to ❤️
          </span>
        </div>
      </div>

      {/* Floating Love Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 whitespace-nowrap px-4 py-1.5 rounded-full bg-gradient-to-r from-[#E91E63] to-[#FF4081] text-white text-xs font-serif-luxury font-bold shadow-xl flex items-center gap-1.5 pointer-events-none"
          >
            <Heart className="w-3.5 h-3.5 fill-white animate-bounce" />
            <span>Showered love on {photoName}!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
