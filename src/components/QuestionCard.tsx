import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [teaseMessage, setTeaseMessage] = useState<string | null>(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleYesClick = () => {
    romanticAudio.playCelebrationChime();
    triggerCelebrationConfetti();
    onAnswer();
  };

  const handleNoClick = () => {
    romanticAudio.playPop();
    setTeaseMessage("Aise kaise nahi? Meri princess ko toh dekhna hi padega! 😜❤️");
    triggerCelebrationConfetti();
    setTimeout(() => {
      onAnswer();
    }, 1500);
  };

  const handleNoHover = () => {
    if (window.innerWidth >= 768) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 40;
      setNoPosition({ x, y });
      romanticAudio.playPop();
    }
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

        {/* Two Options: Option 1 (YES) + Option 2 (Playful NO / Nakhre) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 pt-1">
          
          {/* Option 1: Main Romantic Yes Button */}
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleYesClick}
            className="cute-romantic-btn group relative inline-flex items-center justify-center flex-nowrap gap-2 sm:gap-2.5 px-6 sm:px-8 py-3.5 sm:py-3.5 rounded-full text-white font-sans font-bold text-sm sm:text-base cursor-pointer overflow-hidden shadow-2xl w-full sm:w-auto"
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

          {/* Option 2: Playful Nakhre Button */}
          <motion.button
            animate={{ x: noPosition.x, y: noPosition.y }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            onMouseEnter={handleNoHover}
            whileTap={{ scale: 0.94 }}
            onClick={handleNoClick}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-3 sm:py-3.5 rounded-full bg-white/95 hover:bg-pink-50 border border-pink-200/90 text-xs sm:text-sm font-sans font-semibold text-[#8A6875] hover:text-[#E91E63] transition-colors cursor-pointer shadow-sm hover:shadow w-full sm:w-auto"
          >
            <span>Nahi dekhna</span>
            <span className="text-sm">🙈</span>
          </motion.button>

        </div>

        {/* Playful Nakhre Toast Message */}
        <AnimatePresence>
          {teaseMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="mt-4 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white text-xs sm:text-sm font-serif-luxury font-medium shadow-xl inline-flex items-center gap-1.5 animate-bounce"
            >
              <span>{teaseMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sweet Helper Text */}
        <p className="text-[11px] text-[#8A6875]/70 font-mono mt-3.5 tracking-wider uppercase">
          Tap to reveal surprise ✨
        </p>
      </motion.div>
    </div>
  );
};
