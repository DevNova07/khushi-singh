import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, X } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { triggerSparkleConfetti } from '../utils/confetti';

interface LetterSceneProps {
  onHeartFound?: (id: number) => void;
  foundHearts?: number[];
  onNext?: () => void;
}

export const LetterScene: React.FC<LetterSceneProps> = ({ onHeartFound, foundHearts = [], onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const secretHeartId = 4;
  const isHeartFound = foundHearts.includes(secretHeartId);

  const handleOpenLetter = () => {
    setIsOpen(true);
    romanticAudio.playCelebrationChime();
    triggerSparkleConfetti();
  };

  const letterParagraphs = [
    {
      type: "heading",
      content: "Happy Birthday meri jaan ❤️🎂✨"
    },
    {
      type: "body",
      content: "Jab maine aapko first time dekha tha na, tabhi ek alag si feeling hui thi… ❤️ Pata nahi kyun, lekin dil ko aapke liye kuch alag hi mehsoos hua tha."
    },
    {
      type: "body",
      content: "Aur phir dheere-dheere aapki had se zyada care, aapka khoob saara pyaar aur aapka mere liye har chhoti-chhoti cheez ka khayal rakhna… sab yaad hai mujhe. 🥹❤️"
    },
    {
      type: "body",
      content: "Mere paas jitna bhi samay hai, usmein se jo samay aapke saath guzara hai, woh mere liye bahut achha tha. ❤️"
    },
    {
      type: "body",
      content: "Aur main hamesha ruk kar, dil se ye sochunga ki aapne mujhe itni khushiyan di, mujhe mere man ke according itna pyaar diya aur itni care ki… iske liye main khud ko bahut lucky maanta hoon. 🥹❤️"
    },
    {
      type: "highlight",
      content: "Aap sirf meri girlfriend nahi ho, aap meri happiness, meri peace aur meri favourite person ho."
    },
    {
      type: "body",
      content: "Aapke saath bitaya hua har ek pal mere liye bahut special hai, aur main un sab yaadon ko hamesha apne dil mein sambhal kar rakhunga. ❤️"
    },
    {
      type: "body",
      content: "Thank you meri life mein aane ke liye, mujhe itna pyaar, care aur khushiyan dene ke liye. Thanks a lot meri jaan. ❤️🥹"
    },
    {
      type: "body",
      content: "Meri bas yahi dua hai ki aap hamesha khush raho, aapki smile hamesha aisi hi rahe, aapke saare dreams poore hon aur aapko zindagi mein woh sab mile jo aap deserve karti ho. ✨❤️"
    },
    {
      type: "conclusion",
      content: "Happy Birthday meri princess 👑🎂❤️"
    },
    {
      type: "signoff",
      content: "I love you so much… aaj, kal aur hamesha. ❤️♾️"
    }
  ];

  return (
    <section id="chapter-09" className="relative w-full pt-1 sm:pt-3 pb-8 px-2 sm:px-4 lg:px-6 overflow-hidden">
      
      {/* Background Soft Floating Orbs */}
      <div className="absolute w-[450px] h-[450px] bg-[#F8D4DF]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full mx-auto text-center z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 sm:mb-8"
        >
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#291820] mt-2">
            A Letter for Khushi
          </h2>
          <p className="text-base sm:text-lg font-serif-luxury italic text-[#8A6875] mt-2">
            "Khushi, you have one letter waiting for you. 💌"
          </p>
        </motion.div>

        {/* 3D Envelope Presentation */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            {/* Guidance Prompt */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-xs font-mono uppercase tracking-widest text-[#E91E63] mb-4 animate-bounce">
              <span>👇 TAP ENVELOPE OR BUTTON TO OPEN</span>
            </div>

            {/* The 3D Envelope Container */}
            <div className="relative group cursor-pointer" onClick={handleOpenLetter}>
              {/* Envelope Body */}
              <div className="w-72 sm:w-96 h-48 sm:h-64 rounded-3xl bg-gradient-to-br from-white via-[#FFF5F8] to-[#FCE7EF] border-2 border-[#F8D4DF] shadow-2xl flex items-center justify-center relative overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:shadow-pink-400/20">
                
                {/* Envelope Flap Triangles */}
                <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-white to-[#F8D4DF]/60 border-b border-pink-200/80 [clip-path:polygon(0_0,100%_0,50%_100%)] group-hover:scale-y-95 transition-transform duration-500 origin-top" />
                
                {/* Wax Seal Center Button */}
                <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#E91E63] to-[#C2185B] flex items-center justify-center text-white shadow-xl glow-pink transform group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 fill-white animate-heartbeat" />
                </div>

                {/* Secret Easter Egg Heart #4 on envelope stamp */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isHeartFound && onHeartFound) {
                      romanticAudio.playSparkle();
                      onHeartFound(secretHeartId);
                    }
                  }}
                  title="Secret Heart"
                  aria-label="Secret Heart 4"
                  className={`absolute top-4 right-4 p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all z-20 ${
                    isHeartFound
                      ? 'bg-[#E91E63] text-white border-pink-400'
                      : 'bg-white/80 border-pink-200 text-[#8A6875] hover:bg-pink-100 hover:scale-110'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isHeartFound ? 'fill-white' : 'text-[#E91E63]'}`} />
                </button>

                <div className="absolute bottom-4 inset-x-0 text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-[#8A6875]">Confidential • For Khushi's Eyes Only</p>
                </div>
              </div>
            </div>

            {/* Open Button */}
            <button
              onClick={handleOpenLetter}
              className="cute-romantic-btn group relative mt-8 inline-flex items-center justify-center flex-nowrap gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white font-sans font-bold text-base sm:text-lg cursor-pointer overflow-hidden shadow-2xl active:scale-95 transition-transform"
            >
              <Sparkles className="w-5 h-5 text-[#FFE57F] flex-shrink-0 animate-pulse drop-shadow" />
              <span className="whitespace-nowrap tracking-wide drop-shadow-sm">OPEN MY LETTER</span>
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 backdrop-blur-xs">
                <Mail className="w-4 h-4 text-white" />
              </span>
            </button>
          </motion.div>
        )}

        {/* Revealed Full Letter Modal / Paper */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative text-left max-w-2xl mx-auto rounded-3xl bg-[#FFFFFF] border border-[#F8D4DF] shadow-2xl p-6 sm:p-10 md:p-12 z-30"
              style={{
                backgroundImage: 'radial-gradient(#F8D4DF 0.65px, transparent 0.65px)',
                backgroundSize: '16px 16px'
              }}
            >
              {/* Close / Fold Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-pink-50 hover:bg-pink-100 text-[#8A6875] hover:text-[#291820] transition-colors cursor-pointer"
                aria-label="Fold Letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative Header Stamp */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-pink-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D6A85F]" />
                  <span className="font-serif-luxury text-sm tracking-widest uppercase text-[#8A6875]">With All My Love</span>
                </div>
                <span className="font-script text-2xl text-[#E91E63]">Forever Yours</span>
              </div>

              {/* Letter Content Sections */}
              <div className="space-y-6 text-[#291820] font-serif-luxury leading-relaxed">
                {letterParagraphs.map((para, i) => {
                  if (para.type === "heading") {
                    return (
                      <motion.h3
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl sm:text-3xl font-bold text-[#E91E63] tracking-tight pb-2"
                      >
                        {para.content}
                      </motion.h3>
                    );
                  }

                  if (para.type === "highlight") {
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="p-4 rounded-2xl bg-[#FFF5F8] border-l-4 border-[#E91E63] text-lg sm:text-xl font-medium text-[#C2185B]"
                      >
                        "{para.content}"
                      </motion.div>
                    );
                  }

                  if (para.type === "conclusion") {
                    return (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="text-xl sm:text-2xl font-bold text-[#291820] pt-4"
                      >
                        {para.content}
                      </motion.p>
                    );
                  }

                  if (para.type === "signoff") {
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        className="pt-6 border-t border-pink-100 flex flex-col items-end"
                      >
                        <p className="text-xl sm:text-2xl font-bold text-[#E91E63] font-serif-luxury">
                          {para.content}
                        </p>
                        <p className="font-script text-3xl text-[#8A6875] mt-1">
                          Always & Forever ❤️
                        </p>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.07 }}
                      className="text-base sm:text-lg text-[#291820]/90 whitespace-pre-line"
                    >
                      {para.content}
                    </motion.p>
                  );
                })}
              </div>

              {/* Next Step Button after reading letter */}
              <div className="pt-8 border-t border-pink-100 mt-8 text-center">
                <button
                  onClick={() => {
                    if (onNext) onNext();
                  }}
                  className="cute-romantic-btn group relative inline-flex items-center justify-center flex-nowrap gap-2 sm:gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white font-sans font-bold text-sm sm:text-base cursor-pointer overflow-hidden shadow-2xl active:scale-95 transition-transform"
                >
                  <Sparkles className="w-4 h-4 text-[#FFE57F] flex-shrink-0 animate-pulse drop-shadow" />
                  <span className="whitespace-nowrap tracking-wide drop-shadow-sm">Next Surprise: Cut the Birthday Cake!</span>
                  <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 text-sm">
                    🎂
                  </span>
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
