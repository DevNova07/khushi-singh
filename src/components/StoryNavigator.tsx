import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, List, X, Sparkles, Heart, Lock } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { STORY_STEPS } from '../types';

interface StoryNavigatorProps {
  unlockedLevel: number;
}

export const StoryNavigator: React.FC<StoryNavigatorProps> = ({ unlockedLevel = 1 }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.4;
      for (let i = STORY_STEPS.length - 1; i >= 0; i--) {
        const el = document.getElementById(STORY_STEPS[i].id);
        if (el && el.offsetTop <= scrollY) {
          setCurrentStepIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToStep = (index: number) => {
    if (index >= 0 && index < STORY_STEPS.length) {
      const targetStep = STORY_STEPS[index];
      // Only allow navigating to unlocked chapters
      if (targetStep.step <= unlockedLevel) {
        const el = document.getElementById(targetStep.id);
        if (el) {
          romanticAudio.playPop();
          el.scrollIntoView({ behavior: 'smooth' });
          setCurrentStepIndex(index);
          setIsDrawerOpen(false);
        }
      } else {
        // If chapter is locked, scroll to the unlock card of current highest unlocked chapter
        romanticAudio.playPop();
        const currentTargetId = `unlock-card-${unlockedLevel - 1}`;
        const unlockEl = document.getElementById(currentTargetId) || document.getElementById(STORY_STEPS[unlockedLevel - 1].id);
        if (unlockEl) {
          unlockEl.scrollIntoView({ behavior: 'smooth' });
        }
        setIsDrawerOpen(false);
      }
    }
  };

  const currentStep = STORY_STEPS[currentStepIndex] || STORY_STEPS[0];
  const isLast = currentStepIndex === STORY_STEPS.length - 1;
  const progressPercent = Math.min(100, Math.round((unlockedLevel / 10) * 100));

  return (
    <>
      {/* Top Floating Progress Bar */}
      <div className="fixed top-2.5 inset-x-0 z-30 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3 px-4 py-1.5 rounded-full glass-pill border border-[#F8D4DF] shadow-sm text-xs font-mono text-[#8A6875]">
          <Heart className="w-3.5 h-3.5 fill-[#E91E63] text-[#E91E63]" />
          <span>Surprises Unlocked: <strong className="text-[#E91E63]">{unlockedLevel}/10</strong> ({progressPercent}%)</span>
        </div>
      </div>

      {/* Floating Bottom Navigator Bar */}
      <aside aria-label="Story Chapter Navigation" className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3 px-3.5 py-2.5 rounded-full glass-panel-deep shadow-2xl border-2 border-[#F8D4DF] glow-pink max-w-xl w-full justify-between">
          
          {/* Previous Button */}
          <button
            onClick={() => goToStep(currentStepIndex - 1)}
            disabled={currentStepIndex === 0}
            className={`p-2 rounded-full transition-all cursor-pointer ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed text-gray-400'
                : 'hover:bg-pink-100 text-[#C2185B] active:scale-95'
            }`}
            title="Previous Surprise"
            aria-label="Previous Chapter"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Current Step Status & Drawer Toggle */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2 px-3 py-1 rounded-full hover:bg-pink-50 transition-colors text-left flex-1 min-w-0 cursor-pointer"
            title="Click to view all 10 chapters"
          >
            <span className="text-base sm:text-lg">{currentStep.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#E91E63]">
                  Chapter 0{currentStep.step}
                </span>
                <span className="text-[10px] font-mono text-[#8A6875] hidden sm:inline">• View All</span>
              </div>
              <p className="text-xs sm:text-sm font-serif-luxury font-bold text-[#291820] truncate">
                {currentStep.title}
              </p>
            </div>
            <List className="w-4 h-4 text-[#8A6875] flex-shrink-0" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => {
              if (isLast) {
                goToStep(0);
              } else if (currentStepIndex + 1 < unlockedLevel) {
                goToStep(currentStepIndex + 1);
              } else {
                // If next is locked, take them to the unlock card
                goToStep(currentStepIndex + 1);
              }
            }}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-white text-xs sm:text-sm font-medium glass-button cursor-pointer flex-shrink-0 shadow-md active:scale-95 transition-transform"
          >
            <span className="hidden xs:inline">{isLast ? 'Replay' : currentStepIndex + 1 >= unlockedLevel ? 'Unlock Next 🔒' : 'Next Surprise'}</span>
            <span className="xs:hidden">{isLast ? 'Top' : 'Next'}</span>
            {isLast ? <Heart className="w-3.5 h-3.5 fill-white" /> : <ChevronRight className="w-4 h-4" />}
          </button>

        </div>
      </aside>

      {/* Full "All Surprises" Navigation Drawer / Modal */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg max-h-[85vh] overflow-hidden rounded-t-3xl sm:rounded-3xl glass-panel-deep shadow-2xl border-2 border-[#F8D4DF] flex flex-col bg-white"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-pink-100 bg-[#FFF9FB]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D6A85F]" />
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#291820]">
                      Birthday Surprises Journey
                    </h3>
                    <p className="text-xs text-[#8A6875]">Unlocked: {unlockedLevel} of 10 Chapters</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-pink-100 text-[#8A6875] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Steps List */}
              <div className="overflow-y-auto p-4 space-y-2 divide-y divide-pink-50">
                {STORY_STEPS.map((step, idx) => {
                  const isActive = idx === currentStepIndex;
                  const isUnlocked = step.step <= unlockedLevel;

                  return (
                    <button
                      key={step.id}
                      onClick={() => goToStep(idx)}
                      className={`w-full flex items-center gap-4 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#FCE7EF] border-2 border-[#E91E63] shadow-sm'
                          : isUnlocked
                          ? 'hover:bg-pink-50/70 border border-transparent'
                          : 'opacity-60 bg-gray-50/70 border border-dashed border-gray-200'
                      }`}
                    >
                      <span className="text-2xl flex-shrink-0 w-8 text-center">{step.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono uppercase font-bold ${isActive ? 'text-[#E91E63]' : 'text-[#8A6875]'}`}>
                            Step 0{step.step}
                          </span>
                          {isActive && (
                            <span className="text-[10px] bg-[#E91E63] text-white px-2 py-0.2 rounded-full font-mono">
                              CURRENT
                            </span>
                          )}
                          {!isUnlocked && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-[#8A6875] bg-gray-200/80 px-2 py-0.2 rounded-full font-mono">
                              <Lock className="w-2.5 h-2.5" /> LOCKED
                            </span>
                          )}
                        </div>
                        <p className="font-serif-luxury font-bold text-base text-[#291820] truncate">
                          {step.title}
                        </p>
                        <p className="text-xs text-[#8A6875] truncate">{step.subtitle}</p>
                      </div>
                      {isUnlocked ? (
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#E91E63]' : 'text-gray-300'}`} />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-pink-100 bg-[#FFF9FB] text-center">
                <p className="text-xs font-serif-luxury text-[#8A6875]">
                  Specially created with love for Khushi Singh ❤️
                </p>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
