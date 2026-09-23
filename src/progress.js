export const STORAGE_KEY = "ner-smriti-v1";

const defaults = {
  storyLength: 3,
  storyStruggles: 0,
  storyFamilyMode: false,
  missingGrid: 4,
  missingSlowStreak: 0,
  missingFastStreak: 0,
  pairFaceUp: false,
  pairFlipMs: 900,
  pairMisses: 0,
  jukeboxSadStreak: 0,
  jukeboxPreferUpbeat: false,
  kitchenGentle: true,
  plays: 0,
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaults };
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return { ...defaults };
  }
}

export function saveProgress(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
