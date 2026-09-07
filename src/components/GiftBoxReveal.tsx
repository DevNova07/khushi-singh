import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Award, Crown, Sparkles, Heart, CheckCircle } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';

export const GiftBoxReveal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBox = () => {
    romanticAudio.playFanfare();
    import('../utils/confetti').then((m) => m.triggerCelebrationConfetti());
    setIsOpen(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-10 p-5 sm:p-8 rounded-[2.5rem] bg-gradient-to-b from-white via-[#FFF6FA] to-white border-2 border-pink-200 shadow-2xl relative overflow-hidden text-center">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-[#D6A85F]/20 via-[#FF4081]/15 to-[#FFE082]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-200 text-[#795548] font-mono text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
        <Gift className="w-3.5 h-3.5 text-[#D6A85F]" />
        <span>Special Birthday Surprise Box</span>
        <Sparkles className="w-3.5 h-3.5 text-[#D6A85F]" />
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="py-6 flex flex-col items-center space-y-4"
          >
            {/* Animated 3D Gift Box Graphic */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
              className="relative cursor-pointer"
              onClick={handleOpenBox}
            >
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-[#E91E63] via-[#FF4081] to-[#D6A85F] p-1 shadow-2xl glow-pink flex items-center justify-center">
                <div className="w-full h-full rounded-[1.4rem] bg-gradient-to-b from-[#FFF5F8] to-[#FCE4EC] flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Ribbon cross */}
                  <div className="absolute inset-y-0 w-5 bg-gradient-to-b from-[#D6A85F] to-[#FFE082] shadow-sm" />
                  <div className="absolute inset-x-0 h-5 bg-gradient-to-r from-[#D6A85F] to-[#FFE082] shadow-sm" />

                  <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-[#E91E63] relative z-10 drop-shadow-sm" />
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#FFE082] flex items-center justify-center shadow-md animate-bounce">
                <Sparkles className="w-4 h-4 text-[#795548]" />
              </div>
            </motion.div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#291820]">
                Khushi, Aapke Liye Ek Gift Box Band Hai... 🎁
              </h3>
              <p className="text-xs sm:text-sm font-serif-luxury text-[#8A6875] italic">
                "Dekho isme kya secret surprise chhipa hai!"
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenBox}
              className="cute-romantic-btn group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-sans font-bold text-sm sm:text-base shadow-xl cursor-pointer active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#FFE57F] animate-pulse" />
              <span>Tap to Unwrap Surprise 🎀</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="py-4 space-y-5"
          >
            {/* The Official Certificate / Trophy Card */}
            <div className="relative p-6 sm:p-8 rounded-[2rem] bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FFFDF9] border-4 border-[#D6A85F]/80 shadow-2xl text-center">
              {/* Gold Filigree Ribbon */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#D6A85F] to-[#FFE082] text-[#4E342E] font-mono text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>OFFICIAL 2026 CERTIFICATE</span>
              </div>

              {/* Trophy & Crown Graphic */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto my-3 rounded-full bg-gradient-to-tr from-[#D6A85F] to-[#FFE57F] flex items-center justify-center text-white shadow-xl glow-gold">
                <Crown className="w-10 h-10 sm:w-12 sm:h-12 fill-white animate-pulse" />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-[#D6A85F] font-bold">
                Lifetime Achievement of Love
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#291820] mt-1 mb-2">
                "Best Girlfriend in the World" 🏆
              </h2>

              <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#D6A85F] to-transparent mb-3" />

              <p className="text-xs sm:text-sm font-serif-luxury text-[#5D4037] leading-relaxed max-w-md mx-auto">
                This award is officially conferred upon <span className="font-bold text-[#C2185B]">Princess Khushi Singh</span>, for having the purest heart, the most infectious smile, and bringing unlimited joy, peace, and love into Ramzan's life.
              </p>

              <div className="mt-5 pt-4 border-t border-[#D6A85F]/30 flex flex-wrap items-center justify-between gap-2 text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-[11px] font-mono text-[#5D4037] font-semibold">100% Verified By Dil</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#8A6875] block">Conferred with Love by</span>
                  <span className="font-serif-luxury text-sm font-bold text-[#E91E63]">Ramzan ❤️</span>
                </div>
              </div>
            </div>

            {/* Confetti celebration message */}
            <p className="text-xs sm:text-sm font-serif-luxury text-[#8A6875] italic flex items-center justify-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#E91E63] fill-current" />
              <span>You deserve every award, crown, and happiness in this universe!</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
