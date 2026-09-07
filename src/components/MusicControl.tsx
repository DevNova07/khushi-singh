import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { romanticAudio } from '../audio/romanticSynth';

export const MusicControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check initial state
    setIsPlaying(romanticAudio.isMusicPlaying());
  }, []);

  const handleToggle = () => {
    const newState = romanticAudio.toggleMusic();
    setIsPlaying(newState);
  };

  return (
    <div className="fixed top-6 right-6 z-40">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? "Pause Romantic Music" : "Play Romantic Music"}
        className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill border transition-all duration-300 shadow-md cursor-pointer ${
          isPlaying
            ? 'border-[#E91E63] text-[#E91E63] glow-pink bg-white/95'
            : 'border-[#F8D4DF] text-[#8A6875] hover:text-[#291820] bg-white/80'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#E91E63] animate-pulse" />
            <span className="text-xs font-mono font-medium tracking-wide">Music Playing</span>
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-3 bg-[#E91E63] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-2 bg-[#E91E63] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-3.5 bg-[#E91E63] animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="text-xs font-mono font-medium tracking-wide">Music Off</span>
            <Music className="w-3.5 h-3.5 text-[#D6A85F] group-hover:rotate-12 transition-transform" />
          </>
        )}
      </button>
    </div>
  );
};
