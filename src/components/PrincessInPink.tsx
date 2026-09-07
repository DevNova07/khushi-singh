import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { PhotoInteractiveWrapper } from './PhotoInteractiveWrapper';

export const PrincessInPink: React.FC = () => {
  const scrollToNext = () => {
    const questionCard = document.getElementById('question-section');
    if (questionCard) {
      questionCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="chapter-07" className="relative w-full pt-2 pb-6 px-3 sm:px-4">
      {/* Rose Quartz Glowing Fairytale Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-92 h-92 bg-gradient-to-tr from-pink-200/50 via-rose-200/40 to-fuchsia-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Fairytale Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/90 border border-pink-300/80 text-[#E91E63] text-[11px] font-mono uppercase tracking-widest mb-2 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E91E63]" />
          <span>Fairytale Dream 🌸</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2"
        >
          The Princess in Pink... <span className="text-[#E91E63] inline-block animate-heartbeat">💖</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-5"
        >
          "Jaise kisi kahani ki raani sach mein duniya mein utar aayi ho."
        </motion.p>

        {/* CHAPTER 7 UNIQUE DESIGN: Multi-Faceted Crystal Glass & Golden Trim */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-4 sm:p-5 rounded-[2.5rem] bg-gradient-to-b from-pink-50/90 via-white/95 to-rose-50/70 shadow-2xl border-2 border-pink-300/80 glow-pink w-full max-w-[340px] sm:max-w-[390px] mx-auto"
        >
          {/* Princess Tiara Badge on Frame */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-mono tracking-widest uppercase shadow-md flex items-center gap-1 z-20">
            <span>👑 PRINCESS LOOK</span>
          </div>

          {/* Photo Frame Container */}
          <PhotoInteractiveWrapper photoName="Princess in Pink">
            <div className="relative aspect-[3.8/5] rounded-[2rem] overflow-hidden bg-pink-50 shadow-inner">
              <img
                src="/photos/photo7_royallook.jpg"
                alt="Khushi Singh - Princess in Pink"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-950/75 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white text-center">
                <span className="text-[10px] font-mono tracking-widest text-pink-200 uppercase">Sweet Elegance</span>
                <p className="font-serif-luxury text-xl font-bold">My Golden Princess</p>
              </div>
            </div>
          </PhotoInteractiveWrapper>
        </motion.div>

        {/* Floating Scroll Indicator Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={scrollToNext}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 border border-pink-300 text-xs sm:text-sm font-serif-luxury font-medium text-[#C2185B] shadow-sm hover:shadow-md hover:border-pink-400 transition-all cursor-pointer max-w-[92vw]"
        >
          <span>Aage dekho princess... 🌸</span>
          <ChevronDown className="w-4 h-4 text-[#E91E63] animate-bounce" />
        </motion.button>

        {/* Bottom Thought Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-pink-50/80 to-rose-50/60 border border-pink-200/80 w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875] leading-relaxed">
            "Pink color aap par itna khilta hai ki har tasveer ek yaadgar ban jaati hai. <span className="font-semibold text-[#E91E63]">Pure royalty! 💖🌸</span>"
          </p>
        </motion.div>

      </div>
    </section>
  );
};
