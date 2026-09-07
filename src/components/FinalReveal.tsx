import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Crown, Sparkles } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';

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
        
        {/* PHOTO 8: Cinematic Final Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative group max-w-md sm:max-w-lg w-full mx-auto p-3 sm:p-4 rounded-3xl glass-panel-deep shadow-2xl glow-pink"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-pink-50">
            <img
              src="/photos/photo8_final.jpg"
              alt="Khushi Singh - Final Portrait"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            
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
                  isHeartFound ? 'bg-[#E91E63] text-white' : 'bg-black/30 hover:bg-black/50 text-white/80'
                }`}
              >
                <Heart className={`w-4 h-4 ${isHeartFound ? 'fill-white' : ''}`} />
              </button>
            </div>

            <div className="absolute bottom-5 inset-x-0 text-center text-white px-4">
              <span className="text-[11px] font-mono tracking-widest text-[#D6A85F] uppercase">Chapter 10 • Grand Finale</span>
              <p className="font-serif-luxury text-xl font-bold">Khushi Singh</p>
            </div>
          </div>
        </motion.div>

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
            className="pt-10 border-t border-pink-200/60 flex flex-col items-center space-y-3"
          >
            <span className="font-serif-luxury text-base sm:text-lg text-[#8A6875] tracking-wide">
              — Aap ka apna
            </span>
            <p className="text-2xl sm:text-4xl font-serif-luxury font-bold bg-gradient-to-r from-[#E91E63] via-[#C2185B] to-[#D6A85F] bg-clip-text text-transparent tracking-tight">
              "Jisse aap bhool nahi sakti." <span className="text-[#E91E63] inline-block">❤️</span>
            </p>

            <div className="pt-6 flex items-center justify-center gap-2 text-[#E91E63] animate-heartbeat">
              <Heart className="w-5 h-5 fill-current" />
            </div>

            {/* Final Actions */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
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
