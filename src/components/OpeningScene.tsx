import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { ThreeHeart } from './ThreeHeart';
import { romanticAudio } from '../audio/romanticSynth';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface OpeningSceneProps {
  onOpen: () => void;
  onHeartFound?: (id: number) => void;
  foundHearts?: number[];
}

export const OpeningScene: React.FC<OpeningSceneProps> = ({ onOpen, onHeartFound, foundHearts = [] }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 15;
    const y = ((clientY - top) / height - 0.5) * 15;
    setMousePos({ x, y });
  };

  const handleOpenClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    romanticAudio.startMusic();
    romanticAudio.playCelebrationChime();
    triggerCelebrationConfetti();

    // Cinematic sequence: heart expansion & particle burst followed by scene fade
    setTimeout(() => {
      onOpen();
    }, 1400);
  };

  const secretHeartId = 1;
  const isHeartFound = foundHearts.includes(secretHeartId);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FFF9FB] px-4 py-8 select-none"
    >
      {/* Soft Ambient Pink Glowing Orbs in Background */}
      <div className="absolute w-96 h-96 rounded-full bg-[#FCE7EF]/60 blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[30rem] h-[30rem] rounded-full bg-[#F8D4DF]/40 blur-3xl -bottom-32 -right-20 pointer-events-none" />

      {/* Secret Easter Egg Heart #1 tucked discreetly in the top-right corner */}
      <button
        onClick={() => {
          if (!isHeartFound && onHeartFound) {
            romanticAudio.playSparkle();
            onHeartFound(secretHeartId);
          }
        }}
        title="Find hidden hearts"
        aria-label="Secret Heart 1"
        className={`absolute top-6 right-6 p-2 rounded-full transition-all duration-500 z-30 cursor-pointer ${
          isHeartFound ? 'opacity-100 scale-110 text-[#E91E63]' : 'opacity-35 hover:opacity-80 hover:scale-125 text-[#F8D4DF]'
        }`}
      >
        <Heart className="w-5 h-5 fill-current" />
      </button>

      {/* Main Content Container with Subtle Parallax */}
      <motion.div
        animate={{
          x: mousePos.x * 0.4,
          y: mousePos.y * 0.4,
          scale: isTransitioning ? 1.08 : 1,
          opacity: isTransitioning ? 0 : 1,
        }}
        transition={{
          scale: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
          opacity: { duration: 1.2, delay: 0.2 },
        }}
        className="relative z-20 flex flex-col items-center text-center max-w-2xl mx-auto"
      >
        {/* 3D Glass Heart Scene */}
        <div className="relative mb-2">
          <ThreeHeart isExpanding={isTransitioning} />
          {/* Subtle glow aura beneath 3D heart */}
          <div className="absolute inset-0 bg-[#FF4081]/15 blur-2xl rounded-full -z-10 animate-pulse pointer-events-none" />
        </div>

        {/* Cinematic Text Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Gold & Pink Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#F8D4DF] text-sm text-[#8A6875] tracking-widest uppercase font-medium">
            <Sparkles className="w-4 h-4 text-[#D6A85F]" />
            <span>A Special Gift</span>
            <Sparkles className="w-4 h-4 text-[#D6A85F]" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-[#291820] tracking-tight">
            For Khushi <span className="text-[#E91E63] inline-block animate-heartbeat">❤️</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-lg sm:text-xl font-light text-[#8A6875] font-serif-luxury italic"
          >
            "I made a little something for you..."
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            className="text-xs sm:text-sm text-[#8A6875]/80 max-w-md mx-auto pt-1 pb-4 leading-relaxed"
          >
            Take your time. There are a few surprises waiting for you.
          </motion.p>
        </motion.div>

        {/* Call to Action Button with Guidance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="pt-2 flex flex-col items-center"
        >
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E91E63] mb-3 animate-bounce">
            <span>👇 TAP TO BEGIN YOUR SURPRISE</span>
          </div>

          <button
            onClick={handleOpenClick}
            disabled={isTransitioning}
            className="cute-romantic-btn group relative inline-flex items-center justify-center flex-nowrap gap-2 sm:gap-3 px-4 sm:px-9 py-3.5 sm:py-4 rounded-full text-white font-sans font-bold text-xs sm:text-base cursor-pointer overflow-hidden shadow-2xl max-w-[94vw] sm:max-w-md w-auto"
          >
            {/* Shimmer sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFE57F] flex-shrink-0 animate-pulse drop-shadow" />

            <span className="whitespace-nowrap tracking-normal sm:tracking-wide drop-shadow-sm font-sans font-semibold text-white">
              {isTransitioning ? "OPENING MAGIC..." : "OPEN YOUR BIRTHDAY SURPRISE"}
            </span>

            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 backdrop-blur-xs">
              <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white animate-heartbeat" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Cinematic White & Pink Flash Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 pointer-events-none bg-gradient-to-b from-[#FFF9FB] via-[#FCE7EF] to-[#FFFFFF]"
          />
        )}
      </AnimatePresence>
    </div>
  );
};
