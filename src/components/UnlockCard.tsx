import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Sparkles, Heart } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface UnlockCardProps {
  chapterNumber: number;
  question: string;
  subtitle?: string;
  buttonText: string;
  onUnlock: () => void;
  isUnlocked: boolean;
  targetId: string;
}

export const UnlockCard: React.FC<UnlockCardProps> = ({
  chapterNumber,
  question,
  subtitle,
  buttonText,
  onUnlock,
  isUnlocked,
  targetId
}) => {
  const handleUnlockClick = () => {
    romanticAudio.playCelebrationChime();
    triggerCelebrationConfetti();
    onUnlock();

    // Smoothly glide to the newly unlocked chapter
    setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  const handleScrollToTarget = () => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-12 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`relative max-w-xl w-full p-6 sm:p-8 rounded-3xl text-center transition-all duration-500 ${
          isUnlocked
            ? 'glass-panel border border-[#F8D4DF] shadow-md'
            : 'glass-panel-deep border-2 border-[#E91E63] shadow-2xl glow-pink'
        }`}
      >
        {/* Glow Aura when locked */}
        {!isUnlocked && (
          <div className="absolute -inset-1.5 bg-gradient-to-r from-[#E91E63]/25 via-[#D6A85F]/20 to-[#E91E63]/25 rounded-3xl blur-md -z-10 animate-pulse" />
        )}

        {/* Lock or Check Header */}
        <div className="flex items-center justify-center gap-2 mb-3">
          {isUnlocked ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#C2185B] text-xs font-mono uppercase tracking-wider font-semibold">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Surprise 0{chapterNumber} Unlocked!</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#E91E63] text-xs font-mono uppercase tracking-wider font-bold animate-pulse">
              <Lock className="w-3.5 h-3.5" />
              <span>Unlock Surprise 0{chapterNumber}</span>
            </div>
          )}
        </div>

        {/* Question / Prompt */}
        <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2">
          {question}
        </h3>

        {subtitle && (
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875] max-w-md mx-auto mb-6">
            "{subtitle}"
          </p>
        )}

        {/* Action Button */}
        {!isUnlocked ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleUnlockClick}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-white font-medium text-base sm:text-lg glass-button cursor-pointer shadow-xl shadow-pink-500/25 active:scale-95 transition-all"
          >
            <span>{buttonText}</span>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform text-[#D6A85F]" />
          </motion.button>
        ) : (
          <button
            onClick={handleScrollToTarget}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/80 border border-pink-200 text-xs font-mono uppercase text-[#E91E63] hover:bg-pink-50 cursor-pointer transition-colors"
          >
            <span>View Surprise 0{chapterNumber} Below ↓</span>
          </button>
        )}
      </motion.div>
    </div>
  );
};
