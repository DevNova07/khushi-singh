import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, List, X, Sparkles, Lock, Check } from 'lucide-react';
import { STORY_STEPS } from '../types';
import { romanticAudio } from '../audio/romanticSynth';

interface ChapterHeaderProps {
  activeChapter: number;
  unlockedLevel: number;
  onSelectChapter: (chapter: number) => void;
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({
  activeChapter,
  unlockedLevel,
  onSelectChapter,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentStep = STORY_STEPS[activeChapter - 1] || STORY_STEPS[0];

  const handleSelect = (chapNum: number) => {
    if (chapNum <= unlockedLevel) {
      romanticAudio.playPop();
      onSelectChapter(chapNum);
      setIsDrawerOpen(false);
    }
  };

  return (
    <>
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 w-full px-4 py-3 glass-panel border-b border-pink-200/60 shadow-sm backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          
          {/* Back Button */}
          <div className="w-24 flex items-center">
            {activeChapter > 1 ? (
              <button
                onClick={() => handleSelect(activeChapter - 1)}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-[#C2185B] hover:text-[#E91E63] py-1 px-2.5 rounded-full hover:bg-pink-100/60 transition-colors cursor-pointer"
                title="Go to previous chapter"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>
            ) : (
              <span className="text-xs text-[#8A6875]/60 font-mono pl-2">Start</span>
            )}
          </div>

          {/* Center Chapter Title Button (Opens Menu) */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 hover:bg-pink-50 border border-pink-200/80 shadow-sm transition-all cursor-pointer max-w-[260px] sm:max-w-md truncate"
            title="Click to view all chapters"
          >
            <span className="text-base">{currentStep.icon}</span>
            <div className="text-left truncate">
              <span className="text-[10px] font-mono uppercase font-bold text-[#E91E63] block leading-none">
                Chapter 0{currentStep.step} / 10
              </span>
              <span className="text-xs sm:text-sm font-serif-luxury font-bold text-[#291820] truncate block">
                {currentStep.title}
              </span>
            </div>
            <List className="w-4 h-4 text-[#8A6875] flex-shrink-0 ml-1" />
          </button>

          {/* Right Status */}
          <div className="w-24 flex justify-end items-center">
            <span className="text-xs font-mono font-medium text-[#E91E63] bg-pink-100/80 px-2.5 py-1 rounded-full border border-pink-200">
              {activeChapter}/10
            </span>
          </div>

        </div>
      </header>

      {/* Chapter Selection Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md max-h-[80vh] rounded-3xl glass-panel-deep shadow-2xl border-2 border-[#F8D4DF] flex flex-col bg-white overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-pink-100 bg-[#FFF9FB]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D6A85F]" />
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#291820]">
                      Choose a Chapter
                    </h3>
                    <p className="text-xs text-[#8A6875]">Unlocked: {unlockedLevel} of 10 Chapters</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-full hover:bg-pink-100 text-[#8A6875] transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chapter Items */}
              <div className="overflow-y-auto p-4 space-y-2">
                {STORY_STEPS.map((step) => {
                  const isActive = step.step === activeChapter;
                  const isUnlocked = step.step <= unlockedLevel;

                  return (
                    <button
                      key={step.id}
                      onClick={() => handleSelect(step.step)}
                      disabled={!isUnlocked}
                      className={`w-full flex items-center gap-3.5 p-3 rounded-2xl text-left transition-all ${
                        isActive
                          ? 'bg-[#FCE7EF] border-2 border-[#E91E63] shadow-sm'
                          : isUnlocked
                          ? 'hover:bg-pink-50/80 border border-pink-100 cursor-pointer'
                          : 'opacity-50 bg-gray-50 border border-dashed border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0">{step.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-mono uppercase font-bold ${isActive ? 'text-[#E91E63]' : 'text-[#8A6875]'}`}>
                            Chapter 0{step.step}
                          </span>
                          {isActive && (
                            <span className="text-[10px] bg-[#E91E63] text-white px-2 py-0.2 rounded-full font-mono">
                              CURRENT
                            </span>
                          )}
                        </div>
                        <p className="font-serif-luxury font-bold text-base text-[#291820] truncate">
                          {step.title}
                        </p>
                      </div>

                      {isActive ? (
                        <Check className="w-4 h-4 text-[#E91E63]" />
                      ) : isUnlocked ? (
                        <span className="text-xs text-[#E91E63] font-mono">OPEN</span>
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-3 border-t border-pink-100 bg-[#FFF9FB] text-center text-xs font-serif-luxury text-[#8A6875]">
                For Khushi Singh ❤️
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Step Dots */}
      <nav aria-label="Chapter progress steps" className="fixed bottom-3 inset-x-0 z-30 flex justify-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-pill border border-pink-200/80 shadow-md">
          {STORY_STEPS.map((step) => {
            const isActive = step.step === activeChapter;
            const isUnlocked = step.step <= unlockedLevel;

            return (
              <button
                key={step.id}
                onClick={() => handleSelect(step.step)}
                disabled={!isUnlocked}
                title={step.title}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'w-6 bg-[#E91E63] glow-pink'
                    : isUnlocked
                    ? 'w-2 bg-[#F8D4DF] hover:bg-[#E91E63]/60'
                    : 'w-1.5 bg-gray-300 opacity-60'
                }`}
              />
            );
          })}
        </div>
      </nav>
    </>
  );
};
