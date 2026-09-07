import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Flame } from 'lucide-react';

export const MemoryMoment: React.FC = () => {
  const scrollToNext = () => {
    const questionCard = document.getElementById('question-section');
    if (questionCard) {
      questionCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="chapter-05" className="relative w-full pt-2 pb-6 px-3 sm:px-4">
      {/* Modern Chic Purple/Rose Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-84 h-84 bg-gradient-to-tr from-purple-100/40 via-rose-100/35 to-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Editorial Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-900 text-white text-[11px] font-mono uppercase tracking-widest mb-2 shadow-sm"
        >
          <Flame className="w-3.5 h-3.5 text-rose-400" />
          <span>Vibrant & Free Spirit 🔥</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2"
        >
          Effortlessly Stunning... <span className="text-[#E91E63] inline-block">✨</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-5"
        >
          "Har look mein alag hi style, har photo mein alag hi charm."
        </motion.p>

        {/* CHAPTER 5 UNIQUE DESIGN: High-Fashion Editorial Double-Layer Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-3.5 sm:p-4 rounded-2xl bg-white shadow-2xl border border-slate-200 w-full max-w-[340px] sm:max-w-[390px] mx-auto"
        >
          {/* Editorial Floating Badge */}
          <div className="absolute -top-3 -right-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-[10px] font-mono font-bold tracking-widest uppercase shadow-md rotate-[3deg] z-20">
            CHIC VIBES
          </div>

          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
            <img
              src="/photos/photo5_balcony.jpg"
              alt="Khushi Singh - Vibrant & Free Spirit"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <span className="text-[10px] font-mono tracking-widest text-rose-300 uppercase">Urban Moments</span>
              <p className="font-serif-luxury text-xl font-bold">Unstoppable Confidence</p>
            </div>
          </div>
        </motion.div>

        {/* Floating Scroll Indicator Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={scrollToNext}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-sans font-medium shadow-md hover:bg-slate-800 transition-all cursor-pointer max-w-[92vw]"
        >
          <span>Aage dekho... ✨</span>
          <ChevronDown className="w-4 h-4 text-rose-400 animate-bounce" />
        </motion.button>

        {/* Bottom Thought Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/95 border border-slate-200 w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875] leading-relaxed">
            "Aapka confidence aur aapka bindaas andaaz… sach mein har kisi ko inspire karta hai."
          </p>
        </motion.div>

      </div>
    </section>
  );
};

