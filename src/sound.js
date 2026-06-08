/*
 * Tiny procedural sound effects using the Web Audio API.
 * No audio files — every sound is synthesized on the fly so the game
 * stays fully self-contained. Safe to call before the user interacts;
 * it just no-ops until the AudioContext is unlocked by a gesture.
 */
const SFX = {
  ctx: null,
  muted: false,
  _pourNode: null,

  // Browsers require an AudioContext to be created/resumed after a user gesture.
  unlock() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return;
    }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
    } catch (e) {
      this.ctx = null; // Audio simply unavailable — game still runs.
    }
  },

  _now() {
    return this.ctx ? this.ctx.currentTime : 0;
  },

  // A short pitched blip. Used for buttons, dings, coins.
  blip(freq = 660, dur = 0.08, type = 'square', vol = 0.18) {
    if (!this.ctx || this.muted) return;
    const t = this._now();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  },

  // Pleasant two-note "success" chime.
  ding() {
    this.blip(880, 0.1, 'triangle', 0.2);
    setTimeout(() => this.blip(1320, 0.14, 'triangle', 0.18), 70);
  },

  // Coin pickup — bright and quick.
  coin() {
    this.blip(1046, 0.06, 'square', 0.12);
    setTimeout(() => this.blip(1568, 0.09, 'square', 0.12), 50);
  },

  // Soft error / sad trombone-ish for an unhappy customer.
  buzz() {
    this.blip(220, 0.18, 'sawtooth', 0.14);
    setTimeout(() => this.blip(160, 0.22, 'sawtooth', 0.14), 100);
  },

  // Cash register cha-ching for buying an upgrade.
  cash() {
    this.blip(660, 0.05, 'square', 0.15);
    setTimeout(() => this.blip(990, 0.05, 'square', 0.15), 50);
    setTimeout(() => this.blip(1320, 0.12, 'triangle', 0.18), 110);
  },

  // Continuous filtered-noise "pour" loop. Call startPour()/stopPour().
  startPour() {
    if (!this.ctx || this.muted || this._pourNode) return;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 1, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 900;
    filter.Q.value = 0.7;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.07;
    src.connect(filter).connect(gain).connect(this.ctx.destination);
    src.start();
    this._pourNode = { src, gain };
  },

  stopPour() {
    if (!this._pourNode) return;
    try {
      this._pourNode.gain.gain.setTargetAtTime(0.0001, this._now(), 0.05);
      this._pourNode.src.stop(this._now() + 0.15);
    } catch (e) { /* ignore */ }
    this._pourNode = null;
  },

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) this.stopPour();
    return this.muted;
  },
};
