import React, { useState } from 'react';
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
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noRotation, setNoRotation] = useState(0);
  const [noAttempts, setNoAttempts] = useState(0);

  const playfulPhrases = [
    "Nahi dekhna 🙈",                               // 0 (Initial)
    "Pakad ke dikhao! 😜 (1/20)",                   // 1
    "Haha itni aasani se nahi! 😂 (2/20)",          // 2
    "Miss ho gaya na! 😝 (3/20)",                   // 3
    "Speed badhao thodi! 🏃‍♂️💨 (4/20)",              // 4
    "Koshish achhi thi par fail! 😜 (5/20)",        // 5
    "Main idhar aa gaya! 👋🤪 (6/20)",              // 6
    "Haath nahi aane wala! 🏃‍♀️💨 (7/20)",            // 7
    "Thak toh nahi gayi? 🥱 (8/20)",                // 8
    "Main hawa ka jhonka hoon! 🍃😂 (9/20)",        // 9
    "Aadha safar ho gaya! 🔟 (10/20)",              // 10
    "Maan jao na meri Khushi! 🥹❤️ (11/20)",        // 11
    "Finger ki exercise chal rahi! 🏋️‍♀️ (12/20)",     // 12
    "Arre re... fir se miss! 🤭 (13/20)",           // 13
    "Bas thode aur bache hain! ⏳ (14/20)",         // 14
    "Main pro dodger ban gaya! 😎 (15/20)",         // 15
    "Gussa mat karo please! 🥺👉👈 (16/20)",        // 16
    "Pakad ke dikhao abhi bhi! 🤏 (17/20)",          // 17
    "Almost... pakad liya tha! 😱 (18/20)",          // 18
    "Aakhri baar bhaag raha hoon! ⚡ (19/20)",       // 19
    "Achha baba maan gaye! 🏳️😭❤️ (Ab Click Karlo!)" // 20
  ];

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

    // Mobile vs Desktop boundaries
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxX = isMobile ? 120 : 220;
    const maxY = isMobile ? 85 : 135;

    // Ensure significant displacement from current position so it always leaps far away
    let newX = 0;
    let newY = 0;
    let attempts = 0;
    do {
      const signX = Math.random() > 0.5 ? 1 : -1;
      const signY = Math.random() > 0.5 ? 1 : -1;
      newX = signX * (55 + Math.random() * (maxX - 55));
      newY = signY * (35 + Math.random() * (maxY - 35));
      attempts++;
    } while (Math.hypot(newX - noPosition.x, newY - noPosition.y) < 85 && attempts < 15);

    const clampedX = Math.max(-maxX, Math.min(maxX, newX));
    const clampedY = Math.max(-maxY, Math.min(maxY, newY));

    setNoPosition({ x: clampedX, y: clampedY });
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

          {/* Option 2: Playful Runaway Nakhre Button (Untouchable & Evades until 20 attempts) */}
          <motion.button
            animate={{ 
              x: noAttempts >= 20 ? 0 : noPosition.x, 
              y: noAttempts >= 20 ? 0 : noPosition.y, 
              rotate: noAttempts >= 20 ? 0 : noRotation,
              scale: noAttempts >= 20 ? [1, 1.05, 1] : 1
            }}
            transition={
              noAttempts >= 20
                ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                : { type: "spring", stiffness: 500, damping: 20 }
            }
            onPointerEnter={noAttempts < 20 ? evadeNoButton : undefined}
            onMouseEnter={noAttempts < 20 ? evadeNoButton : undefined}
            onMouseMove={noAttempts < 20 ? evadeNoButton : undefined}
            onTouchStart={noAttempts < 20 ? evadeNoButton : undefined}
            onPointerDown={noAttempts < 20 ? evadeNoButton : undefined}
            onClick={handleNoClick}
            className={`relative inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-sans font-bold shadow-md hover:shadow-lg transition-colors cursor-pointer select-none whitespace-nowrap z-20 will-change-transform ${
              noAttempts >= 20
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-2 border-white shadow-xl glow-pink"
                : "bg-white/95 hover:bg-pink-50 border-2 border-pink-200 text-[#8A6875] hover:text-[#E91E63]"
            }`}
          >
            <span>{playfulPhrases[Math.min(noAttempts, playfulPhrases.length - 1)]}</span>
          </motion.button>
        </div>

        {/* Sweet Helper Text */}
        <p className="text-[11px] text-[#8A6875]/70 font-mono mt-3.5 tracking-wider uppercase">
          Tap to reveal surprise ✨
        </p>
      </motion.div>
    </div>
  );
};
