import { useEffect, useMemo, useRef, useState } from "react";
import { TileArt } from "./TileArt.jsx";
import { clamp, shuffle } from "./progress.js";
import { GameFrame } from "./TodaysStory.jsx";
import { playMiss, playSuccess } from "./tunes.js";
import { speak } from "./speech.js";

const OBJECTS = [
  { id: "loom", title: "Weaving loom", as: "তাঁতশাল" },
  { id: "khorahi", title: "Khorahi", as: "খৰাহি" },
  { id: "gamosa", title: "Gamosa", as: "গামোচা" },
  { id: "mandarin", title: "Khasi mandarin", as: "খাচি কমলা" },
  { id: "jaapi", title: "Jaapi", as: "জাপি" },
  { id: "driedfish", title: "Dried fish", as: "শুকান মাছ" },
  { id: "bamboo", title: "Bamboo shoot", as: "বাঁহ গজালি" },
  { id: "gua", title: "Tamul / Gua", as: "তামোল" },
];

export default function MissingObject({ progress, onProgress, onHome }) {
  const [seed, setSeed] = useState(0);
  const n = clamp(progress.missingGrid, 4, 8);
  const round = useMemo(() => {
    const items = shuffle(OBJECTS).slice(0, n);
    const missing = items[Math.floor(Math.random() * items.length)];
    return { items, missing, shown: shuffle(items.filter((x) => x.id !== missing.id)) };
  }, [n, seed]);

  const [phase, setPhase] = useState("study");
  const [glow, setGlow] = useState(false);
  const [choices, setChoices] = useState([]);
  const started = useRef(0);

  useEffect(() => {
    setPhase("study");
    setGlow(false);
    const t = setTimeout(() => {
      setChoices(shuffle([...round.shown, round.missing]));
      setPhase("ask");
      started.current = performance.now();
      speak("Kune nai? What is missing?");
    }, 5000);
    return () => clearTimeout(t);
  }, [round]);

  function tap(item) {
    const ms = performance.now() - started.current;
    const ok = item.id === round.missing.id;
    if (ok) {
      playSuccess();
      const fast = ms < 3500;
      onProgress({
        ...progress,
        plays: progress.plays + 1,
        missingFastStreak: fast ? progress.missingFastStreak + 1 : 0,
        missingSlowStreak: fast ? 0 : progress.missingSlowStreak + 1,
        missingGrid: fast && progress.missingFastStreak + 1 >= 2
          ? clamp(progress.missingGrid + 2, 4, 8)
          : progress.missingGrid,
      });
      setPhase("done");
    } else {
      playMiss();
      const slow = ms > 7000 || progress.missingSlowStreak >= 1;
      setGlow(slow);
      onProgress({
        ...progress,
        missingSlowStreak: progress.missingSlowStreak + 1,
        missingFastStreak: 0,
        missingGrid: clamp(progress.missingGrid - 2, 4, 6),
      });
    }
  }

  return (
    <GameFrame
      title="Find the Missing Object"
      as="কোনো নাই?"
      onHome={onHome}
      hint={
        phase === "study"
          ? "Look carefully for 5 seconds…"
          : "Tap the object that disappeared."
      }
    >
      {phase === "study" && (
        <div className={`grid n-${n}`}>
          {round.items.map((item) => (
            <div key={item.id} className="cell">
              <TileArt kind={item.id} size={80} />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      )}
      {phase === "ask" && (
        <>
          <div className={`grid n-${Math.min(n, 6)}`}>
            {round.shown.map((item) => (
              <div
                key={item.id}
                className={`cell dim ${glow ? "glow-empty-neighbor" : ""}`}
              >
                <TileArt kind={item.id} size={72} />
              </div>
            ))}
            {glow && <div className="cell glow-spot">?</div>}
          </div>
          <p className="msg">Kune nai? Who / what is missing?</p>
          <div className="tray">
            {choices.map((item) => (
              <button key={item.id} className="card-btn" onClick={() => tap(item)}>
                <TileArt kind={item.id} size={72} />
                <strong>{item.title}</strong>
              </button>
            ))}
          </div>
        </>
      )}
      {phase === "done" && (
        <div className="celebrate">
          <p className="msg">Thik koi pua! You found the missing piece.</p>
          <button className="btn" onClick={() => setSeed((s) => s + 1)}>
            Next round
          </button>
        </div>
      )}
    </GameFrame>
  );
}
