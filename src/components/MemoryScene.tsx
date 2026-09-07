import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Clock } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';

interface MemorySceneProps {
  onHeartFound?: (id: number) => void;
  foundHearts?: number[];
}

export const MemoryScene: React.FC<MemorySceneProps> = ({ onHeartFound, foundHearts = [] }) => {
  const secretHeartId = 3;
  const isHeartFound = foundHearts.includes(secretHeartId);

  return (
    <section id="chapter-04" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FFF9FB] via-[#FCE7EF]/40 to-[#FFF9FB]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#C2185B]">Chapter 04 • Memory Timeline</span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#291820] mt-2">
            Moments Frozen in Love
          </h2>
          <p className="text-sm sm:text-base text-[#8A6875] font-serif-luxury italic mt-2">
            "Har ek pal mere liye bahut special hai..."
          </p>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E91E63] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Timeline Path */}
        <div className="relative space-y-16 sm:space-y-24">
          
          {/* Vertical subtle center line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-[#F8D4DF] via-[#E91E63]/30 to-[#F8D4DF] -translate-x-1/2 pointer-events-none" />

          {/* MEMORY 1: PHOTO 5 ("A moment" & "Another memory") */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 flex justify-center md:justify-end"
            >
              <div className="relative group p-3 sm:p-4 rounded-3xl glass-panel-deep shadow-xl max-w-md w-full">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-pink-50 relative">
                  <img
                    src="/photos/photo5_balcony.jpg"
                    alt="Memory - A Moment"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-mono tracking-widest text-[#D6A85F] uppercase">Memories We Share</span>
                    <p className="font-serif-luxury text-xl font-bold">Unforgettable Day</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 space-y-4 md:pl-8 text-center md:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-[#E91E63]">
                <Clock className="w-3.5 h-3.5" />
                <span>A MOMENT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#291820]">
                "Another memory..."
              </h3>
              <p className="text-base sm:text-lg font-serif-luxury text-[#8A6875] leading-relaxed max-w-md">
                Looking back at every outing, every laughter, and every little conversation that made my heart feel at home.
              </p>
            </motion.div>

          </div>

          {/* MEMORY 2: PHOTO 6 ("Another smile" & "Another reason to remember you") */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 order-2 md:order-1 space-y-4 md:pr-8 text-center md:text-right"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-pill text-xs font-mono text-[#D6A85F]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ANOTHER SMILE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#291820]">
                "Another reason to remember you"
              </h3>
              <p className="text-base sm:text-lg font-serif-luxury text-[#8A6875] leading-relaxed max-w-md md:ml-auto">
                No matter where we are, your calmness and genuine warmth make every second count.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-6 order-1 md:order-2 flex justify-center md:justify-start"
            >
              <div className="relative group p-3 sm:p-4 rounded-3xl glass-panel-deep shadow-xl max-w-md w-full">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-pink-50 relative">
                  <img
                    src="/photos/photo6_memory.jpg"
                    alt="Memory - Another Smile"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Secret Easter Egg Heart #3 */}
                  <div className="absolute top-4 right-4 z-20">
                    <button
                      onClick={() => {
                        if (!isHeartFound && onHeartFound) {
                          romanticAudio.playSparkle();
                          onHeartFound(secretHeartId);
                        }
                      }}
                      title="Find hidden hearts"
                      aria-label="Secret Heart 3"
                      className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
                        isHeartFound ? 'bg-[#E91E63] text-white' : 'bg-black/30 hover:bg-black/50 text-white/80'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isHeartFound ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs font-mono tracking-widest text-[#FCE7EF] uppercase">Captured In Time</span>
                    <p className="font-serif-luxury text-xl font-bold">Pure Grace</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};
