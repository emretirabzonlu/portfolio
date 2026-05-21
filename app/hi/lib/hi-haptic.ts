export function hapticLight() {
  if (typeof navigator === "undefined") return;
  if ("vibrate" in navigator) navigator.vibrate(20);
}

export function hapticWelcome() {
  if (typeof navigator === "undefined") return;
  if ("vibrate" in navigator) navigator.vibrate([50, 30, 80]);
}

export function hapticSuccess() {
  if (typeof navigator === "undefined") return;
  if ("vibrate" in navigator) navigator.vibrate([40, 20, 40, 20, 60]);
}

let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
  }
  return audioContext;
}

export function playWelcomeSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const playNote = (freq: number, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    const now = ctx.currentTime;
    playNote(523.25, now, 0.3);
    playNote(659.25, now + 0.12, 0.4);
  } catch {
    // silently skip
  }
}

export function playTapSound() {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 800;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // silently skip
  }
}
