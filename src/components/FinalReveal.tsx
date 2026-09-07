import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Crown, Sparkles } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { GiftBoxReveal } from './GiftBoxReveal';
import { PhotoInteractiveWrapper } from './PhotoInteractiveWrapper';

interface FinalRevealProps {
  onHeartFound?: (id: number) => void;
  foundHearts?: number[];
  onReplay?: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({ onHeartFound, foundHearts = [], onReplay }) => {
  const secretHeartId = 5;
  const isHeartFound = foundHearts.includes(secretHeartId);

  return (
    <section id="chapter-11" className="relative w-full pt-1 sm:pt-3 pb-8 px-2 sm:px-4 lg:px-6 overflow-hidden bg-gradient-to-b from-[#FFF9FB] via-[#FCE7EF]/60 to-[#FFFFFF]">
      
      {/* Background Soft Glow */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#E91E63]/15 via-[#F8D4DF]/30 to-[#D6A85F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10 space-y-6 sm:space-y-8">
        
        {/* Grand Finale Portrait: Image 1 (Sky Blue Dress Birthday Poster) */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-sm sm:max-w-md w-full mx-auto p-3.5 sm:p-4 rounded-[2.5rem] bg-gradient-to-b from-sky-50/90 via-white to-blue-50/70 border-2 border-sky-300/80 shadow-2xl glow-gold"
        >
          {/* Decorative Top Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-md z-20 flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3 h-3 text-[#FFE082]" />
            <span>A SPECIAL DAY • BIRTHDAY QUEEN</span>
          </div>

          <PhotoInteractiveWrapper photoName="Birthday Queen">
            <div className="relative overflow-hidden rounded-[2rem] aspect-[9/16] max-h-[580px] bg-sky-50 shadow-md">
              <img
                src="/photos/photo_blue_poster.jpg"
                alt="Khushi Singh - A Special Day Happy Birthday"
                className="w-full h-full object-cover object-center transform group-hover:scale-102 transition-transform duration-1000 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </PhotoInteractiveWrapper>

          <div className="pt-3 text-center">
            <p className="font-serif-luxury text-sm sm:text-base font-bold text-[#291820]">
              "Same Girl • Bigger Dreams • Happier Me"
            </p>
            <span className="text-[10px] font-mono text-[#8A6875] tracking-widest uppercase mt-0.5 block">
              Happy Birthday, Khushi Singh ✨
            </span>
          </div>
        </motion.div>

        {/* Royal Crest / Birthday Emblem of Endless Love */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-md w-full mx-auto p-6 sm:p-8 rounded-[2.5rem] glass-panel-deep shadow-2xl glow-gold border-2 border-amber-200/80 text-center"
        >
          {/* Animated Gold Aura */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#D6A85F]/20 via-[#FF4081]/15 to-[#D6A85F]/20 rounded-[2.5rem] blur-xl -z-10 animate-pulse pointer-events-none" />

          {/* Secret Easter Egg Heart #5 */}
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => {
                if (!isHeartFound && onHeartFound) {
                  romanticAudio.playSparkle();
                  onHeartFound(secretHeartId);
                }
              }}
              title="Find hidden hearts"
              aria-label="Secret Heart 5"
              className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
                isHeartFound ? 'bg-[#E91E63] text-white' : 'bg-black/10 hover:bg-black/20 text-[#C2185B]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isHeartFound ? 'fill-current' : ''}`} />
            </button>
          </div>

          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#D6A85F] to-[#FFE082] flex items-center justify-center text-white shadow-xl glow-gold">
            <Crown className="w-10 h-10 sm:w-12 sm:h-12 fill-white animate-bounce" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#D6A85F] font-bold">
            Official Birthday Decree • 2026
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#291820] mt-1 mb-2">
            Princess Khushi Singh
          </h3>
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875] max-w-xs mx-auto">
            "Crowned with boundless grace, unconditional kindness, and eternal love."
          </p>
        </motion.div>

        {/* Feature 1: Secret 3D Gift Box Reveal with 'Best Girlfriend' Award */}
        <GiftBoxReveal />

        {/* Emotional Ending Typography */}
        <div className="space-y-8 max-w-2xl mx-auto">
          
          {/* Headline 1 */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight"
          >
            Happy Birthday, Meri Princess <Crown className="inline-block w-8 h-8 text-[#D6A85F] -mt-2" />
          </motion.h2>

          {/* Blessing Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl font-serif-luxury text-[#8A6875] leading-relaxed italic"
          >
            May you always smile. <br />
            May your dreams come true. <br />
            And may life give you everything you deserve. <span className="text-[#E91E63]">❤️</span>
          </motion.p>

          {/* Declaration of Love */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="py-4 space-y-2"
          >
            <p className="text-xl sm:text-2xl font-serif-luxury text-[#291820] font-light">
              I love you so much...
            </p>
            <p className="text-2xl sm:text-4xl font-serif-luxury font-bold text-[#E91E63] tracking-tight">
              Aaj, kal aur hamesha. <span className="text-xl sm:text-2xl font-mono text-[#D6A85F]">❤️♾️</span>
            </p>
          </motion.div>

          {/* Final Signature Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 1.0 }}
            className="pt-8 border-t border-pink-200/60 flex flex-col items-center space-y-4"
          >
            <span className="font-serif-luxury text-base sm:text-lg text-[#8A6875] tracking-wide">
              — Aap ka apna
            </span>
            <p className="text-2xl sm:text-4xl font-serif-luxury font-bold bg-gradient-to-r from-[#E91E63] via-[#C2185B] to-[#D6A85F] bg-clip-text text-transparent tracking-tight">
              "Jisse aap bhool nahi sakti." <span className="text-[#E91E63] inline-block">❤️</span>
            </p>

            <div className="pt-2 flex items-center justify-center gap-2 text-[#E91E63] animate-heartbeat">
              <Heart className="w-6 h-6 fill-current" />
            </div>

            {/* Final Actions */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  if (onReplay) {
                    onReplay();
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="group relative inline-flex items-center justify-center flex-nowrap gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-white/95 border-2 border-pink-200 text-[#E91E63] font-sans font-bold text-sm sm:text-base shadow-lg hover:bg-pink-50 hover:border-pink-300 cursor-pointer active:scale-95 transition-all whitespace-nowrap"
              >
                <span>✨ Replay From Start</span>
              </button>

              <button
                onClick={() => {
                  romanticAudio.playCelebrationChime();
                  import('../utils/confetti').then((m) => m.triggerCelebrationConfetti());
                }}
                className="cute-romantic-btn group relative inline-flex items-center justify-center flex-nowrap gap-2 px-7 sm:px-9 py-3.5 rounded-full text-white font-sans font-bold text-sm sm:text-base cursor-pointer overflow-hidden shadow-2xl active:scale-95 transition-all whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#FFE57F] flex-shrink-0 animate-pulse drop-shadow" />
                <span className="whitespace-nowrap tracking-wide drop-shadow-sm">Celebrate Again!</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 text-xs">
                  🎉
                </span>
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
