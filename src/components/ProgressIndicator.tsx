import React, { useEffect, useState } from 'react';

const chapters = [
  { id: 'chapter-01', label: '01', name: 'Hero' },
  { id: 'chapter-02', label: '02', name: 'Smile' },
  { id: 'chapter-03', label: '03', name: 'Story' },
  { id: 'chapter-04', label: '04', name: 'Memories' },
  { id: 'chapter-05', label: '05', name: 'Quote' },
  { id: 'chapter-06', label: '06', name: 'Surprise' },
  { id: 'chapter-07', label: '07', name: 'Love' },
  { id: 'chapter-08', label: '08', name: 'Letter' },
  { id: 'chapter-09', label: '09', name: 'Cake' },
  { id: 'chapter-10', label: '10', name: 'Forever' },
];

export const ProgressIndicator: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState('chapter-01');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveChapter(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Story Progress"
      className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 py-4 px-2 rounded-full glass-pill border border-[#F8D4DF] shadow-md"
    >
      {chapters.map((ch) => {
        const isActive = activeChapter === ch.id;
        return (
          <button
            key={ch.id}
            onClick={() => scrollToChapter(ch.id)}
            title={ch.name}
            className="group relative flex items-center justify-center p-1.5 cursor-pointer focus:outline-none"
          >
            <span
              className={`text-[11px] font-mono transition-all duration-300 ${
                isActive
                  ? 'text-[#E91E63] font-bold scale-125'
                  : 'text-[#8A6875]/70 group-hover:text-[#291820]'
              }`}
            >
              {ch.label}
            </span>

            {/* Hover Tooltip */}
            <span className="absolute left-full ml-3 px-2 py-0.5 rounded-md bg-white/95 border border-pink-200 text-[11px] font-serif-luxury text-[#291820] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
              {ch.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
