import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Crown, Flower2, Flame, Moon, Mail, PartyPopper } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';
import { triggerCelebrationConfetti } from '../utils/confetti';

interface QuestionCardProps {
  nextChapterNumber: number;
  prompt?: string;
  question: string;
  subtitle?: string;
  buttonText: string;
  onAnswer: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  nextChapterNumber,
  prompt = "Aage badhne se pehle ek chhota sa sawaal... 👀❤️",
  question,
  subtitle,
  buttonText,
  onAnswer
}) => {
  const [noAttempts, setNoAttempts] = useState(0);
  const [portalPos, setPortalPos] = useState<{ x: number; y: number } | null>(null);
  const [noRotation, setNoRotation] = useState(0);
  const [puffs, setPuffs] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);

  const yesButtonRef = useRef<HTMLButtonElement | null>(null);
  const initialNoBtnRef = useRef<HTMLButtonElement | null>(null);

  // Pure funny phrases with absolutely NO numbers
  const playfulPhrases = [
    "Nahi dekhna 🙈",
    "Pakad ke dikhao! 😜",
    "Haha itni aasani se nahi! 😂",
    "Miss ho gaya na! 😝",
    "Main navbar ke paas aa gaya! 🚀",
    "Speed badhao thodi! 🏃‍♂️💨",
    "Main ekdum neeche chala gaya! 👇😜",
    "Koshish achhi thi par fail! 😜",
    "Ab main center me hoon! 🎯😂",
    "Haath nahi aane wala! 🏃‍♀️💨",
    "Thak toh nahi gayi? 🥱",
    "Main hawa ka jhonka hoon! 🍃😂",
    "Main fir se upar bhaag gaya! 🚀💨",
    "Maan jao na meri Khushi! 🥹❤️",
    "Finger ki exercise chal rahi! 🏋️‍♀️",
    "Arre re... fir se miss! 🤭",
    "Neeche dhoondo mujhe! 👇👀",
    "Main pro dodger ban gaya! 😎",
    "Gussa mat karo please! 🥺👉👈",
    "Almost... pakad liya tha! 😱",
    "Achha baba maan gaye! 🏳️😭❤️ (Ab Click Karlo!)"
  ];

  const getBadgeForZone = (zone: 'top' | 'bottom' | 'center', attempt: number) => {
    if (attempt >= 20) return "🏳️ Haar maan li!";
    if (zone === 'top') {
      const topBadges = ["🚀 Navbar ke paas!", "☁️ Ekdum upar!", "🏃‍♂️ Upar bhaago!", "✨ Hawa me!"];
      return topBadges[attempt % topBadges.length];
    }
    if (zone === 'bottom') {
      const bottomBadges = ["👇 Ekdum neeche!", "⚓ Bottom pe hoon!", "😜 Neeche pakdo!", "💨 Zoom down!"];
      return bottomBadges[attempt % bottomBadges.length];
    }
    const centerBadges = ["🎯 Center me aa gaya!", "💫 Beech me hoon!", "🤪 Yahan dhoondo!", "👀 Oye idhar!"];
    return centerBadges[attempt % centerBadges.length];
  };

  const getQuestionTheme = (nextChapterNum: number) => {
    switch (nextChapterNum) {
      case 2: // ThatSmile (Sunset Golden Hour)
        return {
          containerClass: "border-2 border-amber-200/90 bg-gradient-to-b from-white/95 via-amber-50/50 to-orange-50/30",
          glowGradient: "from-amber-400/25 via-rose-300/15 to-amber-400/25",
          badgeClass: "bg-amber-100/90 text-amber-800 border-amber-300/80",
          badgeLabel: "Surprise 02 Ahead",
          BadgeIcon: Sparkles,
          btnGradient: "bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFA07A]",
          btnShadow: "shadow-amber-500/25",
          BtnIcon: Sparkles,
          noBtnClass: "border-amber-200 text-amber-800 hover:text-amber-950 hover:bg-amber-50"
        };
      case 3: // BeautifulSoul (Serene Lake Cyan)
        return {
          containerClass: "border-2 border-teal-200/90 bg-gradient-to-b from-white/95 via-teal-50/40 to-cyan-50/30",
          glowGradient: "from-teal-400/20 via-cyan-400/15 to-teal-400/20",
          badgeClass: "bg-teal-100/90 text-teal-800 border-teal-300/80",
          badgeLabel: "Surprise 03 Ahead",
          BadgeIcon: Sparkles,
          btnGradient: "bg-gradient-to-r from-[#00B4D8] via-[#0096C7] to-[#E91E63]",
          btnShadow: "shadow-teal-500/25",
          BtnIcon: Heart,
          noBtnClass: "border-teal-200 text-teal-800 hover:text-teal-950 hover:bg-teal-50"
        };
      case 4: // LoveStory (Botanical First Look)
        return {
          containerClass: "border-2 border-emerald-200/90 rounded-[2.8rem] bg-gradient-to-b from-white/95 via-emerald-50/40 to-pink-50/30",
          glowGradient: "from-emerald-400/20 via-pink-400/15 to-emerald-400/20",
          badgeClass: "bg-emerald-100/90 text-emerald-800 border-emerald-300/80",
          badgeLabel: "Surprise 04 Ahead",
          BadgeIcon: Flower2,
          btnGradient: "bg-gradient-to-r from-[#059669] via-[#10B981] to-[#E11D48]",
          btnShadow: "shadow-emerald-500/25",
          BtnIcon: Heart,
          noBtnClass: "border-emerald-200 text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50"
        };
      case 5: // MemoryMoment (Urban Chic Balcony)
        return {
          containerClass: "border-2 border-slate-300/90 bg-gradient-to-b from-white/95 via-slate-50/60 to-purple-50/40",
          glowGradient: "from-purple-500/20 via-pink-500/20 to-rose-500/20",
          badgeClass: "bg-slate-900 text-white border-slate-800",
          badgeLabel: "Surprise 05 Ahead",
          BadgeIcon: Flame,
          btnGradient: "bg-gradient-to-r from-[#7C3AED] via-[#C026D3] to-[#DB2777]",
          btnShadow: "shadow-purple-500/25",
          BtnIcon: Flame,
          noBtnClass: "border-slate-300 text-slate-800 hover:text-purple-700 hover:bg-purple-50"
        };
      case 6: // SareeRoyalty (Orange Saree Queen)
        return {
          containerClass: "border-2 border-amber-300/90 bg-gradient-to-b from-amber-50/90 via-white/95 to-orange-50/60",
          glowGradient: "from-amber-500/25 via-yellow-400/20 to-orange-500/25",
          badgeClass: "bg-amber-100 text-amber-900 border-amber-300 font-bold",
          badgeLabel: "👑 Royal Saree Surprise",
          BadgeIcon: Crown,
          btnGradient: "bg-gradient-to-r from-[#D97706] via-[#F59E0B] to-[#DC2626]",
          btnShadow: "shadow-amber-500/30",
          BtnIcon: Crown,
          noBtnClass: "border-amber-300 text-amber-900 hover:text-amber-950 hover:bg-amber-50"
        };
      case 7: // PrincessInPink (Rose Quartz Fairytale)
        return {
          containerClass: "border-2 border-pink-300/90 bg-gradient-to-b from-pink-50/90 via-white/95 to-rose-50/70",
          glowGradient: "from-pink-400/25 via-rose-300/20 to-fuchsia-400/20",
          badgeClass: "bg-pink-100 text-[#E91E63] border-pink-300 font-bold",
          badgeLabel: "🌸 Princess Surprise 07",
          BadgeIcon: Sparkles,
          btnGradient: "bg-gradient-to-r from-[#EC4899] via-[#F43F5E] to-[#BE185D]",
          btnShadow: "shadow-pink-500/30",
          BtnIcon: Heart,
          noBtnClass: "border-pink-200 text-pink-700 hover:text-pink-900 hover:bg-pink-50"
        };
      case 8: // NaturalKhushi (Midnight Starlight)
        return {
          containerClass: "border-2 border-sky-200/90 bg-gradient-to-b from-white/95 via-sky-50/40 to-indigo-50/50",
          glowGradient: "from-indigo-500/25 via-sky-400/20 to-purple-500/20",
          badgeClass: "bg-indigo-950 text-sky-200 border-indigo-900 font-bold",
          badgeLabel: "🌙 Midnight Surprise 08",
          BadgeIcon: Moon,
          btnGradient: "bg-gradient-to-r from-[#0284C7] via-[#4F46E5] to-[#7C3AED]",
          btnShadow: "shadow-indigo-500/30",
          BtnIcon: Sparkles,
          noBtnClass: "border-sky-200 text-sky-900 hover:text-indigo-600 hover:bg-sky-50"
        };
      case 9: // WhatYouMean (Secret Love Confession)
        return {
          containerClass: "border-2 border-rose-300/90 bg-gradient-to-b from-white/95 via-rose-50/60 to-red-50/40",
          glowGradient: "from-rose-500/25 via-red-400/20 to-pink-500/25",
          badgeClass: "bg-rose-100 text-rose-700 border-rose-300 font-bold",
          badgeLabel: "❤️ Secret Surprise 09",
          BadgeIcon: Heart,
          btnGradient: "bg-gradient-to-r from-[#E11D48] via-[#BE123C] to-[#881337]",
          btnShadow: "shadow-rose-500/30",
          BtnIcon: Heart,
          noBtnClass: "border-rose-200 text-rose-700 hover:text-rose-900 hover:bg-rose-50"
        };
      case 11: // LetterScene (Vintage Sealed Love Letter Stationery)
        return {
          containerClass: "border-2 border-[#E2D0BE] bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EA] to-[#FFF8F0]",
          glowGradient: "from-[#D6A85F]/30 via-[#E11D48]/15 to-[#D6A85F]/30",
          badgeClass: "bg-[#FAF0E6] text-[#8B4513] border-[#D2B48C] font-mono font-bold",
          badgeLabel: "💌 Sealed Love Letter Ahead",
          BadgeIcon: Mail,
          btnGradient: "bg-gradient-to-r from-[#B91C1C] via-[#C026D3] to-[#991B1B]",
          btnShadow: "shadow-rose-900/30",
          BtnIcon: Mail,
          noBtnClass: "border-[#E2D0BE] text-[#8B4513] hover:text-[#5C2E0B] hover:bg-[#FAF3EA]"
        };
      case 13: // Grand Finale & Celebration
      default:
        return {
          containerClass: "border-2 border-amber-300/90 bg-gradient-to-b from-amber-50/90 via-white/95 to-yellow-50/60",
          glowGradient: "from-[#D6A85F]/35 via-[#FFE082]/25 to-[#D6A85F]/35",
          badgeClass: "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 border-amber-300 font-bold",
          badgeLabel: "👑 Grand Finale Surprise",
          BadgeIcon: PartyPopper,
          btnGradient: "bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#E11D48]",
          btnShadow: "shadow-amber-500/30",
          BtnIcon: Crown,
          noBtnClass: "border-amber-200 text-amber-900 hover:text-amber-950 hover:bg-amber-50"
        };
    }
  };

  const [currentZone, setCurrentZone] = useState<'top' | 'bottom' | 'center'>('top');

  // Dynamic jumping across Navbar (Top), Bottom, and Center zones with 100% YES button clearance
  const calculateFarAwayPosition = (
    currentX?: number,
    currentY?: number,
    attemptNum: number = noAttempts
  ): { x: number; y: number; zone: 'top' | 'bottom' | 'center' } => {
    if (typeof window === 'undefined') return { x: 30, y: 80, zone: 'top' };

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 640;
    const btnW = isMobile ? 210 : 250;
    const btnH = 46;

    const minX = 16;
    const maxX = Math.max(minX, vw - btnW - 16);

    let yesRect: DOMRect | null = null;
    if (yesButtonRef.current) {
      yesRect = yesButtonRef.current.getBoundingClientRect();
    }

    // Cycle order: Top (near navbar) -> Bottom -> Center -> Top -> Bottom -> Center...
    const zones: ('top' | 'bottom' | 'center')[] = ['top', 'bottom', 'center'];
    const targetZone = zones[attemptNum % zones.length];

    let minY = 72;
    let maxY = 135;

    if (targetZone === 'top') {
      minY = 72; // Below top navbar
      maxY = Math.min(140, Math.max(80, Math.round(vh * 0.18)));
    } else if (targetZone === 'bottom') {
      minY = Math.max(vh - btnH - 110, Math.round(vh * 0.78));
      maxY = Math.max(minY, vh - btnH - 25);
    } else {
      // Center / Mid-screen zone
      minY = Math.max(160, Math.round(vh * 0.35));
      maxY = Math.min(Math.round(vh * 0.65), vh - 160);
      if (minY >= maxY) {
        minY = Math.round(vh * 0.32);
        maxY = Math.round(vh * 0.68);
      }
    }

    let bestX = minX;
    let bestY = minY;
    let found = false;

    for (let i = 0; i < 40; i++) {
      let candidateX = minX + Math.random() * (maxX - minX);
      let candidateY = minY + Math.random() * Math.max(10, maxY - minY);

      // Strict collision avoidance with YES button (30px margin)
      if (yesRect) {
        const cushion = 30;
        const overlapsX = candidateX < yesRect.right + cushion && (candidateX + btnW) > yesRect.left - cushion;
        const overlapsY = candidateY < yesRect.bottom + cushion && (candidateY + btnH) > yesRect.top - cushion;

        if (overlapsX && overlapsY) {
          if (targetZone === 'center') {
            // Push candidate to extreme left or right if possible
            const canLeft = yesRect.left - cushion - btnW >= minX;
            const canRight = yesRect.right + cushion <= maxX;
            if (canLeft && canRight) {
              candidateX = Math.random() > 0.5 ? minX : maxX;
            } else if (canLeft) {
              candidateX = minX;
            } else if (canRight) {
              candidateX = maxX;
            } else {
              // Adjust Y above or below YES button
              if (yesRect.top - cushion - btnH > 150) {
                candidateY = yesRect.top - cushion - btnH;
              } else {
                candidateY = yesRect.bottom + cushion;
              }
            }
          } else {
            continue;
          }
        }
      }

      // Leap far from previous position
      if (currentX !== undefined && currentY !== undefined) {
        const dist = Math.hypot(candidateX - currentX, candidateY - currentY);
        if (dist < 100 && i < 30) continue;
      }

      bestX = candidateX;
      bestY = candidateY;
      found = true;
      break;
    }

    if (!found) {
      if (targetZone === 'top') {
        bestY = 78;
        bestX = minX + Math.random() * (maxX - minX);
      } else if (targetZone === 'bottom') {
        bestY = vh - btnH - 30;
        bestX = minX + Math.random() * (maxX - minX);
      } else {
        // Safe placement for center
        if (yesRect && yesRect.top - btnH - 35 > 150) {
          bestY = yesRect.top - btnH - 35;
        } else if (yesRect) {
          bestY = Math.min(vh - btnH - 30, yesRect.bottom + 35);
        } else {
          bestY = Math.round(vh * 0.5 - btnH / 2);
        }
        bestX = Math.random() > 0.5 ? minX : maxX;
      }
    }

    return {
      x: Math.round(Math.max(minX, Math.min(maxX, bestX))),
      y: Math.round(Math.max(20, Math.min(vh - btnH - 20, bestY))),
      zone: targetZone
    };
  };

  const evadeNoButton = (e?: React.SyntheticEvent) => {
    // Before 20 attempts, strictly refuse click and leap away!
    if (noAttempts >= 20) {
      return;
    }

    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    romanticAudio.playBoing(noAttempts);

    // Get current position for smoke puff
    let oldX = portalPos?.x;
    let oldY = portalPos?.y;

    if (oldX === undefined || oldY === undefined) {
      const rect = initialNoBtnRef.current?.getBoundingClientRect();
      oldX = rect ? rect.left : 50;
      oldY = rect ? rect.top : 200;
    }

    // Spawn funny smoke puff
    const puffEmojis = ['💨', '✨', '🏃‍♂️', '🤪', '👻', '⚡'];
    const newPuff = {
      id: Date.now() + Math.random(),
      x: oldX,
      y: oldY,
      emoji: puffEmojis[Math.floor(Math.random() * puffEmojis.length)]
    };
    setPuffs((prev) => [...prev.slice(-3), newPuff]);
    setTimeout(() => {
      setPuffs((prev) => prev.filter((p) => p.id !== newPuff.id));
    }, 850);

    const nextAttempt = noAttempts + 1;
    const newPos = calculateFarAwayPosition(oldX, oldY, noAttempts);
    setPortalPos({ x: newPos.x, y: newPos.y });
    setCurrentZone(newPos.zone);
    setNoRotation((Math.random() - 0.5) * 28);
    setNoAttempts(nextAttempt);
  };

  const handleNoClick = (e: React.MouseEvent) => {
    // Strictly impossible to click before 20 attempts
    if (noAttempts < 20) {
      evadeNoButton(e);
      return;
    }

    // On 20th attempt, finally surrender and celebrate!
    e.preventDefault();
    romanticAudio.playCelebrationChime();
    triggerCelebrationConfetti();
    onAnswer();
  };

  const handleYesClick = () => {
    romanticAudio.playCelebrationChime();
    triggerCelebrationConfetti();
    onAnswer();
  };

  const theme = getQuestionTheme(nextChapterNumber);
  const BadgeIcon = theme.BadgeIcon;
  const BtnIcon = theme.BtnIcon;

  // Clean button text cleanly of emojis so text stays pure and crisp
  const cleanedText = buttonText.replace(/[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{27BF}]|[❤️✨💕🌸👑💌👂👀🎉🕯️🎂]/gu, '').trim();

  return (
    <div id="question-section" className="w-full pt-6 sm:pt-8 pb-12 sm:pb-16 px-3 sm:px-4 flex justify-center scroll-mt-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative max-w-md sm:max-w-lg w-full p-6 sm:p-8 rounded-[2.5rem] text-center shadow-2xl ${theme.containerClass}`}
      >
        {/* Soft Background Radial Glow Tailored to Theme */}
        <div className={`absolute -inset-2 bg-gradient-to-r ${theme.glowGradient} rounded-[2.5rem] blur-xl -z-10 animate-pulse pointer-events-none`} />

        {/* Unique Themed Eyebrow Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider font-bold mb-3 shadow-xs border ${theme.badgeClass}`}>
          <BadgeIcon className="w-3.5 h-3.5 animate-bounce" />
          <span>{theme.badgeLabel}</span>
        </div>

        {/* Prompt line */}
        {prompt && (
          <p className="text-xs sm:text-sm font-serif-luxury text-[#8A6875] italic mb-1.5">
            "{prompt}"
          </p>
        )}

        {/* Main Question */}
        <h3 className="text-xl sm:text-2xl md:text-3xl font-serif-luxury font-bold text-[#291820] tracking-tight mb-2 leading-snug">
          {question}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#8A6875] font-light max-w-sm mx-auto mb-6 leading-relaxed">
            {subtitle}
          </p>
        )}

        {/* Two Options: Option 1 (YES) + Option 2 (Playful Untouchable Runaway Nakhre Button) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
          
          {/* Option 1: Main Themed Romantic Yes Button */}
          <motion.button
            ref={yesButtonRef}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleYesClick}
            className={`group relative inline-flex items-center justify-center flex-nowrap gap-2 sm:gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-white font-sans font-bold text-sm sm:text-base cursor-pointer overflow-hidden shadow-2xl w-full sm:w-auto z-10 ${theme.btnGradient} ${theme.btnShadow}`}
          >
            {/* Ambient Shimmer Sweep */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

            {/* Left Sparkle */}
            <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FFE57F] flex-shrink-0 animate-pulse drop-shadow" />

            {/* Clean Non-wrapping Text */}
            <span className="whitespace-nowrap tracking-wide drop-shadow-sm font-sans font-semibold text-white">
              {cleanedText}
            </span>

            {/* Crisp Glass Icon Badge on Right */}
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/25 border border-white/40 shadow-xs flex-shrink-0 backdrop-blur-xs">
              <BtnIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white animate-heartbeat" />
            </span>
          </motion.button>

          {/* Option 2: Initial position inside card before user tries to touch */}
          {noAttempts === 0 ? (
            <motion.button
              ref={initialNoBtnRef}
              whileHover={{ scale: 1.02 }}
              onPointerEnter={evadeNoButton}
              onMouseEnter={evadeNoButton}
              onTouchStart={evadeNoButton}
              onPointerDown={evadeNoButton}
              onClick={handleNoClick}
              className={`relative inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full bg-white/95 border-2 text-xs sm:text-sm font-sans font-bold shadow-md hover:shadow-lg transition-colors cursor-pointer select-none whitespace-nowrap z-20 ${theme.noBtnClass}`}
            >
              <span>{playfulPhrases[0]}</span>
            </motion.button>
          ) : (
            /* Playful placeholder inside card after the button escapes */
            <div className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-dashed border-pink-300/80 bg-pink-50/40 text-[11px] text-[#8A6875] font-mono select-none animate-pulse">
              <span>💨 Arre! Button screen pe bhaag gaya!</span>
            </div>
          )}
        </div>

        {/* Sweet Helper Text */}
        <p className="text-[11px] text-[#8A6875]/70 font-mono mt-3.5 tracking-wider uppercase">
          Tap to reveal surprise ✨
        </p>
      </motion.div>

      {/* PORTAL: Floating Runaway Button & Cartoon Smoke Puffs (Guaranteed 220px+ away from YES button) */}
      {typeof document !== 'undefined' && portalPos && noAttempts > 0 && createPortal(
        <>
          {/* Cartoon Puffs left behind at previous positions */}
          {puffs.map((puff) => (
            <motion.div
              key={puff.id}
              initial={{ opacity: 1, scale: 0.8, y: 0 }}
              animate={{ opacity: 0, scale: 1.8, y: -25 }}
              transition={{ duration: 0.7 }}
              style={{
                position: 'fixed',
                left: puff.x + 35,
                top: puff.y,
                zIndex: 99998,
                pointerEvents: 'none'
              }}
              className="text-2xl drop-shadow select-none"
            >
              {puff.emoji}
            </motion.div>
          ))}

          {/* Untouchable Runaway Button jumping strictly near navbar */}
          <motion.div
            style={{
              position: 'fixed',
              left: portalPos.x,
              top: portalPos.y,
              zIndex: 99999
            }}
            animate={{
              rotate: noAttempts >= 20 ? 0 : noRotation,
              scale: noAttempts >= 20 ? [1, 1.08, 1] : [0.85, 1.12, 1]
            }}
            transition={
              noAttempts >= 20
                ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                : { type: "spring", stiffness: 480, damping: 20 }
            }
            className="relative"
          >
            {/* Cartoon Speech Bubble / Teasing Badge Above Button */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#FF4081] to-[#E91E63] text-white text-[10px] font-bold tracking-wider uppercase shadow-md whitespace-nowrap animate-bounce flex items-center gap-1 pointer-events-none">
              <span>{getBadgeForZone(currentZone, noAttempts)}</span>
            </div>

            <button
              onPointerEnter={noAttempts < 20 ? evadeNoButton : undefined}
              onMouseEnter={noAttempts < 20 ? evadeNoButton : undefined}
              onMouseMove={noAttempts < 20 ? evadeNoButton : undefined}
              onTouchStart={noAttempts < 20 ? evadeNoButton : undefined}
              onPointerDown={noAttempts < 20 ? evadeNoButton : undefined}
              onClick={handleNoClick}
              className={`relative inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-full text-xs sm:text-sm font-sans font-bold shadow-2xl transition-all cursor-pointer select-none whitespace-nowrap will-change-transform ${
                noAttempts >= 20
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white border-2 border-white shadow-2xl glow-pink ring-4 ring-pink-300/60"
                  : "bg-white/95 hover:bg-pink-50 border-2 border-pink-300 text-[#8A6875] hover:text-[#E91E63] ring-2 ring-pink-200/50"
              }`}
            >
              <span>{playfulPhrases[Math.min(noAttempts, playfulPhrases.length - 1)]}</span>
            </button>
          </motion.div>
        </>,
        document.body
      )}
    </div>
  );
};
