import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const PhotoStory: React.FC = () => {
  return (
    <section id="chapter-02" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#FFF9FB] via-[#FCE7EF]/30 to-[#FFF9FB]">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-24"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#E91E63]">Chapter 02 • Visual Story</span>
          <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-[#291820] mt-2 tracking-tight">
            Every Glance, A Masterpiece
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#E91E63] to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Editorial Storytelling Layout (Asymmetrical Overlapping Composition) */}
        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* PHOTO 2: Large Cinematic Focus with "That smile... ❤️" */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 relative group"
          >
            <div className="relative rounded-3xl overflow-hidden glass-panel-deep p-3 sm:p-4 shadow-2xl">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden bg-[#FCE7EF]">
                <img
                  src="/photos/photo2_smile.jpg"
                  alt="Khushi - That smile"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  loading="lazy"
                />
                
                {/* Gradient Scrim & Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-mono tracking-wider mb-2 text-[#FCE7EF]">
                      <Sparkles className="w-3 h-3 text-[#D6A85F]" />
                      <span>THE RADIANCE</span>
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-serif-luxury font-bold tracking-tight">
                      That smile... <span className="text-[#FF80AB] inline-block">❤️</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FCE7EF]/90 font-light mt-1.5 max-w-sm leading-relaxed">
                      The kind that lights up everything around you, making every ordinary moment unforgettable.
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* PHOTO 3: Overlapping Floating Card with "That beautiful soul... ✨" */}
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 md:-ml-12 lg:-ml-16 z-20"
          >
            <div className="relative rounded-3xl overflow-hidden glass-panel-deep p-3 sm:p-4 shadow-2xl group border-2 border-white/80">
              {/* Subtle Gold Accent Rim */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D6A85F]/30 to-transparent pointer-events-none rounded-tr-3xl" />

              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#FCE7EF]">
                <img
                  src="/photos/photo3_lake.jpg"
                  alt="Khushi - That beautiful soul"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                  loading="lazy"
                />

                {/* Floating Bottom Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                  <span className="text-[11px] tracking-widest text-[#D6A85F] uppercase font-mono font-medium">Serenity & Grace</span>
                  <h3 className="text-xl sm:text-3xl font-serif-luxury font-bold mt-1">
                    That beautiful soul... <span className="text-[#D6A85F]">✨</span>
                  </h3>
                  <p className="text-xs text-[#FCE7EF]/80 font-light mt-1 leading-relaxed">
                    Peaceful, pure, and deeply special in every way.
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative Ambient Quote Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-6 p-4 rounded-2xl glass-panel border border-[#F8D4DF] text-center"
            >
              <p className="text-xs sm:text-sm font-serif-luxury italic text-[#8A6875]">
                "Kuch log bas muskura dete hain aur duniya thodi aur khoobsurat lagne lagti hai."
              </p>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
