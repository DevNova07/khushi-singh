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
    "NO 🙈",                                     // 0 (Initial)
    "Pakad ke dikhao! 😜 (1/20)",                // 1
    "Haha itni aasani se nahi! 😂 (2/20)",       // 2
    "Miss ho gaya na! 😝 (3/20)",                // 3
    "Speed badhao thodi! 🏃‍♂️💨 (4/20)",           // 4
    "Koshish achhi thi par fail! 😜 (5/20)",     // 5
    "Main idhar aa gaya! 👋🤪 (6/20)",           // 6
    "Haath nahi aane wala! 🏃‍♀️💨 (7/20)",         // 7
    "Thak toh nahi gayi? 🥱 (8/20)",             // 8
    "Main hawa ka jhonka hoon! 🍃😂 (9/20)",     // 9
    "Aadha safar ho gaya! 🔟 (10/20)",           // 10
    "Maan jao na meri Khushi! 🥹❤️ (11/20)",     // 11
    "Finger ki exercise chal rahi! 🏋️‍♀️ (12/20)",  // 12
    "Arre re... fir se miss! 🤭 (13/20)",        // 13
    "Bas thode aur bache hain! ⏳ (14/20)",      // 14
    "Main pro dodger ban gaya! 😎 (15/20)",      // 15
    "Gussa mat karo please! 🥺👉👈 (16/20)",     // 16
    "Pakad ke dikhao abhi bhi! 🤏 (17/20)",       // 17
    "Almost... pakad liya tha! 😱 (18/20)",       // 18
    "Aakhri baar bhaag raha hoon! ⚡ (19/20)",    // 19
    "Achha baba maan gaye! 🏳️😭❤️ (Ab Click Karlo!)" // 20
  ];

  // Move the NO button away within safe bounding box
  const evadeNoButton = (e?: React.SyntheticEvent) => {
    if (noAttempts >= 20) {
      // After 20 attempts, allow clicking NO
      return;
    }

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    romanticAudio.playBoing(noAttempts);

    // Calculate displacement clamped to container bounds
    const isMobile = window.innerWidth < 768;
    const maxX = isMobile ? 110 : 200;
    const maxY = isMobile ? 80 : 130;

    let newX = 0;
    let newY = 0;
    let attempts = 0;
    do {
      const signX = Math.random() > 0.5 ? 1 : -1;
      const signY = Math.random() > 0.5 ? 1 : -1;
      newX = signX * (50 + Math.random() * (maxX - 50));
      newY = signY * (35 + Math.random() * (maxY - 35));
      attempts++;
    } while (Math.hypot(newX - noPosition.x, newY - noPosition.y) < 85 && attempts < 15);

    const clampedX = Math.max(-maxX, Math.min(maxX, newX));
    const clampedY = Math.max(-maxY, Math.min(maxY, newY));

    setNoPosition({ x: clampedX, y: clampedY });
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

  const handleNoClick = (e: React.MouseEvent) => {
    if (noAttempts < 20) {
      evadeNoButton(e);
    } else {
      // User persistently clicked NO 20 times, accept gracefully!
      e.preventDefault();
      setIsNoFinalClicked(true);
      romanticAudio.playCelebrationChime();
      triggerCelebrationConfetti();
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

                {/* NO 🙈 Button with 20 Attempts Evasion Physics */}
                <motion.button
                  animate={{
                    x: noAttempts >= 20 ? 0 : noPosition.x,
                    y: noAttempts >= 20 ? 0 : noPosition.y,
                    scale: noAttempts >= 20 ? [1, 1.05, 1] : 1
                  }}
                  transition={
                    noAttempts >= 20
                      ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                      : { type: "spring", stiffness: 450, damping: 20 }
                  }
                  onPointerEnter={noAttempts < 20 ? evadeNoButton : undefined}
                  onMouseEnter={noAttempts < 20 ? evadeNoButton : undefined}
                  onMouseMove={noAttempts < 20 ? evadeNoButton : undefined}
                  onTouchStart={noAttempts < 20 ? evadeNoButton : undefined}
                  onPointerDown={noAttempts < 20 ? evadeNoButton : undefined}
                  onClick={handleNoClick}
                  className={`px-6 sm:px-8 py-3.5 rounded-full font-sans font-semibold text-sm sm:text-base tracking-wide shadow-md cursor-pointer select-none z-10 transition-all whitespace-nowrap will-change-transform ${
                    noAttempts >= 20
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-2 border-white shadow-xl glow-pink"
                      : "bg-white/95 border-2 border-pink-200 text-[#8A6875] hover:text-[#291820] hover:border-pink-300"
                  }`}
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
                  {noAttempts < 20 
                    ? `Attempt ${noAttempts}/20 • Try touching NO if you can! 😉`
                    : "Maan gaye aapki zidd ko! 🙈❤️ Ab click kar sakte ho!"}
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
