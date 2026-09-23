import { useMemo, useState } from "react";
import { TileArt } from "./TileArt.jsx";
import { clamp, shuffle } from "./progress.js";
import { playMiss, playSuccess } from "./tunes.js";
import { speak } from "./speech.js";

const DAY = [
  { id: "wake", title: "Waking up", as: "উঠা", kind: "wake", order: 1 },
  { id: "tea", title: "Lal cha (tea)", as: "ৰঙা চাহ", kind: "tea", order: 2 },
  { id: "gua", title: "Tamul / Gua", as: "তামোল / গুৱা", kind: "gua", order: 3 },
  { id: "loom", title: "Weaving", as: "তাঁত", kind: "loom", order: 4 },
  { id: "jadoh", title: "Jadoh lunch", as: "জাদোহ", kind: "jadoh", order: 5 },
  { id: "paper", title: "Newspaper", as: "বাতৰি কাকত", kind: "paper", order: 6 },
];

const FAMILY = [
  { id: "wake", title: "Ma wakes you", as: "মা", kind: "ma", order: 1 },
  { id: "tea", title: "Tea with Baba", as: "বাবা", kind: "baba", order: 2 },
  { id: "lunch", title: "Family lunch", as: "পৰিয়াল", kind: "family", order: 3 },
];

export default function TodaysStory({ progress, onProgress, onHome }) {
  const length = progress.storyFamilyMode
    ? Math.min(3, progress.storyLength)
    : clamp(progress.storyLength, 2, 5);
  const pool = progress.storyFamilyMode ? FAMILY : DAY;
  const round = useMemo(() => {
    const chosen = pool.slice(0, Math.min(length, pool.length));
    return { correct: chosen, mixed: shuffle(chosen) };
  }, [length, pool]);

  const [placed, setPlaced] = useState([]);
  const [dragging, setDragging] = useState(null);
  const [msg, setMsg] = useState("Put the day in order. Morning first.");

  const remaining = round.mixed.filter((x) => !placed.find((p) => p.id === x.id));

  function dropAt(i) {
    if (!dragging) return;
    const next = [...placed];
    next.splice(i, 0, dragging);
    setPlaced(next);
    setDragging(null);
  }

  function pick(item) {
    setDragging(item);
  }

  function check() {
    if (placed.length !== round.correct.length) {
      setMsg("Place every picture first.");
      speak("Place every picture first.");
      return;
    }
    const ok = placed.every((p, i) => p.id === round.correct[i].id);
    if (ok) {
      playSuccess();
      setMsg("Xobai thik! The day is in order.");
      speak("Xobai thik. Beautiful. The day is in order.");
      onProgress({
        ...progress,
        storyStruggles: 0,
        storyFamilyMode: false,
        storyLength: clamp(progress.storyLength + 1, 2, 5),
        plays: progress.plays + 1,
      });
    } else {
      playMiss();
      const struggles = progress.storyStruggles + 1;
      const family = struggles >= 2;
      setMsg(
        family
          ? "Let us try with familiar faces — Ma and Baba."
          : "Almost. Morning comes before lunch. Try again."
      );
      speak(family ? "Let us try with Ma and Baba." : "Almost. Try again, slowly.");
      setPlaced([]);
      onProgress({
        ...progress,
        storyStruggles: struggles,
        storyFamilyMode: family,
        storyLength: family ? 2 : clamp(progress.storyLength - 1, 2, 5),
      });
    }
  }

  return (
    <GameFrame
      title="Today’s Story"
      as="আজিৰ কাহিনী"
      onHome={onHome}
      hint={
        progress.storyFamilyMode
          ? "Family mode: 2–3 familiar faces, in time order."
          : `${length} pictures. Drag morning → evening.`
      }
    >
      <p className="msg">{msg}</p>
      <div className="slots">
        {Array.from({ length: round.correct.length }).map((_, i) => (
          <button
            key={i}
            className="slot"
            onClick={() => (placed[i] ? setPlaced(placed.filter((_, j) => j !== i)) : dropAt(i))}
          >
            {placed[i] ? (
              <Card item={placed[i]} />
            ) : (
              <span className="slot-label">{i + 1}</span>
            )}
          </button>
        ))}
      </div>
      <div className="tray">
        {remaining.map((item) => (
          <button
            key={item.id}
            className={`card-btn ${dragging?.id === item.id ? "selected" : ""}`}
            onClick={() => pick(item)}
          >
            <Card item={item} />
          </button>
        ))}
      </div>
      <div className="actions">
        <button className="btn ghost" onClick={() => setPlaced([])}>
          Clear
        </button>
        <button className="btn" onClick={check}>
          Check order
        </button>
      </div>
    </GameFrame>
  );
}

function Card({ item }) {
  return (
    <div className="pic-card">
      <TileArt kind={item.kind} size={88} />
      <strong>{item.title}</strong>
      <span>{item.as}</span>
    </div>
  );
}

export function GameFrame({ title, as, hint, onHome, children }) {
  return (
    <section className="game">
      <header className="game-head">
        <button className="btn ghost back" onClick={onHome}>
          ← Home
        </button>
        <div>
          <h2>{title}</h2>
          <p className="as">{as}</p>
        </div>
      </header>
      {hint && <p className="hint">{hint}</p>}
      {children}
    </section>
  );
}
