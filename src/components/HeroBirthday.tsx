import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';

interface HeroBirthdayProps {
  onHeartFound?: (id: number) => void;
  foundHearts?: number[];
}

export const HeroBirthday: React.FC<HeroBirthdayProps> = ({ onHeartFound, foundHearts = [] }) => {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 12; // tilt degrees
    const y = ((clientY - top) / height - 0.5) * -12;
    setTilt({ rotateX: y, rotateY: x });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const secretHeartId = 2;
  const isHeartFound = foundHearts.includes(secretHeartId);

  return (
    <section
      id="chapter-01"
      className="relative w-full pt-0 pb-4 px-2 sm:px-4 lg:px-6 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        
        {/* Left Column: Romantic Tribute Typography */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-20 space-y-3 sm:space-y-6"
        >
          {/* Princess Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#F8D4DF] text-xs sm:text-sm text-[#C2185B] font-medium tracking-wide">
            <Crown className="w-4 h-4 text-[#D6A85F]" />
            <span>My Princess 👑</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-bold text-[#291820] leading-[1.08] tracking-tight">
            Happy Birthday, <br />
            <span className="bg-gradient-to-r from-[#E91E63] via-[#C2185B] to-[#D6A85F] bg-clip-text text-transparent">
              Khushi
            </span>{' '}
            <span className="inline-block animate-heartbeat text-[#E91E63]">❤️</span>
          </h1>

          {/* Subtitle Message */}
          <div className="relative pl-0 lg:pl-6 border-l-0 lg:border-l-2 border-[#F8D4DF] max-w-xl">
            <p className="text-lg sm:text-xl md:text-2xl text-[#291820]/90 font-serif-luxury leading-relaxed italic">
              "Aaj ka din mere liye bhi special hai... <br className="hidden sm:inline" />
              kyunki aaj ke din meri <span className="font-semibold text-[#E91E63]">favourite person</span> duniya mein aayi thi. ❤️"
            </p>
          </div>

          <p className="text-sm sm:text-base text-[#8A6875] font-sans font-light max-w-lg leading-relaxed">
            Every moment shared with you is a memory I cherish deeply. Welcome to your special birthday story.
          </p>

          {/* Subtle Accent Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#8A6875] glass-pill px-3 py-1 rounded-full border border-pink-100">
              <Sparkles className="w-3.5 h-3.5 text-[#D6A85F]" />
              <span>Celebrating You</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-[#8A6875] glass-pill px-3 py-1 rounded-full border border-pink-100">
              <Heart className="w-3.5 h-3.5 text-[#E91E63]" />
              <span>Forever & Always</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Photo Frame with 3D Depth */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center perspective-1000 z-20"
        >
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="relative group p-3 sm:p-4 rounded-3xl glass-panel-deep glow-pink max-w-md sm:max-w-lg w-full mx-auto"
          >
            {/* Background Ambient Glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#E91E63]/25 to-[#D6A85F]/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Photo 1 Container */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-pink-50">
              <img
                src="/photos/photo1_hero.jpg"
                alt="Khushi Singh - Birthday Girl"
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                loading="eager"
              />

              {/* Glass Frame Bottom Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs tracking-widest text-[#FCE7EF] uppercase font-mono">Hero Chapter 01</p>
                  <p className="font-serif-luxury text-xl font-semibold">Khushi Singh</p>
                </div>
                
                {/* Secret Easter Egg Heart #2 */}
                <button
                  onClick={() => {
                    if (!isHeartFound && onHeartFound) {
                      romanticAudio.playSparkle();
                      onHeartFound(secretHeartId);
                    }
                  }}
                  title="Find hidden hearts"
                  aria-label="Secret Heart 2"
                  className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
                    isHeartFound
                      ? 'bg-[#E91E63] text-white'
                      : 'bg-white/30 hover:bg-white/60 text-white/90 hover:scale-110'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isHeartFound ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>

            {/* Subtle Gold Corner Accents */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-2 border-l-2 border-[#D6A85F] rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-2 border-r-2 border-[#D6A85F] rounded-br-xl pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
