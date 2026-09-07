import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export const BigQuote: React.FC = () => {
  return (
    <section id="chapter-05" className="relative w-full pt-1 sm:pt-3 pb-6 px-2 sm:px-4 lg:px-6 overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-[#E91E63]/15 to-[#D6A85F]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center z-10 space-y-6 sm:space-y-8">
        
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-[#F8D4DF] text-xs uppercase tracking-widest text-[#8A6875]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D6A85F]" />
          <span>From the bottom of my heart</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D6A85F]" />
        </motion.div>

        {/* Word-by-Word Emotional Accent */}
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl font-serif-luxury italic text-[#8A6875]"
          >
            "You are my..."
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-4xl sm:text-6xl md:text-7xl font-serif-luxury font-bold">
            
            {/* Happiness (Soft Glow) */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="px-4 py-1 rounded-2xl bg-white/70 shadow-sm text-[#E91E63] glow-pink tracking-tight"
            >
              Happiness.
            </motion.span>

            {/* Peace (Soft Glow) */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="px-4 py-1 rounded-2xl bg-white/70 shadow-sm text-[#C2185B] glow-pink tracking-tight"
            >
              Peace.
            </motion.span>

            {/* Favourite Person (Strongest Golden Pink Glow) */}
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="relative px-6 py-2 rounded-2xl bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white shadow-xl glow-text-gold tracking-tight"
            >
              Favourite Person.
              <span className="absolute -top-2 -right-2 text-xl">✨</span>
            </motion.span>

          </div>
        </div>

        {/* Full Hindi Emotional Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.3 }}
          className="max-w-2xl mx-auto p-8 rounded-3xl glass-panel-deep border border-[#F8D4DF] shadow-xl"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-serif-luxury font-medium text-[#291820] leading-relaxed italic">
            "Aap sirf meri girlfriend nahi ho, <br />
            aap meri <span className="text-[#E91E63]">happiness</span>, meri <span className="text-[#C2185B]">peace</span> aur meri <span className="text-[#E91E63] font-bold">favourite person</span> ho."
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-[#E91E63]">
            <Heart className="w-5 h-5 fill-current animate-heartbeat" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
