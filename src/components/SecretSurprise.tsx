import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Gift } from 'lucide-react';
import { triggerCelebrationConfetti } from '../utils/confetti';
import { romanticAudio } from '../audio/romanticSynth';

interface SecretSurpriseProps {
  foundHearts: number[];
  showModal: boolean;
  onCloseModal: () => void;
}

export const SecretSurprise: React.FC<SecretSurpriseProps> = ({
  foundHearts,
  showModal,
  onCloseModal
}) => {
  return (
    <>
      {/* Floating Mini Counter Pill on bottom-left */}
      <div className="fixed bottom-6 left-6 z-40">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill border border-[#F8D4DF] shadow-md text-xs text-[#8A6875]">
          <Heart className={`w-3.5 h-3.5 ${foundHearts.length > 0 ? 'fill-[#E91E63] text-[#E91E63]' : 'text-gray-400'}`} />
          <span className="font-mono font-medium text-[#291820]">{foundHearts.length}/5</span>
          <span className="hidden sm:inline text-[11px]">Secret Hearts</span>
        </div>
      </div>

      {/* Secret Popup Modal when all 5 hearts are collected */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-md w-full p-8 rounded-3xl glass-panel-deep shadow-2xl border-2 border-[#E91E63] text-center glow-pink"
            >
              <button
                onClick={onCloseModal}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#8A6875] transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-[#E91E63] to-[#D6A85F] flex items-center justify-center text-white shadow-lg">
                <Gift className="w-8 h-8" />
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E91E63] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#D6A85F]" />
                <span>Special Easter Egg</span>
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#291820] mb-3">
                You found the secret! 🎁
              </h3>

              <div className="space-y-3 font-serif-luxury text-base sm:text-lg text-[#291820]/90 leading-relaxed italic bg-pink-50/60 p-4 rounded-2xl border border-pink-100">
                <p>
                  "Okay... you found my little secret."
                </p>
                <p className="font-semibold text-[#E91E63]">
                  "But the biggest secret is that you mean much more to me than these words can explain. ❤️"
                </p>
              </div>

              <button
                onClick={() => {
                  romanticAudio.playCelebrationChime();
                  triggerCelebrationConfetti();
                  onCloseModal();
                }}
                className="cute-romantic-btn group relative mt-6 inline-flex items-center justify-center flex-nowrap gap-2 px-8 py-3.5 rounded-full text-white font-sans font-bold text-base cursor-pointer overflow-hidden shadow-2xl active:scale-95 transition-transform whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#FFE57F] flex-shrink-0 animate-pulse drop-shadow" />
                <span className="whitespace-nowrap tracking-wide drop-shadow-sm">Cherish Forever</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 text-xs">
                  ✨
                </span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
