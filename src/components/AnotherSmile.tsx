import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const AnotherSmile: React.FC = () => {
  const scrollToNext = () => {
    const questionCard = document.getElementById('question-section');
    if (questionCard) {
      questionCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <section id="chapter-06" className="relative w-full pt-0 pb-4 px-3 sm:px-4">
      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2 mt-2"
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

        {/* Single Large Cinematic Photo Frame with Royal Soft Float-Up */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Floating Scroll Indicator Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToNext}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 border border-pink-200/80 text-xs sm:text-sm font-serif-luxury font-medium text-[#C2185B] shadow-sm hover:shadow-md hover:border-pink-300 transition-all cursor-pointer"
        >
          <span>Aage padho... 💌</span>
          <ChevronDown className="w-4 h-4 text-[#E91E63] animate-bounce" />
        </motion.button>

        {/* Thought Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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
