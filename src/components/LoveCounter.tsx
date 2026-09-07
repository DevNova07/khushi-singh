import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Sparkles, Calendar, MessageCircleHeart } from 'lucide-react';

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const LoveCounter: React.FC = () => {
  const [elapsed, setElapsed] = useState<TimeElapsed>({ days: 365, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Dynamic countdown/up timer calculating moments of togetherness
    const calculateTime = () => {
      // Base moment: a symbolic baseline of love (e.g. 1 year + ongoing)
      const startDate = new Date('2024-01-01T00:00:00');
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const milestones = [
    {
      icon: MessageCircleHeart,
      title: "Pehli Baatein",
      desc: "Jab pehli baar baat shuru hui, aur laga ki kuch to bohot alag aur special hai...",
      color: "from-pink-500 to-rose-400",
    },
    {
      icon: Heart,
      title: "Pehla Ehsaas",
      desc: "Jab realize hua ki aapki ek smile se mera poora din ban jata hai...",
      color: "from-rose-500 to-red-400",
    },
    {
      icon: Calendar,
      title: "Aaj Ka Din: Khushi's Birthday",
      desc: "Aapka 2026 Birthday — Meri poori duniya ki sabse special ladki ka jashn!",
      color: "from-amber-500 to-rose-400",
    },
    {
      icon: Sparkles,
      title: "Hamesha Ka Wada",
      desc: "Zindagi ka har aage aane wala lamha, har ek saal, sirf aapke sath.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-5 sm:p-7 rounded-[2rem] bg-gradient-to-b from-white/95 via-[#FFF4F7]/80 to-white/95 border-2 border-pink-200/70 shadow-xl text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-300/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-amber-200/25 rounded-full blur-2xl pointer-events-none" />

      {/* Header Tag */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-[#E91E63] font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
        <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
        <span>Moments of Us • Ticking Forever</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#291820] mb-1">
        Khushi, Har Ek Pal Jo Aapke Sath Gujra...
      </h3>
      <p className="text-xs sm:text-sm font-serif-luxury text-[#8A6875] italic mb-6">
        "Dil kehta hai kaash ye waqt yahin thehar jaye."
      </p>

      {/* Live Counter Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-col items-center">
          <span className="font-mono text-xl sm:text-3xl font-bold text-[#E91E63]">{elapsed.days}</span>
          <span className="text-[10px] sm:text-xs font-serif-luxury text-[#8A6875] uppercase tracking-wider">Din</span>
        </div>
        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-col items-center">
          <span className="font-mono text-xl sm:text-3xl font-bold text-[#C2185B]">{elapsed.hours}</span>
          <span className="text-[10px] sm:text-xs font-serif-luxury text-[#8A6875] uppercase tracking-wider">Ghante</span>
        </div>
        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-col items-center">
          <span className="font-mono text-xl sm:text-3xl font-bold text-[#E91E63]">{elapsed.minutes}</span>
          <span className="text-[10px] sm:text-xs font-serif-luxury text-[#8A6875] uppercase tracking-wider">Minat</span>
        </div>
        <div className="p-2.5 sm:p-3.5 rounded-2xl bg-white border border-pink-100 shadow-sm flex flex-col items-center">
          <span className="font-mono text-xl sm:text-3xl font-bold text-[#D6A85F]">{elapsed.seconds}</span>
          <span className="text-[10px] sm:text-xs font-serif-luxury text-[#8A6875] uppercase tracking-wider">Second</span>
        </div>
      </div>

      {/* 4 Milestones Timeline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        {milestones.map((m, idx) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-3.5 rounded-2xl bg-white/90 border border-pink-100 hover:border-pink-300 shadow-xs transition-all hover:shadow-md flex items-start gap-3"
            >
              <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${m.color} flex items-center justify-center text-white flex-shrink-0 shadow-xs mt-0.5`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-serif-luxury font-bold text-xs sm:text-sm text-[#291820]">{m.title}</h4>
                <p className="font-serif-luxury text-[11px] sm:text-xs text-[#8A6875] leading-relaxed mt-0.5">{m.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
