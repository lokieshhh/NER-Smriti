export function TileArt({ kind, size = 96 }) {
  const arts = {
    wake: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#f4e2c0" />
        <circle cx="88" cy="28" r="16" fill="#e8a317" />
        <rect x="18" y="58" width="84" height="42" rx="6" fill="#7a4a2a" />
        <rect x="26" y="66" width="40" height="22" fill="#c9e4ff" />
      </svg>
    ),
    tea: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#d7eee0" />
        <ellipse cx="56" cy="78" rx="32" ry="10" fill="#1f4d3a" opacity="0.2" />
        <path d="M32 50h48v28a18 18 0 0 1-48 0z" fill="#c45c26" />
        <path d="M80 56c14 0 14 22 0 22" fill="none" stroke="#7a4a2a" strokeWidth="6" />
        <path d="M44 28c4 8 4 14 0 18" stroke="#9aa7b0" fill="none" strokeWidth="4" />
      </svg>
    ),
    gua: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#efe7c8" />
        <ellipse cx="60" cy="64" rx="28" ry="22" fill="#6b8f3a" />
        <ellipse cx="52" cy="58" rx="8" ry="6" fill="#8fb85a" />
        <circle cx="86" cy="78" r="12" fill="#c45c26" />
      </svg>
    ),
    lunch: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#f7d9a8" />
        <ellipse cx="60" cy="70" rx="38" ry="24" fill="#e8e0d0" />
        <ellipse cx="60" cy="68" rx="28" ry="16" fill="#f3f0e4" />
        <ellipse cx="48" cy="66" rx="10" ry="7" fill="#c45c26" />
        <ellipse cx="70" cy="70" rx="9" ry="6" fill="#3d6b3a" />
      </svg>
    ),
    paper: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#e7eef5" />
        <rect x="28" y="24" width="64" height="76" fill="#fff" stroke="#1f4d3a" />
        <rect x="36" y="34" width="48" height="8" fill="#1f4d3a" />
        <rect x="36" y="50" width="48" height="4" fill="#9aa7b0" />
        <rect x="36" y="60" width="40" height="4" fill="#9aa7b0" />
        <rect x="36" y="70" width="44" height="4" fill="#9aa7b0" />
      </svg>
    ),
    loom: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#f0d9b0" />
        <rect x="22" y="20" width="10" height="80" fill="#7a4a2a" />
        <rect x="88" y="20" width="10" height="80" fill="#7a4a2a" />
        <rect x="22" y="30" width="76" height="8" fill="#c9a227" />
        <rect x="22" y="46" width="76" height="8" fill="#c45c26" />
        <rect x="22" y="62" width="76" height="8" fill="#1f4d3a" />
      </svg>
    ),
    jadoh: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#f6c79a" />
        <ellipse cx="60" cy="72" rx="36" ry="20" fill="#e8dcc8" />
        <ellipse cx="60" cy="68" rx="24" ry="14" fill="#d4a017" />
        <ellipse cx="52" cy="66" rx="8" ry="5" fill="#8b2e1a" />
      </svg>
    ),
    family: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#fde8d0" />
        <circle cx="44" cy="48" r="16" fill="#e6b089" />
        <circle cx="76" cy="50" r="14" fill="#d9a066" />
        <rect x="28" y="68" width="64" height="28" rx="14" fill="#1f4d3a" />
      </svg>
    ),
    ma: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#f8dcc8" />
        <circle cx="60" cy="46" r="20" fill="#e6b089" />
        <path d="M32 46c8-22 48-22 56 0" fill="#3a2a22" />
        <rect x="34" y="72" width="52" height="28" rx="12" fill="#c45c26" />
      </svg>
    ),
    baba: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#e8e0d4" />
        <circle cx="60" cy="48" r="20" fill="#c9956c" />
        <rect x="42" y="28" width="36" height="10" rx="4" fill="#3a2a22" />
        <rect x="32" y="74" width="56" height="26" rx="10" fill="#1f4d3a" />
      </svg>
    ),
    khorahi: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#efe4c8" />
        <ellipse cx="60" cy="50" rx="34" ry="12" fill="#c9a227" />
        <path d="M26 50v18c0 16 68 16 68 0V50" fill="#b8860b" />
      </svg>
    ),
    gamosa: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#f4f1e8" />
        <rect x="22" y="28" width="76" height="64" fill="#f7f4ea" stroke="#c45c26" strokeWidth="8" />
        <rect x="30" y="70" width="60" height="10" fill="#c45c26" />
      </svg>
    ),
    mandarin: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#eaf6d8" />
        <circle cx="60" cy="64" r="28" fill="#f08a24" />
        <path d="M60 36c6 8 14 8 18 4" fill="#3d6b3a" />
      </svg>
    ),
    jaapi: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#d7eee0" />
        <ellipse cx="60" cy="70" rx="42" ry="16" fill="#c9a227" />
        <path d="M28 68c16-28 48-28 64 0" fill="#e8d48a" />
        <circle cx="60" cy="52" r="8" fill="#7a4a2a" />
      </svg>
    ),
    driedfish: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#e9eef2" />
        <ellipse cx="62" cy="60" rx="32" ry="14" fill="#8a6a4a" />
        <path d="M30 60l-12-10v20z" fill="#6b4e34" />
        <circle cx="82" cy="56" r="3" fill="#1f1a14" />
      </svg>
    ),
    bamboo: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#e5f0d6" />
        <rect x="44" y="18" width="14" height="84" rx="6" fill="#6b8f3a" />
        <rect x="62" y="26" width="14" height="76" rx="6" fill="#8fb85a" />
        <rect x="42" y="44" width="36" height="6" fill="#3d6b3a" />
        <rect x="42" y="70" width="36" height="6" fill="#3d6b3a" />
      </svg>
    ),
    rice: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#f4efe2" />
        <ellipse cx="60" cy="74" rx="34" ry="16" fill="#e8e0d0" />
        <ellipse cx="60" cy="64" rx="24" ry="16" fill="#f7f4ea" />
      </svg>
    ),
    pickle: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#fde8d0" />
        <rect x="40" y="28" width="40" height="64" rx="8" fill="#8b2e1a" />
        <rect x="44" y="34" width="32" height="16" fill="#f08a24" opacity="0.5" />
      </svg>
    ),
    rawfish: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#dceaf5" />
        <ellipse cx="64" cy="62" rx="30" ry="16" fill="#7aa0c4" />
        <path d="M34 62l-16-12v24z" fill="#5d84a8" />
        <circle cx="84" cy="58" r="3" fill="#1f1a14" />
      </svg>
    ),
    kerosene: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#ece6d8" />
        <rect x="40" y="30" width="40" height="62" rx="6" fill="#c9a227" />
        <rect x="50" y="22" width="20" height="12" fill="#7a4a2a" />
        <text x="60" y="68" textAnchor="middle" fontSize="18" fill="#8b2e1a">!</text>
      </svg>
    ),
    mold: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#d8d4c4" />
        <rect x="40" y="28" width="40" height="64" rx="8" fill="#6b5b3a" />
        <circle cx="52" cy="54" r="6" fill="#6b8f3a" />
        <circle cx="70" cy="70" r="8" fill="#3d6b3a" />
      </svg>
    ),
    bihu: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#c45c26" />
        <circle cx="60" cy="44" r="16" fill="#f4e2c0" />
        <rect x="34" y="62" width="52" height="36" rx="8" fill="#1f4d3a" />
        <rect x="18" y="70" width="18" height="8" fill="#c9a227" />
      </svg>
    ),
    pepa: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#f4e2c0" />
        <rect x="20" y="56" width="80" height="10" rx="4" fill="#7a4a2a" />
        <circle cx="28" cy="61" r="12" fill="#e8e0d0" />
      </svg>
    ),
    hornbill: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#1f4d3a" />
        <circle cx="52" cy="58" r="18" fill="#f4e2c0" />
        <path d="M68 52l28-6-22 18z" fill="#f08a24" />
        <rect x="44" y="28" width="8" height="22" fill="#c9a227" />
      </svg>
    ),
    headgear: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#2b2118" />
        <ellipse cx="60" cy="78" rx="28" ry="12" fill="#c9a227" />
        <path d="M40 74l8-40 12 12 12-20 8 48" fill="#e8e0d0" />
        <circle cx="60" cy="70" r="8" fill="#c45c26" />
      </svg>
    ),
    wangala: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#8b2e1a" />
        <rect x="48" y="24" width="24" height="72" rx="12" fill="#7a4a2a" />
        <rect x="40" y="40" width="40" height="14" fill="#c9a227" />
      </svg>
    ),
    drum: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#efe4c8" />
        <ellipse cx="60" cy="40" rx="28" ry="12" fill="#e8e0d0" />
        <rect x="32" y="40" width="56" height="44" fill="#7a4a2a" />
        <ellipse cx="60" cy="84" rx="28" ry="12" fill="#5a3820" />
      </svg>
    ),
    muga: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#c9a227" />
        <path d="M20 80c20-40 60-40 80 0" fill="none" stroke="#7a4a2a" strokeWidth="6" />
        <circle cx="60" cy="48" r="10" fill="#1f4d3a" />
        <circle cx="40" cy="64" r="6" fill="#c45c26" />
        <circle cx="80" cy="64" r="6" fill="#c45c26" />
      </svg>
    ),
    jewelry: (
      <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden>
        <rect width="120" height="120" rx="18" fill="#1f4d3a" />
        <circle cx="60" cy="52" r="22" fill="none" stroke="#c9a227" strokeWidth="8" />
        <circle cx="60" cy="78" r="8" fill="#c45c26" />
      </svg>
    ),
  };
  return arts[kind] || arts.rice;
}
