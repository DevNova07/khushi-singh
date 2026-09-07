import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower2, Sparkles, Crown, Smile } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';

interface LoveCardData {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  shortDesc: string;
  fullDesc: string;
}

const cardsData: LoveCardData[] = [
  {
    id: 1,
    title: "Your Smile ❤️",
    icon: Smile,
    accentColor: "#E91E63",
    shortDesc: "It lights up my darkest days.",
    fullDesc: "Aapki smile dekh kar mera poora mood achha ho jaata hai. It has this quiet, genuine warmth that makes everything around you feel calm and beautiful."
  },
  {
    id: 2,
    title: "Your Care 🌸",
    icon: Flower2,
    accentColor: "#EC407A",
    shortDesc: "The pure way you watch over me.",
    fullDesc: "Chhoti-chhoti baaton ka dhyaan rakhna, mere time aur meri khushiyon ki care karna… the tenderness with which you love is truly rare."
  },
  {
    id: 3,
    title: "Your Heart 🥹",
    icon: Heart,
    accentColor: "#C2185B",
    shortDesc: "Gentle, compassionate, and true.",
    fullDesc: "A heart that loves without pretenses. Your kindness and empathy are what make you so deeply special to me every single day."
  },
  {
    id: 4,
    title: "Your Presence ✨",
    icon: Sparkles,
    accentColor: "#D6A85F",
    shortDesc: "My true place of peace.",
    fullDesc: "Jab aap paas hoti ho, toh lagta hai sab theek hai. Your presence brings an instant sense of peace that nothing else can replace."
  },
  {
    id: 5,
    title: "Your Personality 👑",
    icon: Crown,
    accentColor: "#AD1457",
    shortDesc: "Graceful, confident, and regal.",
    fullDesc: "The way you carry yourself with simplicity and grace—an authentic queen who inspires me and makes me proud to stand beside you."
  }
];

export const LoveCards: React.FC = () => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const handleCardToggle = (id: number) => {
    romanticAudio.playPop();
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="chapter-08" className="relative w-full pt-1 sm:pt-3 pb-6 px-2 sm:px-4 lg:px-6 overflow-hidden bg-[#FFF9FB]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#E91E63]">Chapter 08 • Deep Reflections</span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#291820] mt-1.5">
            Things I Love About You
          </h2>
          <p className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic mt-1.5">
            Tap or hover over each card to discover why you are so special.
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E91E63] to-transparent mx-auto mt-3" />
        </motion.div>

        {/* Layout: Photo 7 featured alongside the 5 Interactive 3D Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* PHOTO 7: Ambient Editorial Photo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group p-3 sm:p-4 rounded-3xl glass-panel-deep shadow-2xl glow-pink max-w-md sm:max-w-lg w-full mx-auto">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-pink-50">
                <img
                  src="/photos/photo7_care.jpg"
                  alt="Khushi - Endless Reasons"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D6A85F]">Special Moments</span>
                  <h4 className="font-serif-luxury text-xl font-bold">Endless Reasons to Cherish You</h4>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 5 Interactive Cards Grid */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-pink-100/70 text-xs font-mono uppercase tracking-widest text-[#E91E63] justify-center animate-pulse">
              <span>👇 TAP ANY CARD TO OPEN & DISCOVER</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {cardsData.map((card, idx) => {
              const Icon = card.icon;
              const isExpanded = activeCardId === card.id;

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => handleCardToggle(card.id)}
                  className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-300 ${
                    idx === 4 ? 'sm:col-span-2' : ''
                  } ${
                    isExpanded
                      ? 'glass-panel-deep border-[#E91E63] shadow-xl glow-pink'
                      : 'glass-panel hover:border-pink-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-2xl flex-shrink-0 text-white shadow-md"
                      style={{ backgroundColor: card.accentColor }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif-luxury text-xl font-bold text-[#291820] flex items-center justify-between">
                        <span>{card.title}</span>
                        <span className="text-xs font-mono text-[#8A6875] bg-pink-50 px-2 py-0.5 rounded-full">
                          {isExpanded ? 'TAP TO CLOSE ▲' : 'TAP TO READ ▼'}
                        </span>
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8A6875] font-light mt-1">
                        {card.shortDesc}
                      </p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-sm font-serif-luxury text-[#291820] leading-relaxed mt-3 pt-3 border-t border-pink-100"
                          >
                            {card.fullDesc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
