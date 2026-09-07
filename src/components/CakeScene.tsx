import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Heart } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface CakeSceneProps {
  onWishMade?: () => void;
}

export const CakeScene: React.FC<CakeSceneProps> = ({ onWishMade }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [celebrationActive, setCelebrationActive] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    romanticAudio.playPop();

    // Brief darkening and then celebratory radiance
    setTimeout(() => {
      setCelebrationActive(true);
      romanticAudio.playCelebrationChime();
      triggerCelebrationConfetti();
      if (onWishMade) onWishMade();
    }, 450);
  };

  return (
    <section id="chapter-10" className="relative w-full pt-1 sm:pt-3 pb-8 px-2 sm:px-4 lg:px-6 overflow-hidden bg-[#FFF9FB]">
      
      {/* Background Darkening Overlay upon blowing candles */}
      <AnimatePresence>
        {!candlesLit && !celebrationActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#291820] z-20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto text-center z-10 space-y-6 sm:space-y-8">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#E91E63]">Chapter 10 • Birthday Tradition</span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury font-bold text-[#291820] tracking-tight">
            Make a Wish, Khushi 🎂
          </h2>
          
          {candlesLit && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 border border-amber-300 text-xs font-mono uppercase tracking-widest text-[#B45309] animate-bounce shadow-sm">
              <span>💨 TAP ON THE CANDLES TO BLOW THEM OUT!</span>
            </div>
          )}

          {!candlesLit && (
            <p className="text-base sm:text-lg font-serif-luxury italic text-[#8A6875]">
              Your wish is carried to the stars... ✨
            </p>
          )}
        </motion.div>

        {/* 3D Visual Cake Model */}
        <div className="relative flex justify-center py-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative p-8 rounded-full transition-all duration-700 cursor-pointer ${
              celebrationActive ? 'glow-gold' : ''
            }`}
            onClick={handleBlowCandles}
            title={candlesLit ? "Click to blow candles" : "Candles blown"}
          >
            {/* Ambient Glow behind cake */}
            <div
              className={`absolute inset-0 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${
                candlesLit
                  ? 'bg-[#FFD54F]/25 opacity-80'
                  : celebrationActive
                  ? 'bg-gradient-to-tr from-[#E91E63]/35 to-[#D6A85F]/35 opacity-100'
                  : 'opacity-0'
              }`}
            />

            {/* Cake Structure */}
            <div className="relative flex flex-col items-center">
              
              {/* Candles Row */}
              <div className="flex items-end justify-center gap-4 sm:gap-6 mb-1 z-20">
                {[0, 1, 2].map((candleIdx) => (
                  <div key={candleIdx} className="relative flex flex-col items-center">
                    
                    {/* Candle Flame with realistic flicker animation */}
                    <AnimatePresence>
                      {candlesLit && (
                        <motion.div
                          animate={{
                            scale: [1, 1.15, 0.95, 1.1, 1],
                            y: [0, -2, 1, -1, 0],
                            opacity: [0.9, 1, 0.85, 1, 0.9]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.2 + candleIdx * 0.2,
                            ease: 'easeInOut'
                          }}
                          className="w-4 h-6 rounded-full bg-gradient-to-t from-[#FF6F00] via-[#FFD54F] to-[#FFFFFF] shadow-lg shadow-amber-400/80 mb-1"
                        />
                      )}
                      {!candlesLit && (
                        <motion.div
                          initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                          animate={{ opacity: 0, y: -20, scale: 1.5 }}
                          transition={{ duration: 0.8 }}
                          className="w-2 h-2 rounded-full bg-gray-400/60 mb-2"
                        />
                      )}
                    </AnimatePresence>

                    {/* Candle Wick */}
                    <div className="w-0.5 h-2 bg-gray-700" />

                    {/* Candle Pillar */}
                    <div className="w-3 sm:w-3.5 h-10 sm:h-12 rounded-t-sm bg-gradient-to-r from-pink-200 via-white to-pink-300 border border-pink-300/40 shadow-sm" />
                  </div>
                ))}
              </div>

              {/* Cake Top Tier */}
              <div className="relative w-44 sm:w-56 h-20 sm:h-24 rounded-t-3xl bg-gradient-to-b from-[#FFFFFF] via-[#FFF0F5] to-[#FCE7EF] border-2 border-pink-200/80 shadow-md flex items-center justify-center overflow-hidden z-10">
                {/* Frosting Scallops */}
                <div className="absolute top-0 inset-x-0 h-4 bg-[#F8D4DF] rounded-b-full opacity-60" />
                <div className="flex gap-3 text-pink-400">
                  <span>🌸</span>
                  <span>✨</span>
                  <span>🌸</span>
                </div>
              </div>

              {/* Cake Bottom Tier */}
              <div className="relative w-64 sm:w-80 h-24 sm:h-28 rounded-3xl bg-gradient-to-b from-[#FFFFFF] via-[#FFF5F8] to-[#F8D4DF] border-2 border-pink-200 shadow-xl flex items-center justify-center -mt-2">
                {/* Frosting Swirl Line */}
                <div className="absolute inset-x-0 top-3 h-1 bg-white/90 shadow-sm" />
                <p className="font-script text-2xl sm:text-3xl text-[#E91E63]">Khushi</p>
              </div>

              {/* Cake Stand / Plate */}
              <div className="w-72 sm:w-96 h-5 rounded-full bg-gradient-to-r from-[#D6A85F]/50 via-white to-[#D6A85F]/50 border border-[#D6A85F]/60 shadow-lg -mt-1" />
              <div className="w-24 sm:w-32 h-6 bg-gradient-to-b from-white to-gray-200 rounded-b-xl border border-gray-200/80" />

            </div>
          </motion.div>
        </div>

        {/* Post-Blowout Celebration Message */}
        <AnimatePresence>
          {celebrationActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 max-w-xl mx-auto p-6 rounded-3xl glass-panel-deep border border-[#F8D4DF] shadow-2xl glow-pink"
            >
              <div className="inline-flex items-center gap-2 text-[#D6A85F]">
                <Crown className="w-6 h-6" />
                <Heart className="w-6 h-6 fill-[#E91E63] text-[#E91E63] animate-heartbeat" />
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#E91E63] tracking-tight">
                Happy Birthday, Princess 👑❤️
              </h3>
              <p className="text-base sm:text-lg font-serif-luxury text-[#291820] leading-relaxed">
                May your beautiful smile stay as bright as these stars, today, tomorrow, and every day after.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {candlesLit && (
          <p className="text-xs font-mono uppercase tracking-widest text-[#8A6875]">
            (Tap the cake or candles to blow out)
          </p>
        )}

      </div>
    </section>
  );
};
