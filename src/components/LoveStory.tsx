import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const LoveStory: React.FC = () => {
  return (
    <section id="chapter-04" className="relative w-full pt-0 pb-4 px-3 sm:px-4">
      <div className="max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border border-[#F8D4DF] text-[11px] font-mono uppercase tracking-widest text-[#E91E63] mb-2 mt-1"
        >
          <Heart className="w-3 h-3 fill-[#E91E63]" />
          <span>Chapter 04 • The Beginning</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2"
        >
          "Jab maine aapko dekha..." <span className="text-[#E91E63] inline-block animate-heartbeat">❤️</span>
        </motion.h2>

        {/* Romantic Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic max-w-md mb-4"
        >
          "Jab maine aapko first time dekha tha na, tabhi ek alag si feeling hui thi... dil ko aapke liye pehli baar mein hi kuch bohot khaas mehsoos hua tha."
        </motion.p>

        {/* Single Large Cinematic Photo Frame (Identical to ThatSmile) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative group p-3 sm:p-4 rounded-3xl glass-panel-deep shadow-2xl glow-pink w-full mx-auto"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-pink-50">
            <img
              src="/photos/photo4_firstlook.jpg"
              alt="Khushi Singh - First Look"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              <span className="text-xs font-mono tracking-widest text-[#FCE7EF] uppercase">First Look</span>
              <p className="font-serif-luxury text-xl font-bold">Unforgettable First Memory</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Thought Card (Matching width and style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-5 rounded-2xl glass-panel border border-[#F8D4DF] w-full text-center shadow-xs"
        >
          <p className="text-xs sm:text-sm font-serif-luxury text-[#291820] leading-relaxed">
            "Aur phir dheere-dheere aapki care, aapka pyaar aur aapka mere liye har chhoti-chhoti cheez ka khayal rakhna… <span className="font-semibold text-[#E91E63]">sab dil mein hamesha ke liye qaid hai. 🥹❤️</span>"
          </p>
        </motion.div>

      </div>
    </section>
  );
};
