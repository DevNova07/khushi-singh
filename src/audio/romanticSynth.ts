// High-fidelity Web Audio API romantic ambient generator & sound effects
// Produces gentle, lush piano/music-box tones and celebratory chimes.

class RomanticSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft, warm romantic chime note with reverb tail
  private playNote(freq: number, duration: number = 2.5, timeOffset: number = 0, gainLevel: number = 0.18) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + timeOffset;

    // Oscillator 1: Sine (Pure, warm tone)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Oscillator 2: Triangle (Slight overtone warmth)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 1.002, now); // Slight detune for chorus warmth

    // Low pass filter to keep it soft and romantic
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    // Amplitude envelope
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(gainLevel, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  // Romantic chord progression sequence (Cmaj9 -> Am9 -> Fmaj7 -> Gsus4)
  private romanticMelodyNotes = [
    // Chord 1: Cmaj9 (C, G, B, E, D)
    [261.63, 392.00, 493.88, 659.25, 587.33],
    // Chord 2: Am9 (A, E, G, C, B)
    [220.00, 329.63, 392.00, 523.25, 493.88],
    // Chord 3: Fmaj7 (F, C, E, A, G)
    [174.61, 261.63, 329.63, 440.00, 392.00],
    // Chord 4: Gsus4 / G6 (G, D, G, B, D, E)
    [196.00, 293.66, 392.00, 493.88, 587.33, 659.25]
  ];

  public startMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    let chordIndex = 0;
    const playNextBar = () => {
      if (!this.isPlaying || !this.ctx) return;

      const chord = this.romanticMelodyNotes[chordIndex % this.romanticMelodyNotes.length];
      chordIndex++;

      // Arpeggiate chord gently like a romantic music box
      chord.forEach((freq, idx) => {
        const offset = idx * 0.45;
        this.playNote(freq, 4.0, offset, 0.14);
      });

      // Add a delicate high-register romantic accent note
      const accentFreq = chord[chord.length - 1] * 1.5;
      this.playNote(accentFreq, 2.5, 2.2, 0.08);

      // Repeat every 3.8 seconds
      this.timerId = window.setTimeout(playNextBar, 3800);
    };

    playNextBar();
  }

  public pauseMusic() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public isMusicPlaying(): boolean {
    return this.isPlaying;
  }

  // Celebratory sound effect for YES button & Cake candle blow
  public playCelebrationChime() {
    this.initContext();
    if (!this.ctx) return;
    const arpeggio = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    arpeggio.forEach((freq, idx) => {
      this.playNote(freq, 2.0, idx * 0.1, 0.22);
    });
  }

  // Funny cartoon boing/spring sound for runaway button
  public playBoing() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.16);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.28);
    osc.frequency.exponentialRampToValueAtTime(620, now + 0.38);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Soft pop sound effect for interactive buttons/candles
  public playPop() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  // Secret Heart collected sparkle
  public playSparkle() {
    this.initContext();
    if (!this.ctx) return;
    const freqs = [880, 1174.66, 1396.91, 1760];
    freqs.forEach((f, i) => {
      this.playNote(f, 0.8, i * 0.08, 0.15);
    });
  }
}

export const romanticAudio = new RomanticSoundEngine();
