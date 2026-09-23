import "./Home.css";

const cards = [
  {
    id: "games",
    label: "Play Games",
    hint: "Memory & matching",
    emoji: "🧩",
    accent: "var(--accent-tea)",
  },
  {
    id: "reminders",
    label: "My Reminders",
    hint: "Medicine & water",
    emoji: "⏰",
    accent: "var(--accent-gold)",
  },
  {
    id: "family",
    label: "Family & Caregiver",
    hint: "Progress & messages",
    emoji: "👨‍👩‍👧",
    accent: "var(--accent-clay)",
  },
  {
    id: "help",
    label: "Help",
    hint: "Call for support",
    emoji: "❓",
    accent: "var(--accent-moss)",
  },
];

export default function Home({ onNavigate }) {
  return (
    <div className="home">
      <header className="home__header">
        <p className="home__eyebrow">Namaskar 🙏</p>
        <h1 className="home__title">NER Smriti</h1>
        <p className="home__subtitle">Mind games from the Northeast</p>
      </header>

      <div className="home__grid">
        {cards.map((card) => (
          <button
            key={card.id}
            className="home__card"
            style={{ "--card-accent": card.accent }}
            onClick={() => onNavigate?.(card.id)}
          >
            <span className="home__card-emoji" aria-hidden="true">
              {card.emoji}
            </span>
            <span className="home__card-label">{card.label}</span>
            <span className="home__card-hint">{card.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}