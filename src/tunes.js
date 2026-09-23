let ctx;

function audioCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq, start, dur, type = "sine", gain = 0.08) {
  const a = audioCtx();
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.connect(g);
  g.connect(a.destination);
  o.start(start);
  o.stop(start + dur + 0.02);
}

/** Short folk-inspired clips generated in-browser (no copyrighted recordings). */
export const TUNES = [
  {
    id: "bihu",
    title: "Bihu geet pulse",
    as: "বিহু গীত",
    hint: "Ei gaan tu Bihu-r dhol-pepa dhoron. Whose song is this? A joyful Assamese harvest tune.",
    mood: "upbeat",
    play: () => playBihu(),
  },
  {
    id: "naga",
    title: "Naga folk chant",
    as: "নাগা লোকগীত",
    hint: "Ei gaan tu kunor? A Naga hill chant with a deep drone.",
    mood: "calm",
    play: () => playNaga(),
  },
  {
    id: "rabindra",
    title: "Rabindra-style air",
    as: "ৰবীন্দ্র সঙ্গীত ধৰণ",
    hint: "A slow, flowing melody in the spirit of Rabindra Sangeet.",
    mood: "nostalgic",
    play: () => playRabindra(),
  },
  {
    id: "wangala",
    title: "Wangala drum",
    as: "ৱাংগালা ঢোল",
    hint: "A Garo harvest drum pattern — rhythmic and warm.",
    mood: "upbeat",
    play: () => playWangala(),
  },
  {
    id: "khasi",
    title: "Khasi hill melody",
    as: "খাচি পাহাৰী সুৰ",
    hint: "A gentle pentatonic line from the Khasi hills.",
    mood: "calm",
    play: () => playKhasi(),
  },
];

export function playBihu() {
  const a = audioCtx();
  const t0 = a.currentTime + 0.05;
  const notes = [392, 440, 494, 523, 494, 440, 392, 349, 392, 440, 392, 330];
  notes.forEach((n, i) => {
    tone(n, t0 + i * 0.18, 0.16, "triangle", 0.09);
    tone(n * 0.5, t0 + i * 0.18, 0.08, "square", 0.03);
  });
}

export function playNaga() {
  const a = audioCtx();
  const t0 = a.currentTime + 0.05;
  tone(110, t0, 9.5, "sawtooth", 0.03);
  const notes = [220, 247, 262, 247, 220, 196, 220, 262, 294, 262];
  notes.forEach((n, i) => tone(n, t0 + 0.4 + i * 0.7, 0.62, "sine", 0.1));
}

export function playRabindra() {
  const a = audioCtx();
  const t0 = a.currentTime + 0.05;
  const notes = [349, 392, 440, 392, 523, 494, 440, 392, 349, 330, 349];
  notes.forEach((n, i) => tone(n, t0 + i * 0.72, 0.7, "sine", 0.1));
}

export function playWangala() {
  const a = audioCtx();
  const t0 = a.currentTime + 0.05;
  for (let i = 0; i < 16; i += 1) {
    const f = i % 4 === 0 ? 90 : 140;
    tone(f, t0 + i * 0.22, 0.12, "triangle", 0.12);
    if (i % 2 === 0) tone(330, t0 + i * 0.22, 0.08, "square", 0.02);
  }
}

export function playKhasi() {
  const a = audioCtx();
  const t0 = a.currentTime + 0.05;
  const notes = [262, 294, 330, 392, 330, 294, 262, 220, 262];
  notes.forEach((n, i) => tone(n, t0 + i * 0.55, 0.5, "triangle", 0.09));
}

export function playSuccess() {
  const a = audioCtx();
  const t0 = a.currentTime;
  [523, 659, 784].forEach((n, i) => tone(n, t0 + i * 0.09, 0.18, "sine", 0.07));
}

export function playMiss() {
  const a = audioCtx();
  tone(180, a.currentTime, 0.22, "triangle", 0.06);
}
