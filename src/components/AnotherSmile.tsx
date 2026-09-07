import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const AnotherSmile: React.FC = () => {
  return (
    <section id="chapter-06" className="relative w-full pt-0 pb-4 px-3 sm:px-4">
      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border border-[#F8D4DF] text-[11px] font-mono uppercase tracking-widest text-[#D6A85F] mb-2 mt-1"
        >
          <Sparkles className="w-3 h-3 text-[#D6A85F]" />
          <span>Chapter 06 • Another Smile</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2"
        >
          "Another reason to remember you"
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-4"
        >
          "No matter where we are, your calmness and genuine warmth make every second count."
        </motion.p>

        {/* Single Large Cinematic Photo Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-3 sm:p-4 rounded-3xl glass-panel-deep shadow-2xl glow-pink w-full mx-auto"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-pink-50">
            <img
              src="/photos/photo6_memory.jpg"
              alt="Khushi Singh - Another Smile"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <span className="text-xs font-mono tracking-widest text-[#D6A85F] uppercase">Captured in Heart</span>
              <p className="font-serif-luxury text-xl font-bold">Unforgettable Smile</p>
            </div>
          </div>
        </motion.div>

        {/* Thought Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-5 rounded-2xl glass-panel border border-[#F8D4DF] w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875]">
            "Aapke saath bitaya hua har ek pal mere liye bahut special hai."
          </p>
        </motion.div>

      </div>
    </section>
  );
};
