import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Crown } from 'lucide-react';

export const SareeRoyalty: React.FC = () => {
  const scrollToNext = () => {
    const questionCard = document.getElementById('question-section');
    if (questionCard) {
      questionCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="chapter-06" className="relative w-full pt-2 pb-6 px-3 sm:px-4">
      {/* Warm Royal Saffron & Gold Ambient Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-88 h-88 bg-gradient-to-tr from-amber-200/50 via-orange-200/40 to-yellow-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Royal Saree Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100 border border-amber-300/80 text-amber-900 text-[11px] font-mono uppercase tracking-widest mb-2 shadow-xs"
        >
          <Crown className="w-3.5 h-3.5 text-amber-600" />
          <span>Royal Indian Grace 👑</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2"
        >
          Saree Mein Aapki Shaan... <span className="text-amber-500 inline-block">✨</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-5"
        >
          "Ek aisi khoobsurati jiska koi muqabla nahi... ekdum royal aur graceful."
        </motion.p>

        {/* CHAPTER 6 UNIQUE DESIGN: Ornate Royal Jharokha / Indian Palace Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-4 sm:p-5 rounded-[2.5rem] bg-gradient-to-b from-amber-50/90 via-white/95 to-orange-50/70 shadow-2xl border-2 border-amber-300/80 glow-gold w-full max-w-[340px] sm:max-w-[390px] mx-auto"
        >
          {/* Gold Corner Filigree Accents */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-amber-500 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-amber-500 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-amber-500 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-amber-500 rounded-br-lg pointer-events-none" />

          {/* Saree Photo Container */}
          <div className="relative aspect-[3.8/5] rounded-[2rem] overflow-hidden bg-amber-50 shadow-inner">
            <img
              src="/photos/photo6_saree.jpg"
              alt="Khushi Singh in Royal Orange Saree"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/75 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <span className="text-[10px] font-mono tracking-widest text-amber-200 uppercase">Indian Heritage</span>
              <p className="font-serif-luxury text-xl font-bold">Pure Royalty</p>
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
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 border border-amber-300 text-xs sm:text-sm font-serif-luxury font-medium text-amber-900 shadow-sm hover:shadow-md hover:border-amber-400 transition-all cursor-pointer max-w-[92vw]"
        >
          <span>Aage badho rajkumari... 👑</span>
          <ChevronDown className="w-4 h-4 text-amber-600 animate-bounce" />
        </motion.button>

        {/* Bottom Poetic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/60 border border-amber-200/80 w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875] leading-relaxed">
            "Jab aap saree pehanti ho na Khushi... toh waqt bhi do pal thehar ke aapko dekhne lagta hai. <span className="font-semibold text-amber-800">Sach mein meri Queen! 👑🧡</span>"
          </p>
        </motion.div>

      </div>
    </section>
  );
};
