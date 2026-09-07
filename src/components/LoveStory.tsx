import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export const LoveStory: React.FC = () => {
  const scrollToNext = () => {
    const questionCard = document.getElementById('question-section');
    if (questionCard) {
      questionCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="chapter-04" className="relative w-full pt-2 pb-6 px-3 sm:px-4">
      {/* Soft Botanical Spring Ambient Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-84 h-84 bg-gradient-to-tr from-emerald-100/35 via-rose-100/40 to-amber-100/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Botanical Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[11px] font-mono uppercase tracking-widest mb-2 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Innocence & Nature 🌿</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2"
        >
          "Pehli Nazar Ka Ehsaas..." <span className="text-[#E91E63] inline-block animate-heartbeat">❤️</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-5"
        >
          "Jab maine aapko pehli baar dekha tha, tabhi laga tha jaise ye chehra hamesha ke liye dil mein bas gaya hai."
        </motion.p>

        {/* CHAPTER 4 UNIQUE DESIGN: Organic Curved Botanical Frame with Emerald Accents */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-4 sm:p-5 rounded-[2.5rem] bg-gradient-to-b from-white/95 to-emerald-50/40 shadow-2xl border-2 border-emerald-200/70 w-full max-w-[340px] sm:max-w-[390px] mx-auto"
        >
          {/* Subtle Floating Corner Leaves */}
          <span className="absolute top-3 left-4 text-emerald-500/70 text-xs">🌿</span>
          <span className="absolute top-3 right-4 text-emerald-500/70 text-xs">✨</span>

          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-emerald-50 shadow-inner">
            <img
              src="/photos/photo4_firstlook.jpg"
              alt="Khushi Singh - Glow of Innocence"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <span className="text-[10px] font-mono tracking-widest text-emerald-200 uppercase">First Look Memory</span>
              <p className="font-serif-luxury text-xl font-bold">Simplicity & Grace</p>
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
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 border border-emerald-200 text-xs sm:text-sm font-serif-luxury font-medium text-emerald-900 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer max-w-[92vw]"
        >
          <span>Aage padho... 🌿</span>
          <ChevronDown className="w-4 h-4 text-emerald-600 animate-bounce" />
        </motion.button>

        {/* Bottom Thought Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/90 border border-emerald-200/60 w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury text-[#291820] leading-relaxed">
            "Aapki saadgi hi aapki sabse badi khoobsurati hai... <span className="font-semibold text-emerald-700">bina kisi filter ke, ekdum pyaari! 🌸❤️</span>"
          </p>
        </motion.div>

      </div>
    </section>
  );
};

