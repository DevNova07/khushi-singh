import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Crown, Sparkles, MessageCircle } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { GiftBoxReveal } from './GiftBoxReveal';
import { BirthdayPromises } from './BirthdayPromises';
import { LoveCoupons } from './LoveCoupons';

interface FinalRevealProps {
  onHeartFound?: (id: number) => void;
  foundHearts?: number[];
  onReplay?: () => void;
}

export const FinalReveal: React.FC<FinalRevealProps> = ({ onHeartFound, foundHearts = [], onReplay }) => {
  const secretHeartId = 5;
  const isHeartFound = foundHearts.includes(secretHeartId);

  const whatsappMessage = encodeURIComponent(
    "Hey Ramzan! ❤️ Aapka ye birthday surprise sach me bohot hi khoobsurat, emotional aur pyara tha! Mujhe har ek photo, letter, aur coupons bohot pasand aaye! Thank you so much for loving me like this! 🥰🎂✨"
  );

  return (
    <section id="chapter-11" className="relative w-full pt-1 sm:pt-3 pb-8 px-2 sm:px-4 lg:px-6 overflow-hidden bg-gradient-to-b from-[#FFF9FB] via-[#FCE7EF]/60 to-[#FFFFFF]">
      
      {/* Background Soft Glow */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#E91E63]/15 via-[#F8D4DF]/30 to-[#D6A85F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10 space-y-6 sm:space-y-8">
        
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

        {/* Feature 2: 5 Sacred Birthday Promises */}
        <BirthdayPromises />

        {/* Feature 3: Khushi's Birthday Love Coupons */}
        <LoveCoupons />

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

            {/* Feature 4: Direct WhatsApp Reaction Card */}
            <div className="w-full max-w-md mx-auto my-6 p-5 rounded-3xl bg-gradient-to-br from-green-500/15 via-pink-50 to-amber-50/40 border-2 border-green-500/30 shadow-xl text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-800 font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Instant Birthday Reply</span>
              </div>
              <h4 className="font-serif-luxury font-bold text-lg sm:text-xl text-[#291820]">
                Khushi, Kaisa Laga Mera Surprise? 🥹❤️
              </h4>
              <p className="text-xs font-serif-luxury text-[#8A6875] italic mt-1 mb-4">
                "Bas ek tap karke mujhe WhatsApp par batao!"
              </p>

              <a
                href={`https://wa.me/917392099587?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans font-bold text-sm sm:text-base shadow-lg hover:shadow-xl active:scale-95 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Mujhe WhatsApp Par Batao 💬❤️</span>
              </a>
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
