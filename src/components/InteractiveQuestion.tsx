import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertCircle } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface InteractiveQuestionProps {
  onContinue: () => void;
}

export const InteractiveQuestion: React.FC<InteractiveQuestionProps> = ({ onContinue }) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [portalPos, setPortalPos] = useState<{ x: number; y: number } | null>(null);
  const [noRotation, setNoRotation] = useState(0);
  const [puffs, setPuffs] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [isNoFinalClicked, setIsNoFinalClicked] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);
  const initialNoBtnRef = useRef<HTMLButtonElement | null>(null);

  // Pure funny phrases with absolutely NO numbers
  const playfulMessages = [
    "NO 🙈",
    "Pakad ke dikhao! 😜",
    "Haha itni aasani se nahi! 😂",
    "Miss ho gaya na! 😝",
    "Speed badhao thodi! 🏃‍♂️💨",
    "Koshish achhi thi par fail! 😜",
    "Main navbar ke paas aa gaya! 🚀",
    "Haath nahi aane wala! 🏃‍♀️💨",
    "Thak toh nahi gayi? 🥱",
    "Main hawa ka jhonka hoon! 🍃😂",
    "Aadha safar paar hua! 🌈",
    "Maan jao na meri Khushi! 🥹❤️",
    "Finger ki exercise chal rahi! 🏋️‍♀️",
    "Arre re... fir se miss! 🤭",
    "Bas thoda sa aur bacha hai! ⏳",
    "Main pro dodger ban gaya! 😎",
    "Gussa mat karo please! 🥺👉👈",
    "Pakad ke dikhao abhi bhi! 🤏",
    "Almost... pakad liya tha! 😱",
    "Aakhri baar bhaag raha hoon! ⚡",
    "Achha baba maan gaye! 🏳️😭❤️ (Ab Click Karlo!)"
  ];

  const miniBadges = [
    "🏃‍♂️ Bhaago!",
    "🚀 Navbar ke paas!",
    "💨 Zoom!",
    "😜 Pakad ke dikhao!",
    "🤪 Yahan hoon!",
    "😂 Miss ho gaya!",
    "👀 Oye idhar!",
    "⚡ Bijli jaisa tezz!",
    "🙈 Haath nahi aunga!",
    "🍃 Hawa ka jhonka!"
  ];

  // Guaranteed separation: Runaway button strictly locks into TOP AREA near navbar [72px, 145px]
  // so it NEVER touches, overlaps, or comes anywhere near the pink YES button (Image 2)
  const calculateFarAwayPosition = (currentX?: number, currentY?: number) => {
    if (typeof window === 'undefined') return { x: 30, y: 80 };

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 640;
    const btnW = isMobile ? 210 : 250;
    const btnH = 46;

    const minX = 16;
    const maxX = Math.max(minX, vw - btnW - 16);

    let yesRect: DOMRect | null = null;
    if (yesButtonRef.current) {
      yesRect = yesButtonRef.current.getBoundingClientRect();
    }

    const isYesInLowerHalf = !yesRect || yesRect.top >= vh * 0.42;

    let minY = 72; // Below top navbar
    let maxY = 145;

    if (!isYesInLowerHalf) {
      minY = vh - btnH - 65;
      maxY = vh - btnH - 25;
    }

    let bestX = minX;
    let bestY = minY;
    let found = false;

    for (let i = 0; i < 30; i++) {
      const candidateX = minX + Math.random() * (maxX - minX);
      const candidateY = minY + Math.random() * (maxY - minY);

      // Strict vertical clearance from YES button: MUST BE >= 220px!
      if (yesRect) {
        const vertDist = Math.abs(candidateY - yesRect.top);
        if (vertDist < 220) continue;
      }

      if (currentX !== undefined && currentY !== undefined) {
        const dist = Math.hypot(candidateX - currentX, candidateY - currentY);
        if (dist < 90 && i < 24) continue;
      }

      bestX = candidateX;
      bestY = candidateY;
      found = true;
      break;
    }

    if (!found) {
      bestY = isYesInLowerHalf ? 80 : vh - btnH - 35;
      bestX = minX + Math.random() * (maxX - minX);
    }

    return { x: Math.round(bestX), y: Math.round(bestY) };
  };

  const evadeNoButton = (e?: React.SyntheticEvent) => {
    if (noAttempts >= 20) {
      return;
    }

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    romanticAudio.playBoing(noAttempts);

    let oldX = portalPos?.x;
    let oldY = portalPos?.y;

    if (oldX === undefined || oldY === undefined) {
      const rect = initialNoBtnRef.current?.getBoundingClientRect();
      oldX = rect ? rect.left : 50;
      oldY = rect ? rect.top : 200;
    }

    const puffEmojis = ['💨', '✨', '🏃‍♂️', '🤪', '👻', '⚡'];
    const newPuff = {
      id: Date.now() + Math.random(),
      x: oldX,
      y: oldY,
      emoji: puffEmojis[Math.floor(Math.random() * puffEmojis.length)]
    };
    setPuffs((prev) => [...prev.slice(-3), newPuff]);
    setTimeout(() => {
      setPuffs((prev) => prev.filter((p) => p.id !== newPuff.id));
    }, 850);

    const newPos = calculateFarAwayPosition(oldX, oldY);
    setPortalPos(newPos);
    setNoRotation((Math.random() - 0.5) * 32);
    setNoAttempts((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setIsYesClicked(true);
    romanticAudio.playCelebrationChime();
    triggerCelebrationConfetti();

    setTimeout(() => {
      triggerCelebrationConfetti();
    }, 600);

    setTimeout(() => {
      onContinue();
    }, 4200);
  };

  const handleNoClick = (e: React.MouseEvent) => {
    if (noAttempts < 20) {
      evadeNoButton(e);
    } else {
      e.preventDefault();
      setIsNoFinalClicked(true);
      romanticAudio.playCelebrationChime();
      triggerCelebrationConfetti();
    }
  };

  return (
    <section id="chapter-06" className="relative w-full pt-1 sm:pt-3 pb-6 px-2 sm:px-4 lg:px-6">
      
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
                  ref={yesButtonRef}
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

                {/* NO 🙈 Button: Initial state inside card before touching */}
                {noAttempts === 0 ? (
                  <motion.button
                    ref={initialNoBtnRef}
                    whileHover={{ scale: 1.02 }}
                    onPointerEnter={evadeNoButton}
                    onMouseEnter={evadeNoButton}
                    onTouchStart={evadeNoButton}
                    onPointerDown={evadeNoButton}
                    onClick={handleNoClick}
                    className="px-6 sm:px-8 py-3.5 rounded-full bg-white/95 border-2 border-pink-200 text-[#8A6875] hover:text-[#291820] hover:border-pink-300 font-sans font-semibold text-sm sm:text-base tracking-wide shadow-md cursor-pointer select-none z-10 transition-all whitespace-nowrap"
                  >
                    <span>{playfulMessages[0]}</span>
                  </motion.button>
                ) : (
                  <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-dashed border-pink-300/80 bg-pink-50/40 text-[11px] text-[#8A6875] font-mono select-none animate-pulse">
                    <span>💨 Button screen pe bhaag gaya!</span>
                  </div>
                )}

              </div>

              {noAttempts > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-[#8A6875] mt-6 font-mono"
                >
                  {noAttempts < 20 
                    ? "Try touching NO if you can! 😉"
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

      {/* PORTAL: Floating Runaway Button & Cartoon Smoke Puffs (Guaranteed 220px+ away from YES button) */}
      {typeof document !== 'undefined' && portalPos && noAttempts > 0 && !isYesClicked && !isNoFinalClicked && createPortal(
        <>
          {puffs.map((puff) => (
            <motion.div
              key={puff.id}
              initial={{ opacity: 1, scale: 0.8, y: 0 }}
              animate={{ opacity: 0, scale: 1.8, y: -25 }}
              transition={{ duration: 0.7 }}
              style={{
                position: 'fixed',
                left: puff.x + 35,
                top: puff.y,
                zIndex: 99998,
                pointerEvents: 'none'
              }}
              className="text-2xl drop-shadow select-none"
            >
              {puff.emoji}
            </motion.div>
          ))}

          <motion.div
            style={{
              position: 'fixed',
              left: portalPos.x,
              top: portalPos.y,
              zIndex: 99999
            }}
            animate={{
              rotate: noAttempts >= 20 ? 0 : noRotation,
              scale: noAttempts >= 20 ? [1, 1.08, 1] : [0.85, 1.12, 1]
            }}
            transition={
              noAttempts >= 20
                ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                : { type: "spring", stiffness: 480, damping: 20 }
            }
            className="relative"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF4081] to-[#E91E63] text-white text-[10px] font-bold tracking-wider uppercase shadow-md whitespace-nowrap animate-bounce flex items-center gap-1 pointer-events-none">
              <span>{noAttempts >= 20 ? "🏳️ Haar maan li!" : miniBadges[(noAttempts - 1) % miniBadges.length]}</span>
            </div>

            <button
              onPointerEnter={noAttempts < 20 ? evadeNoButton : undefined}
              onMouseEnter={noAttempts < 20 ? evadeNoButton : undefined}
              onMouseMove={noAttempts < 20 ? evadeNoButton : undefined}
              onTouchStart={noAttempts < 20 ? evadeNoButton : undefined}
              onPointerDown={noAttempts < 20 ? evadeNoButton : undefined}
              onClick={handleNoClick}
              className={`relative inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-sans font-bold shadow-2xl transition-all cursor-pointer select-none whitespace-nowrap will-change-transform ${
                noAttempts >= 20
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-2 border-white shadow-2xl glow-pink ring-4 ring-pink-300/60"
                  : "bg-white/95 hover:bg-pink-50 border-2 border-pink-300 text-[#8A6875] hover:text-[#E91E63] ring-2 ring-pink-200/50"
              }`}
            >
              <span>{playfulMessages[Math.min(noAttempts, playfulMessages.length - 1)]}</span>
            </button>
          </motion.div>
        </>,
        document.body
      )}
    </section>
  );
};
