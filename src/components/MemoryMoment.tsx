import React from 'react';
import { motion } from 'framer-motion';

export const MemoryMoment: React.FC = () => {
  return (
    <section id="chapter-05" className="relative w-full pt-0 pb-4 px-3 sm:px-4">
      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2 mt-2"
        >
          "A moment... Another memory"
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-4"
        >
          "Har ek outing, har ek hansi, aur woh saari baatein jo humne saath ki thi… sab dil mein qaid hain."
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
              src="/photos/photo5_balcony.jpg"
              alt="Khushi Singh - Memory"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <span className="text-xs font-mono tracking-widest text-[#FCE7EF] uppercase">Cherished Day</span>
              <p className="font-serif-luxury text-xl font-bold">A Beautiful Memory</p>
            </div>
          </div>
        </motion.div>

        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-5 rounded-2xl glass-panel border border-[#F8D4DF] w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875]">
            "Mere paas jitna bhi samay hai, usmein se jo samay aapke saath guzara hai, woh mere liye sabse achha tha."
          </p>
        </motion.div>

      </div>
    </section>
  );
};
