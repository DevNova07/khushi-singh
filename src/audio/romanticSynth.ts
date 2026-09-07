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

  // "Happy Birthday To You" Romantic Music Box Arrangement
  // Frequencies in Hz:
  // C3=130.81, F3=174.61, G3=196.00, A3=220.00, C4=261.63, D4=293.66, E4=329.63, F4=349.23
  // G4=392.00, A4=440.00, B4=493.88, C5=523.25, D5=587.33, E5=659.25, F5=698.46, G5=783.99
  private happyBirthdayNotes = [
    // Phrase 1: "Happy Birthday to you..."
    { note: 392.00, dur: 0.45, delay: 0.00, gain: 0.16 }, // Hap-
    { note: 392.00, dur: 0.35, delay: 0.48, gain: 0.15 }, // py
    { note: 440.00, dur: 0.75, delay: 0.88, gain: 0.18 }, // Birth-
    { note: 392.00, dur: 0.75, delay: 1.68, gain: 0.17 }, // day
    { note: 523.25, dur: 0.85, delay: 2.48, gain: 0.20, harmony: 261.63 }, // to
    { note: 493.88, dur: 1.60, delay: 3.38, gain: 0.18, harmony: 196.00 }, // you...

    // Phrase 2: "Happy Birthday to you..."
    { note: 392.00, dur: 0.45, delay: 5.20, gain: 0.16 }, // Hap-
    { note: 392.00, dur: 0.35, delay: 5.68, gain: 0.15 }, // py
    { note: 440.00, dur: 0.75, delay: 6.08, gain: 0.18 }, // Birth-
    { note: 392.00, dur: 0.75, delay: 6.88, gain: 0.17 }, // day
    { note: 587.33, dur: 0.85, delay: 7.68, gain: 0.20, harmony: 196.00 }, // to
    { note: 523.25, dur: 1.60, delay: 8.58, gain: 0.18, harmony: 261.63 }, // you...

    // Phrase 3: "Happy Birthday dear Khushi..."
    { note: 392.00, dur: 0.45, delay: 10.40, gain: 0.16 }, // Hap-
    { note: 392.00, dur: 0.35, delay: 10.88, gain: 0.15 }, // py
    { note: 783.99, dur: 0.85, delay: 11.28, gain: 0.22, harmony: 261.63 }, // Birth-
    { note: 659.25, dur: 0.85, delay: 12.18, gain: 0.20, harmony: 329.63 }, // day
    { note: 523.25, dur: 0.75, delay: 13.08, gain: 0.18, harmony: 220.00 }, // dear
    { note: 493.88, dur: 0.75, delay: 13.88, gain: 0.17 },                 // Khu-
    { note: 440.00, dur: 1.60, delay: 14.68, gain: 0.19, harmony: 174.61 }, // shi... ❤️

    // Phrase 4: "Happy Birthday to you!"
    { note: 698.46, dur: 0.45, delay: 16.50, gain: 0.18 }, // Hap-
    { note: 698.46, dur: 0.35, delay: 16.98, gain: 0.17 }, // py
    { note: 659.25, dur: 0.85, delay: 17.38, gain: 0.20, harmony: 174.61 }, // Birth-
    { note: 523.25, dur: 0.85, delay: 18.28, gain: 0.19, harmony: 261.63 }, // day
    { note: 587.33, dur: 0.95, delay: 19.18, gain: 0.21, harmony: 196.00 }, // to
    { note: 523.25, dur: 2.80, delay: 20.18, gain: 0.22, harmony: 130.81 }  // you! ✨
  ];

  public startMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    const playFullTune = () => {
      if (!this.isPlaying || !this.ctx) return;

      // Play all Happy Birthday notes with exact musical timing
      this.happyBirthdayNotes.forEach((item) => {
        // Main melody note
        this.playNote(item.note, item.dur * 1.8, item.delay, item.gain);

        // Warm harmonic sub-note if present
        if (item.harmony) {
          this.playNote(item.harmony, item.dur * 2.2, item.delay + 0.02, item.gain * 0.55);
        }
      });

      // Loop after the full song finishes (24 seconds total cycle)
      this.timerId = window.setTimeout(playFullTune, 24000);
    };

    playFullTune();
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

  // Funny cartoon boing/spring sound for runaway button with progressive comedic pitch
  public playBoing(attempt: number = 0) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Varied comical spring frequency that gets slightly higher and funnier
    const pitchShift = 1 + (attempt % 10) * 0.045;
    const f1 = 180 * pitchShift;
    const f2 = 720 * pitchShift;
    const f3 = 260 * pitchShift;
    const f4 = 640 * pitchShift;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(f1, now);
    osc.frequency.exponentialRampToValueAtTime(f2, now + 0.16);
    osc.frequency.exponentialRampToValueAtTime(f3, now + 0.28);
    osc.frequency.exponentialRampToValueAtTime(f4, now + 0.38);

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

  // Celebratory royal fanfare for gift box reveal / trophy
  public playFanfare() {
    this.initContext();
    if (!this.ctx) return;
    const fanfareNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    fanfareNotes.forEach((f, i) => {
      this.playNote(f, 1.6, i * 0.1, 0.22);
    });
  }

  // Stamp / seal sound effect for coupons and promises
  public playStamp() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.18);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.18);
    this.playSparkle();
  }
}

export const romanticAudio = new RomanticSoundEngine();
