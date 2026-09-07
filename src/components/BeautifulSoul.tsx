import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export const BeautifulSoul: React.FC = () => {
  const scrollToNext = () => {
    const questionCard = document.getElementById('question-section');
    if (questionCard) {
      questionCard.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 420, behavior: 'smooth' });
    }
  };

  return (
    <section id="chapter-03" className="relative w-full pt-2 pb-6 px-3 sm:px-4">
      {/* Serene Lake & Pearl Soft Blue Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-88 h-88 bg-gradient-to-tr from-cyan-100/40 via-teal-100/30 to-pink-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Heritage Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-[11px] font-mono uppercase tracking-widest mb-2 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Serenity & Grace 🪷</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2"
        >
          That Beautiful Soul... <span className="text-teal-600 inline-block">🕊️</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-5"
        >
          "Jheel ke shant paani jaisi shanti... jahan bhi aap hoti ho, sukoon apne aap aa jaata hai."
        </motion.p>

        {/* CHAPTER 3 UNIQUE DESIGN: Royal Arch Palace Window Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-3 sm:p-4 rounded-t-[120px] sm:rounded-t-[150px] rounded-b-3xl bg-white/90 shadow-2xl border-2 border-teal-200/70 w-full max-w-[340px] sm:max-w-[390px] mx-auto overflow-hidden"
        >
          {/* Subtle Arch Outline Shimmer */}
          <div className="absolute inset-0 rounded-t-[120px] sm:rounded-t-[150px] rounded-b-3xl bg-gradient-to-b from-teal-100/30 via-transparent to-teal-50/20 pointer-events-none" />

          {/* Photo Container with Arched Top */}
          <div className="relative aspect-[4/5] rounded-t-[110px] sm:rounded-t-[140px] rounded-b-2xl overflow-hidden bg-teal-50 shadow-md">
            <img
              src="/photos/photo3_lake.jpg"
              alt="Khushi Singh - Beautiful Soul by the Lake"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-black/20" />

            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <span className="text-[10px] font-mono tracking-widest text-teal-200 uppercase">Lake Heritage</span>
              <p className="font-serif-luxury text-xl font-bold">Quiet Elegance</p>
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
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 border border-teal-200 text-xs sm:text-sm font-serif-luxury font-medium text-teal-900 shadow-sm hover:shadow-md hover:border-teal-300 transition-all cursor-pointer max-w-[92vw]"
        >
          <span>Aage padho... 🕊️</span>
          <ChevronDown className="w-4 h-4 text-teal-600 animate-bounce" />
        </motion.button>

        {/* Bottom Poetic Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-50/70 via-white/90 to-teal-50/70 border border-teal-200/60 w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875] leading-relaxed">
            "Aapka mann itna saaf aur gehra hai ki aapke paas hona hi dil ko sabse zyada sukoon deta hai."
          </p>
        </motion.div>

      </div>
    </section>
  );
};
