import { useMemo, useState } from "react";
import { TUNES } from "./tunes.js";
import { GameFrame } from "./TodaysStory.jsx";
import { speak } from "./speech.js";

const MOODS = [
  { id: "happy", label: "Happy", as: "আনন্দ", emoji: "😊" },
  { id: "sad", label: "Sad", as: "দুখ", emoji: "😢" },
  { id: "calm", label: "Calm", as: "শান্ত", emoji: "😌" },
  { id: "nostalgic", label: "Nostalgic", as: "স্মৃতি", emoji: "🥹" },
];

export default function Jukebox({ progress, onProgress, onHome }) {
  const tune = useMemo(() => {
    const pool = progress.jukeboxPreferUpbeat
      ? TUNES.filter((t) => t.mood === "upbeat")
      : TUNES;
    return pool[Math.floor(Math.random() * pool.length)];
  }, [progress.jukeboxPreferUpbeat, progress.plays]);

  const [picked, setPicked] = useState(null);

  function play() {
    speak("Ei gaan tu kunor? Whose song is this?");
    setTimeout(() => tune.play(), 1600);
  }

  function feel(mood) {
    setPicked(mood.id);
    const sad = mood.id === "sad" ? progress.jukeboxSadStreak + 1 : 0;
    onProgress({
      ...progress,
      jukeboxSadStreak: sad,
      jukeboxPreferUpbeat: sad >= 2,
      plays: progress.plays + 1,
    });
    if (sad >= 2) {
      speak("Let us hear a brighter Bihu beat.");
    } else {
      speak(`${mood.label}. Thank you for sharing.`);
    }
  }

  return (
    <GameFrame
      title="Nostalgia Jukebox"
      as="পুৰণি সুৰ"
      onHome={onHome}
      hint="Voice-first: listen, then tap how you feel. No wrong answers."
    >
      <div className="jukebox">
        <p className="msg">{tune.title}</p>
        <p className="as">{tune.as}</p>
        <p className="hint">{tune.hint}</p>
        {progress.jukeboxPreferUpbeat && (
          <p className="soft-note">Playing more upbeat folk — dhol, pepa, harvest drums.</p>
        )}
        <button className="btn huge" onClick={play}>
          ▶ Play 10-second clip
        </button>
        <div className="moods">
          {MOODS.map((m) => (
            <button
              key={m.id}
              className={`mood ${picked === m.id ? "selected" : ""}`}
              onClick={() => feel(m)}
            >
              <span className="emoji">{m.emoji}</span>
              {m.label}
              <small>{m.as}</small>
            </button>
          ))}
        </div>
      </div>
    </GameFrame>
  );
}
