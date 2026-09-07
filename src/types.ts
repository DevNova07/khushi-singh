export interface StoryStep {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  icon: string;
}

export const STORY_STEPS: StoryStep[] = [
  { id: 'chapter-01', step: 1, title: 'Happy Birthday Princess', subtitle: 'Photo 1 • Hero Greeting', icon: '👑' },
  { id: 'chapter-02', step: 2, title: 'That Smile', subtitle: 'Photo 2 • Your Radiance', icon: '❤️' },
  { id: 'chapter-03', step: 3, title: 'That Beautiful Soul', subtitle: 'Photo 3 • Serenity & Grace', icon: '✨' },
  { id: 'chapter-04', step: 4, title: 'First Time I Saw You', subtitle: 'Photo 4 • Love Story', icon: '💖' },
  { id: 'chapter-05', step: 5, title: 'A Special Moment', subtitle: 'Photo 5 • Unforgettable Memory', icon: '📸' },
  { id: 'chapter-06', step: 6, title: 'Another Smile', subtitle: 'Photo 6 • Cherished Forever', icon: '🌸' },
  { id: 'chapter-07', step: 7, title: 'What You Mean To Me', subtitle: 'Happiness, Peace & Question', icon: '👀' },
  { id: 'chapter-08', step: 8, title: '5 Things I Love About You', subtitle: 'Photo 7 • Love Cards', icon: '💎' },
  { id: 'chapter-09', step: 9, title: 'Open Your Love Letter', subtitle: '3D Envelope & Handwritten Letter', icon: '💌' },
  { id: 'chapter-10', step: 10, title: 'Make a Wish & Blow Cake', subtitle: '3D Birthday Cake', icon: '🎂' },
  { id: 'chapter-11', step: 11, title: 'Final Promise & Forever', subtitle: 'Photo 8 • Grand Finale', icon: '♾️' },
];
