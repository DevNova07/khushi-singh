import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import { OpeningScene } from './components/OpeningScene';
import { HeroBirthday } from './components/HeroBirthday';
import { ThatSmile } from './components/ThatSmile';
import { BeautifulSoul } from './components/BeautifulSoul';
import { LoveStory } from './components/LoveStory';
import { MemoryMoment } from './components/MemoryMoment';
import { AnotherSmile } from './components/AnotherSmile';
import { WhatYouMean } from './components/WhatYouMean';
import { LoveCards } from './components/LoveCards';
import { LetterScene } from './components/LetterScene';
import { CakeScene } from './components/CakeScene';
import { FinalReveal } from './components/FinalReveal';
import { FloatingHearts } from './components/FloatingHearts';
import { ParticleSystem } from './components/ParticleSystem';
import { QuestionCard } from './components/QuestionCard';
import { romanticAudio } from './audio/romanticSynth';

export const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const resetScrollToTop = () => {
    window.scrollTo(0, 0);
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  };

  // Ensure romantic music is always playing once opened
  useEffect(() => {
    if (isOpened && !isMuted) {
      romanticAudio.startMusic();
    }
  }, [isOpened, isMuted]);

  // Handle auto-unlock of audio context on any screen interaction
  useEffect(() => {
    const handleFirstTouch = () => {
      if (isOpened && !isMuted && !romanticAudio.isMusicPlaying()) {
        romanticAudio.startMusic();
      }
    };
    window.addEventListener('click', handleFirstTouch, { once: true });
    window.addEventListener('touchstart', handleFirstTouch, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, [isOpened, isMuted]);

  const toggleSound = () => {
    if (isMuted) {
      romanticAudio.startMusic();
      setIsMuted(false);
    } else {
      romanticAudio.pauseMusic();
      setIsMuted(true);
    }
  };

  const goToChapter = (chapterNumber: number) => {
    resetScrollToTop();
    setActiveChapter(chapterNumber);
  };

  // Scroll to absolute top immediately whenever activeChapter changes
  useEffect(() => {
    resetScrollToTop();
    const t1 = setTimeout(resetScrollToTop, 20);
    const t2 = setTimeout(resetScrollToTop, 80);
    const t3 = setTimeout(resetScrollToTop, 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeChapter]);

  return (
    <div className="relative min-h-screen bg-[#FFF9FB] text-[#291820] font-sans antialiased selection:bg-[#F8D4DF] selection:text-[#C2185B]">
      
      {/* Background Ambience Layers */}
      <ParticleSystem />
      <FloatingHearts />

      {/* Opening Scene vs Single Chapter Display */}
      {!isOpened ? (
        <OpeningScene
          onOpen={() => {
            setIsOpened(true);
            romanticAudio.startMusic();
          }}
        />
      ) : (
        <div className="relative z-10 w-full min-h-screen flex flex-col">
          
          {/* Permanent Sticky Top Header (Matches background, always pinned at top) */}
          <header className="sticky top-0 z-40 w-full bg-[#FFF9FB]/95 backdrop-blur-md border-b border-pink-100/70 shadow-xs">
            <div className="max-w-5xl mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between">
              {/* Back Button (Only if past chapter 1) */}
              <div className="w-24 sm:w-28">
                {activeChapter > 1 ? (
                  <button
                    onClick={() => goToChapter(activeChapter - 1)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#C2185B] hover:text-[#E91E63] py-1 px-2.5 sm:py-1.5 sm:px-3 rounded-full bg-pink-100/70 hover:bg-pink-100 transition-colors cursor-pointer active:scale-95"
                    title="Go to previous chapter"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Peeche</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-mono uppercase text-[#8A6875]/70 tracking-widest pl-1">Khushi ❤️</span>
                )}
              </div>

              {/* Chapter Step Badge */}
              <div className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-white/85 border border-pink-200 text-xs font-mono text-[#E91E63] shadow-xs">
                <span>Chapter 0{activeChapter} of 11</span>
              </div>

              {/* Tiny discreet Mute/Unmute toggle (Never overlaps) */}
              <div className="w-24 sm:w-28 flex justify-end">
                <button
                  onClick={toggleSound}
                  className="p-1.5 rounded-full text-[#8A6875] hover:text-[#E91E63] hover:bg-pink-100/50 transition-colors cursor-pointer"
                  title={isMuted ? "Unmute Music" : "Mute Music"}
                  aria-label="Toggle Sound"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#E91E63] animate-pulse" />}
                </button>
              </div>
            </div>
          </header>

          {/* Main Active Chapter Display (Starts immediately below sticky header, flows down) */}
          <main className="flex-1 w-full max-w-5xl mx-auto px-2 sm:px-4 pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeChapter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onAnimationStart={resetScrollToTop}
                onAnimationComplete={resetScrollToTop}
                className="w-full"
              >
                {/* CHAPTER 01: HERO BIRTHDAY (1 Image: Photo 1) */}
                {activeChapter === 1 && (
                  <div className="w-full">
                    <HeroBirthday />
                    <QuestionCard
                      nextChapterNumber={2}
                      prompt="Khushi, aage badhne se pehle ek baat batao... 👀❤️"
                      question="Aap ready ho meri favourite smile dekhne ke liye?"
                      subtitle="Aage aapka ek bohot khoobsurat photo intezaar kar raha hai..."
                      buttonText="Haan, mujhe dekhna hai! ❤️"
                      onAnswer={() => goToChapter(2)}
                    />
                  </div>
                )}

                {/* CHAPTER 02: THAT SMILE (1 Image: Photo 2) */}
                {activeChapter === 2 && (
                  <div className="w-full">
                    <ThatSmile />
                    <QuestionCard
                      nextChapterNumber={3}
                      prompt="Aapki muskaan ke baad ek aur khoobsurat cheez... ✨"
                      question="Aapko pata hai aapka mann aur aatma kitni pyaari hai?"
                      subtitle="A quiet grace that brings peace to everyone..."
                      buttonText="Batao aage! 💕"
                      onAnswer={() => goToChapter(3)}
                    />
                  </div>
                )}

                {/* CHAPTER 03: THAT BEAUTIFUL SOUL (1 Image: Photo 3) */}
                {activeChapter === 3 && (
                  <div className="w-full">
                    <BeautifulSoul />
                    <QuestionCard
                      nextChapterNumber={4}
                      prompt="Dil ki pehli feeling share karna chahta hoon... 🥹"
                      question="Pata hai jab maine aapko pehli baar dekha tab kya hua tha?"
                      subtitle="Ek aisi feeling jo dil ko hamesha yaad rahegi..."
                      buttonText="Batao na kya hua tha? 💕"
                      onAnswer={() => goToChapter(4)}
                    />
                  </div>
                )}

                {/* CHAPTER 04: LOVE STORY / FIRST LOOK (1 Image: Photo 4) */}
                {activeChapter === 4 && (
                  <div className="w-full">
                    <LoveStory />
                    <QuestionCard
                      nextChapterNumber={5}
                      prompt="Kuch lamhe jo dil ke bohot kareeb hain... 📸"
                      question="Chalo humari kuch sabse pyaari yaadein taaza karte hain?"
                      subtitle="Har ek pal jo humne saath guzara hai woh priceless hai..."
                      buttonText="Yaadon ki gali mein chalo ✨"
                      onAnswer={() => goToChapter(5)}
                    />
                  </div>
                )}

                {/* CHAPTER 05: A SPECIAL MOMENT (1 Image: Photo 5) */}
                {activeChapter === 5 && (
                  <div className="w-full">
                    <MemoryMoment />
                    <QuestionCard
                      nextChapterNumber={6}
                      prompt="Ek aur khoobsurat muskaan yaad hai mujhe... 🌸"
                      question="Aapki hansi dekh kar din ban jaata hai, yaad hai?"
                      subtitle="Another reason to remember you..."
                      buttonText="Woh muskaan dikhao! 🌸"
                      onAnswer={() => goToChapter(6)}
                    />
                  </div>
                )}

                {/* CHAPTER 06: ANOTHER SMILE & MEMORY (1 Image: Photo 6) */}
                {activeChapter === 6 && (
                  <div className="w-full">
                    <AnotherSmile />
                    <QuestionCard
                      nextChapterNumber={7}
                      prompt="Ab aati hai sabse emotional baat... ❤️"
                      question="Ek baat dil se bolu aapko?"
                      subtitle="Aap mere liye kya ho aur kya maayine rakhti ho..."
                      buttonText="Bolo, sun rahi hoon 👂"
                      onAnswer={() => goToChapter(7)}
                    />
                  </div>
                )}

                {/* CHAPTER 07: WHAT YOU MEAN & SURPRISE QUESTION (0 Images) */}
                {activeChapter === 7 && (
                  <div className="w-full">
                    <WhatYouMean onContinue={() => goToChapter(8)} />
                  </div>
                )}

                {/* CHAPTER 08: 5 THINGS I LOVE ABOUT YOU (1 Image: Photo 7) */}
                {activeChapter === 8 && (
                  <div className="w-full">
                    <LoveCards />
                    <QuestionCard
                      nextChapterNumber={9}
                      prompt="Aapke liye ek bohot special cheez aayi hai... 💌"
                      question="Aapke liye ek sealed handwritten love letter hai, padhna chahte ho?"
                      subtitle="Isme mere dil ki har ek feeling aur baat likhi hai..."
                      buttonText="Mera Letter Kholo 💌"
                      onAnswer={() => goToChapter(9)}
                    />
                  </div>
                )}

                {/* CHAPTER 09: 3D ENVELOPE & LOVE LETTER (0 Images) */}
                {activeChapter === 9 && (
                  <div className="w-full">
                    <LetterScene onNext={() => goToChapter(10)} />
                  </div>
                )}

                {/* CHAPTER 10: 3D BIRTHDAY CAKE (0 Images) */}
                {activeChapter === 10 && (
                  <div className="w-full">
                    <CakeScene />
                    <QuestionCard
                      nextChapterNumber={11}
                      prompt="Candles blow karne ke baad ek aakhri baat... 👑"
                      question="Ek aakhri aur sabse important promise... jo hamesha ke liye hai."
                      subtitle="For my Princess Khushi... ❤️♾️"
                      buttonText="Final Secret Surprise Dekho 👑"
                      onAnswer={() => goToChapter(11)}
                    />
                  </div>
                )}

                {/* CHAPTER 11: GRAND FINALE & SIGNATURE (1 Image: Photo 8) */}
                {activeChapter === 11 && (
                  <div className="w-full">
                    <FinalReveal onReplay={() => goToChapter(1)} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Subtle Romantic Footer */}
          <footer className="py-8 text-center text-xs font-serif-luxury text-[#8A6875] border-t border-pink-100/60 bg-white/40 mt-auto">
            <p>Made with all my heart for Khushi Singh ❤️</p>
            <p className="font-mono text-[10px] text-[#8A6875]/60 mt-1">A Private Digital Gift • 2026</p>
          </footer>
        </div>
      )}

    </div>
  );
};

export default App;
