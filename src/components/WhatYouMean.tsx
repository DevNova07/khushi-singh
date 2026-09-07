import React from 'react';
import { BigQuote } from './BigQuote';
import { LoveCounter } from './LoveCounter';
import { InteractiveQuestion } from './InteractiveQuestion';

interface WhatYouMeanProps {
  onContinue: () => void;
}

export const WhatYouMean: React.FC<WhatYouMeanProps> = ({ onContinue }) => {
  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <BigQuote />
      <LoveCounter />
      <InteractiveQuestion onContinue={onContinue} />
    </div>
  );
};
