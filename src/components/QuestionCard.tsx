import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface QuestionCardProps {
  nextChapterNumber: number;
  prompt?: string;
  question: string;
  subtitle?: string;
  buttonText: string;
  onAnswer: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  nextChapterNumber,
  prompt = "Aage badhne se pehle ek chhota sa sawaal... 👀❤️",
  question,
  subtitle,
  buttonText,
  onAnswer
}) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [portalPos, setPortalPos] = useState<{ x: number; y: number } | null>(null);
  const [noRotation, setNoRotation] = useState(0);
  const [puffs, setPuffs] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  const yesButtonRef = useRef<HTMLButtonElement | null>(null);
  const initialNoBtnRef = useRef<HTMLButtonElement | null>(null);

  // Pure funny phrases with absolutely NO numbers
  const playfulPhrases = [
    "Nahi dekhna 🙈",
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

  // Guaranteed separation: The runaway button is strictly locked to the TOP AREA near navbar
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

    // When viewing QuestionCard, YES button is in the lower half of screen (or center).
    // Lock runaway button strictly in TOP AREA right below navbar: [72px, 145px]!
    // This creates a guaranteed 250px - 500px vertical gap away from YES button.
    const isYesInLowerHalf = !yesRect || yesRect.top >= vh * 0.42;

    let minY = 72; // Below top navbar
    let maxY = 145;

    if (!isYesInLowerHalf) {
      // If YES is scrolled to the very top, put runaway button at the very bottom
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

      // Leap far away from previous position
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
    // Before 20 attempts, strictly refuse click and leap away!
    if (noAttempts >= 20) {
      return;
    }

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    romanticAudio.playBoing(noAttempts);

    // Get current position for smoke puff
    let oldX = portalPos?.x;
    let oldY = portalPos?.y;

    if (oldX === undefined || oldY === undefined) {
      const rect = initialNoBtnRef.current?.getBoundingClientRect();
      oldX = rect ? rect.left : 50;
      oldY = rect ? rect.top : 200;
    }

    // Spawn funny smoke puff
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

  const handleNoClick = (e: React.MouseEvent) => {
    // Strictly impossible to click before 20 attempts
    if (noAttempts < 20) {
      evadeNoButton(e);
      return;
    }

    // On 20th attempt, finally surrender and celebrate!
    e.preventDefault();
    romanticAudio.playCelebrationChime();
    triggerCelebrationConfetti();
    onAnswer();
  };

  const handleYesClick = () => {
    romanticAudio.playCelebrationChime();
    triggerCelebrationConfetti();
    onAnswer();
  };

  // Clean button text so emojis never duplicate or wrap awkwardly
  const cleanedText = buttonText.replace(/[❤️✨💕🌸👑💌👂👀🎉🕯️🎂]/g, '').trim();

  // Detect custom icon/emoji if provided in buttonText
  const hasEmojiMatch = buttonText.match(/[❤️✨💕🌸👑💌👂👀🎉🕯️🎂]/);
  const emoji = hasEmojiMatch ? hasEmojiMatch[0] : '❤️';

  return (
    <div id="question-section" className="w-full pt-6 sm:pt-8 pb-12 sm:pb-16 px-3 sm:px-4 flex justify-center scroll-mt-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-md sm:max-w-lg w-full p-6 sm:p-8 rounded-[2.5rem] glass-panel-deep border-2 border-[#F8D4DF] text-center shadow-2xl glow-pink"
      >
        {/* Soft Background Radial Glow */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#FF4081]/20 via-[#D6A85F]/15 to-[#FF4081]/20 rounded-[2.5rem] blur-xl -z-10 animate-pulse pointer-events-none" />

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/90 text-[#E91E63] text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold mb-3 shadow-xs">
          <Heart className="w-3 h-3 fill-current animate-heartbeat" />
          <span>Surprise 0{nextChapterNumber} Ahead</span>
        </div>

        {/* Prompt line */}
        {prompt && (
          <p className="text-xs sm:text-sm font-serif-luxury text-[#8A6875] italic mb-1.5">
            "{prompt}"
          </p>
        )}

        {/* Main Question */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2 leading-snug">
          {question}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#8A6875] font-light max-w-sm mx-auto mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Two Options: Option 1 (YES) + Option 2 (Playful Untouchable Runaway Nakhre Button) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          
          {/* Option 1: Main Romantic Yes Button */}
          <motion.button
            ref={yesButtonRef}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleYesClick}
            className="cute-romantic-btn group relative inline-flex items-center justify-center flex-nowrap gap-2 sm:gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-white font-sans font-bold text-sm sm:text-base cursor-pointer overflow-hidden shadow-2xl w-full sm:w-auto z-10"
          >
            {/* Ambient Shimmer Sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Left Golden Sparkle Icon */}
            <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FFE57F] flex-shrink-0 animate-pulse drop-shadow" />

            {/* Clean, Non-wrapping Text */}
            <span className="whitespace-nowrap tracking-wide drop-shadow-sm font-sans font-semibold text-white">
              {cleanedText}
            </span>

            {/* Cute Glass Bubble Badge on Right */}
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 backdrop-blur-xs">
              {emoji === '❤️' || emoji === '💕' ? (
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white animate-heartbeat" />
              ) : (
                <span className="text-xs sm:text-sm leading-none">{emoji}</span>
              )}
            </span>
          </motion.button>

          {/* Option 2: Initial position inside card before user tries to touch */}
          {noAttempts === 0 ? (
            <motion.button
              ref={initialNoBtnRef}
              whileHover={{ scale: 1.02 }}
              onPointerEnter={evadeNoButton}
              onMouseEnter={evadeNoButton}
              onTouchStart={evadeNoButton}
              onPointerDown={evadeNoButton}
              onClick={handleNoClick}
              className="relative inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-white/95 hover:bg-pink-50 border-2 border-pink-200 text-xs sm:text-sm font-sans font-bold text-[#8A6875] hover:text-[#E91E63] shadow-md hover:shadow-lg transition-colors cursor-pointer select-none whitespace-nowrap z-20"
            >
              <span>{playfulPhrases[0]}</span>
            </motion.button>
          ) : (
            /* Playful placeholder inside card after the button escapes */
            <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-dashed border-pink-300/80 bg-pink-50/40 text-[11px] text-[#8A6875] font-mono select-none animate-pulse">
              <span>💨 Arre! Button screen pe bhaag gaya!</span>
            </div>
          )}
        </div>

        {/* Sweet Helper Text */}
        <p className="text-[11px] text-[#8A6875]/70 font-mono mt-3.5 tracking-wider uppercase">
          Tap to reveal surprise ✨
        </p>
      </motion.div>

      {/* PORTAL: Floating Runaway Button & Cartoon Smoke Puffs (Guaranteed 220px+ away from YES button) */}
      {typeof document !== 'undefined' && portalPos && noAttempts > 0 && createPortal(
        <>
          {/* Cartoon Puffs left behind at previous positions */}
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

          {/* Untouchable Runaway Button jumping strictly near navbar */}
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
            {/* Cartoon Speech Bubble / Teasing Badge Above Button */}
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
              <span>{playfulPhrases[Math.min(noAttempts, playfulPhrases.length - 1)]}</span>
            </button>
          </motion.div>
        </>,
        document.body
      )}
    </div>
  );
};
