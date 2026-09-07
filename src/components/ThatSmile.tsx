import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Heart } from 'lucide-react';
import { PhotoInteractiveWrapper } from './PhotoInteractiveWrapper';

export const ThatSmile: React.FC = () => {
  const scrollToNext = () => {
    const questionCard = document.getElementById('question-section');
    if (questionCard) {
      questionCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="chapter-02" className="relative w-full pt-2 pb-6 px-3 sm:px-4">
      {/* Warm Sunset Ambient Backlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-tr from-amber-200/40 via-rose-200/35 to-pink-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Playful Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200/70 text-amber-800 text-[11px] font-mono uppercase tracking-widest mb-2 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Golden Hour Magic</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2"
        >
          That Contagious Smile... <span className="text-amber-500 inline-block animate-bounce">✨</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-5"
        >
          "Ek aisi muskaan jo kisi ka bhi bura din ek pal mein theek kar de."
        </motion.p>

        {/* CHAPTER 2 UNIQUE DESIGN: Luxury Keepsake Polaroid Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-4 sm:p-5 pb-7 sm:pb-8 bg-white/95 rounded-2xl shadow-2xl border border-amber-100/80 glow-gold max-w-[340px] sm:max-w-[400px] w-full mx-auto transition-all"
        >
          {/* Decorative Washi Tape on Top Center */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-gradient-to-r from-amber-200/85 via-rose-200/80 to-amber-200/85 border border-amber-300/50 shadow-xs rotate-[-1.5deg] backdrop-blur-xs rounded-xs z-20 pointer-events-none" />

          {/* Photo Frame Container */}
          <PhotoInteractiveWrapper photoName="Contagious Smile">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-amber-50 shadow-inner">
              <img
                src="/photos/photo2_smile.jpg"
                alt="Khushi Singh - That Radiant Smile"
                className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-1000 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
              
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] text-white font-mono tracking-wider">
                MEMORIES 📸
              </div>
            </div>
          </PhotoInteractiveWrapper>

          {/* Polaroid Bottom Caption */}
          <div className="pt-4 text-center">
            <p className="font-serif-luxury text-lg sm:text-xl font-bold text-[#291820] tracking-wide flex items-center justify-center gap-1.5">
              <span>"Purest smile in the world"</span>
              <Heart className="w-4 h-4 fill-[#E91E63] text-[#E91E63]" />
            </p>
            <p className="font-mono text-[10px] text-[#8A6875] tracking-widest uppercase mt-0.5">
              Evening Lights & Infinite Joy
            </p>
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
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 border border-amber-200 text-xs sm:text-sm font-serif-luxury font-medium text-amber-900 shadow-sm hover:shadow-md hover:border-amber-300 transition-all cursor-pointer max-w-[92vw]"
        >
          <span>Aage ki kahani dekho... ✨</span>
          <ChevronDown className="w-4 h-4 text-amber-600 animate-bounce" />
        </motion.button>

        {/* Bottom Poetic Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-white/90 to-amber-50/70 border border-amber-200/60 w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875] leading-relaxed">
            "Jab aap hasti ho na Khushi, toh sach mein lagta hai duniya ki saari khushiyan ek jagah simat aayi hain."
          </p>
        </motion.div>

      </div>
    </section>
  );
};

