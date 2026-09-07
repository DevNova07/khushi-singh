import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Moon } from 'lucide-react';

export const NaturalKhushi: React.FC = () => {
  const scrollToNext = () => {
    const questionCard = document.getElementById('question-section');
    if (questionCard) {
      questionCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="chapter-08" className="relative w-full pt-2 pb-6 px-3 sm:px-4">
      {/* Midnight Starlight Deep Twilight Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-92 h-92 bg-gradient-to-tr from-indigo-200/40 via-sky-100/40 to-purple-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Starlight Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-950 text-sky-200 text-[11px] font-mono uppercase tracking-widest mb-2 shadow-sm"
        >
          <Moon className="w-3.5 h-3.5 text-sky-300" />
          <span>Pure & Unfiltered 🌙</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2"
        >
          Pure, Natural Khushi... <span className="text-sky-500 inline-block animate-pulse">✨</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-5"
        >
          "Bina kisi filter ke, bina kisi tayyari ke... bas aapki sabse pyari aur sachhi smile."
        </motion.p>

        {/* CHAPTER 8 UNIQUE DESIGN: Midnight Starlight Candid Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-4 sm:p-5 rounded-[2.5rem] bg-gradient-to-b from-white via-sky-50/50 to-indigo-50/60 shadow-2xl border-2 border-sky-200/80 w-full max-w-[340px] sm:max-w-[390px] mx-auto"
        >
          {/* Retro Filmstrip Sprocket Accents */}
          <div className="absolute top-3 left-4 flex gap-1 text-sky-400/80 text-xs">
            <span>✦</span>
            <span>★</span>
          </div>
          <div className="absolute top-3 right-4 flex gap-1 text-sky-400/80 text-xs">
            <span>★</span>
            <span>✦</span>
          </div>

          <div className="relative aspect-[3.8/5] rounded-[2rem] overflow-hidden bg-slate-900 shadow-inner">
            <img
              src="/photos/photo8_purekhushi.jpg"
              alt="Khushi Singh - Candid Night Smile"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <span className="text-[10px] font-mono tracking-widest text-sky-300 uppercase">Late Night Candid</span>
              <p className="font-serif-luxury text-xl font-bold">100% Real & Beautiful</p>
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
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-sky-100 text-xs sm:text-sm font-sans font-medium shadow-md hover:bg-slate-800 transition-all cursor-pointer max-w-[92vw]"
        >
          <span>Aage ek khaas surprise hai... 👀❤️</span>
          <ChevronDown className="w-4 h-4 text-sky-300 animate-bounce" />
        </motion.button>

        {/* Bottom Thought Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/95 border border-sky-200/80 w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875] leading-relaxed">
            "Yeh meri sabse favourite Khushi hai… jahan aap ekdum chill, bina kisi tension ke, bas apne pyaare andaaz mein muskurati ho. <span className="font-semibold text-sky-800">Always be this happy! 🌌💙</span>"
          </p>
        </motion.div>

      </div>
    </section>
  );
};
