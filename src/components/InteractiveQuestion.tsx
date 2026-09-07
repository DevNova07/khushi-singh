import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface InteractiveQuestionProps {
  onContinue: () => void;
}

export const InteractiveQuestion: React.FC<InteractiveQuestionProps> = ({ onContinue }) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [isNoFinalClicked, setIsNoFinalClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const playfulMessages = [
    "NO 🙈",
    "Are you sure? 👀",
    "Ek baar aur soch lo... 🥹",
    "Khushi pleaseee 😂❤️",
    "YES is looking better, right? 😌",
    "Still NO? Okay, try clicking now! 😜"
  ];

  // Move the NO button away within safe bounding box
  const evadeNoButton = () => {
    if (noAttempts >= 5) {
      // After 5 attempts, allow clicking NO
      return;
    }

    romanticAudio.playPop();

    // Calculate displacement clamped to container bounds
    const isMobile = window.innerWidth < 768;
    const maxX = isMobile ? 80 : 160;
    const maxY = isMobile ? 50 : 90;

    // Alternate directions with pseudo-random offsets
    const signX = (noAttempts % 2 === 0 ? 1 : -1);
    const signY = (noAttempts % 3 === 0 ? 1 : -1);

    const newX = signX * (40 + Math.random() * (maxX - 40));
    const newY = signY * (25 + Math.random() * (maxY - 25));

    setNoPosition({ x: newX, y: newY });
    setNoAttempts((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsYesClicked(true);
    romanticAudio.playCelebrationChime();
    triggerCelebrationConfetti();

    // Secondary burst of sparkles after 500ms
    setTimeout(() => {
      triggerCelebrationConfetti();
    }, 600);

    // Continue automatically after full celebration
    setTimeout(() => {
      onContinue();
    }, 4200);
  };

  const handleNoClick = () => {
    if (noAttempts < 5) {
      evadeNoButton();
    } else {
      // User persistently clicked NO 5+ times, accept gracefully!
      setIsNoFinalClicked(true);
      romanticAudio.playPop();
    }
  };

  return (
    <section id="chapter-06" className="relative w-full pt-1 sm:pt-3 pb-6 px-2 sm:px-4 lg:px-6 overflow-hidden">
      
      {/* Background Soft Hearts & Glow */}
      <div className="absolute w-96 h-96 bg-[#FCE7EF]/60 rounded-full blur-3xl pointer-events-none" />

      <div ref={containerRef} className="relative z-10 max-w-xl w-full mx-auto">
        
        <AnimatePresence mode="wait">
          
          {/* STATE 1: Default Question Card */}
          {!isYesClicked && !isNoFinalClicked && (
            <motion.div
              key="question-card"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-12 rounded-3xl glass-panel-deep shadow-2xl text-center border-2 border-[#F8D4DF] relative"
            >
              <h3 className="text-xl sm:text-2xl font-serif-luxury text-[#8A6875] italic mb-3">
                "Khushi, ek chhota sa sawaal hai... 👀❤️"
              </h3>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-8">
                Did you like your birthday surprise?
              </h2>

              {/* Interactive Buttons Container */}
              <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6 min-h-[90px]">
                
                {/* YES ❤️ Button */}
                <motion.button
                  onClick={handleYesClick}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="cute-romantic-btn group relative inline-flex items-center justify-center flex-nowrap gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white font-sans font-bold text-base sm:text-lg cursor-pointer overflow-hidden shadow-2xl z-20"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFE57F] flex-shrink-0 animate-pulse drop-shadow" />
                  <span className="whitespace-nowrap tracking-wide drop-shadow-sm">YES, I LOVE IT!</span>
                  <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 backdrop-blur-xs">
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white animate-heartbeat" />
                  </span>
                </motion.button>

                {/* NO 🙈 Button with Evasion Physics */}
                <motion.button
                  animate={{
                    x: noPosition.x,
                    y: noPosition.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 22
                  }}
                  onMouseEnter={() => {
                    if (window.innerWidth >= 768) evadeNoButton();
                  }}
                  onClick={handleNoClick}
                  className="px-6 sm:px-8 py-3.5 rounded-full bg-white/95 border-2 border-pink-200 text-[#8A6875] hover:text-[#291820] hover:border-pink-300 font-sans font-semibold text-sm sm:text-base tracking-wide shadow-md cursor-pointer select-none z-10 transition-all whitespace-nowrap"
                >
                  <span>{playfulMessages[Math.min(noAttempts, playfulMessages.length - 1)]}</span>
                </motion.button>

              </div>

              {noAttempts > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-[#8A6875] mt-6 font-mono"
                >
                  Attempt {noAttempts}/5 • Try touching NO if you can! 😉
                </motion.p>
              )}
            </motion.div>
          )}

          {/* STATE 2: YES Celebration Modal & Sequence */}
          {isYesClicked && (
            <motion.div
              key="yes-celebration"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-12 rounded-3xl glass-panel-deep shadow-2xl text-center border-2 border-[#E91E63] relative glow-pink"
            >
              {/* Expanding Heart Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.4, 1.1] }}
                transition={{ duration: 0.9, times: [0, 0.6, 1] }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[#E91E63] to-[#FF80AB] flex items-center justify-center text-white shadow-xl glow-pink"
              >
                <Heart className="w-12 h-12 fill-white animate-heartbeat" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#E91E63] tracking-tight mb-4"
              >
                I KNEW IT! 🥹❤️
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl sm:text-2xl font-serif-luxury italic text-[#291820] mb-3"
              >
                "Ab meri smile bhi nahi ruk rahi... 😌"
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-sm text-[#8A6875] font-mono tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#D6A85F]" />
                <span>Chalo, ab next surprise... ✨</span>
                <Sparkles className="w-4 h-4 text-[#D6A85F]" />
              </motion.div>

              {/* Immediate Continue Button */}
              <div className="pt-6">
                <button
                  onClick={onContinue}
                  className="cute-romantic-btn group relative inline-flex items-center justify-center flex-nowrap gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white font-sans font-bold text-sm sm:text-base cursor-pointer overflow-hidden shadow-2xl active:scale-95 transition-transform"
                >
                  <Sparkles className="w-4 h-4 text-[#FFE57F] flex-shrink-0 animate-pulse drop-shadow" />
                  <span className="whitespace-nowrap tracking-wide drop-shadow-sm">Continue to Next Surprise</span>
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 text-xs">
                    ➔
                  </span>
                </button>
              </div>

              {/* Progress Indicator Line */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "linear" }}
                className="h-1 bg-gradient-to-r from-[#E91E63] to-[#D6A85F] rounded-full mx-auto mt-6"
              />
            </motion.div>
          )}

          {/* STATE 3: Graceful NO Acceptance */}
          {isNoFinalClicked && (
            <motion.div
              key="no-accepted"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-12 rounded-3xl glass-panel-deep shadow-2xl text-center border border-[#F8D4DF]"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 flex items-center justify-center text-[#E91E63]">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#291820] mb-2">
                "Okay okay... 😂 I'll accept that answer."
              </h3>
              <p className="text-lg font-serif-luxury text-[#8A6875] italic mb-6">
                "Par main thoda sad ho gaya... 🥹"
              </p>
              <button
                onClick={onContinue}
                className="cute-romantic-btn group relative inline-flex items-center justify-center flex-nowrap gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white font-sans font-bold text-sm sm:text-base cursor-pointer overflow-hidden shadow-2xl"
              >
                <Sparkles className="w-4 h-4 text-[#FFE57F] flex-shrink-0 drop-shadow" />
                <span className="whitespace-nowrap tracking-wide drop-shadow-sm">Continue Anyway</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 text-xs">
                  ✨
                </span>
              </button>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </section>
  );
};
