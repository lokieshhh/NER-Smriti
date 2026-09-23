import { useMemo, useState } from "react";
import { TileArt } from "./TileArt.jsx";
import { shuffle } from "./progress.js";
import { GameFrame } from "./TodaysStory.jsx";
import { playMiss, playSuccess } from "./tunes.js";
import { speak } from "./speech.js";

const PAIRS = [
  { a: { id: "bihu", title: "Bihu", kind: "bihu" }, b: { id: "pepa", title: "Pepa / Dhol", kind: "pepa" } },
  { a: { id: "hornbill", title: "Hornbill Festival", kind: "hornbill" }, b: { id: "headgear", title: "Naga headgear", kind: "headgear" } },
  { a: { id: "wangala", title: "Wangala", kind: "wangala" }, b: { id: "drum", title: "Garo drum", kind: "drum" } },
  { a: { id: "muga1", title: "Muga motif", kind: "muga" }, b: { id: "muga2", title: "Muga motif", kind: "muga" } },
  { a: { id: "jewel1", title: "Tribal jewelry", kind: "jewelry" }, b: { id: "jewel2", title: "Tribal jewelry", kind: "jewelry" } },
];

export default function MatchPair({ progress, onProgress, onHome }) {
  const deck = useMemo(() => {
    const take = PAIRS.slice(0, progress.pairFaceUp ? 3 : 5);
    return shuffle(
      take.flatMap((p, i) => [
        { ...p.a, pair: i, uid: `${i}-a` },
        { ...p.b, pair: i, uid: `${i}-b` },
      ])
    );
  }, [progress.pairFaceUp, progress.plays]);

  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lock, setLock] = useState(false);

  function tap(card) {
    if (lock || matched.includes(card.uid) || open.find((o) => o.uid === card.uid)) return;
    if (progress.pairFaceUp) {
      const next = [...open, card].slice(-2);
      setOpen(next);
      if (next.length === 2) resolve(next);
      return;
    }
    const next = [...open, card];
    setOpen(next);
    if (next.length === 2) resolve(next);
  }

  function resolve(pair) {
    setLock(true);
    const ok = pair[0].pair === pair[1].pair;
    const delay = progress.pairFaceUp ? 400 : progress.pairFlipMs;
    setTimeout(() => {
      if (ok) {
        playSuccess();
        const done = [...matched, pair[0].uid, pair[1].uid];
        setMatched(done);
        setOpen([]);
        if (done.length === deck.length) {
          speak("Jugol milil. All pairs found.");
          onProgress({
            ...progress,
            plays: progress.plays + 1,
            pairMisses: 0,
            pairFaceUp: false,
            pairFlipMs: Math.max(500, progress.pairFlipMs - 80),
          });
        }
      } else {
        playMiss();
        const misses = progress.pairMisses + 1;
        setOpen([]);
        onProgress({
          ...progress,
          pairMisses: misses,
          pairFaceUp: misses >= 4,
          pairFlipMs: Math.min(1400, progress.pairFlipMs + 80),
        });
      }
      setLock(false);
    }, delay);
  }

  const showFace = (card) =>
    progress.pairFaceUp || open.some((o) => o.uid === card.uid) || matched.includes(card.uid);

  return (
    <GameFrame
      title="Match the Pair"
      as="যুগল মিলন"
      onHome={onHome}
      hint={
        progress.pairFaceUp
          ? "Cards stay open. Tap two that belong together."
          : "Remember, then flip. Festival ↔ object, or two same motifs."
      }
    >
      <div className="grid n-4">
        {deck.map((card) => (
          <button
            key={card.uid}
            className={`cell flip ${matched.includes(card.uid) ? "matched" : ""}`}
            onClick={() => tap(card)}
          >
            {showFace(card) ? (
              <>
                <TileArt kind={card.kind} size={72} />
                <span>{card.title}</span>
              </>
            ) : (
              <span className="back">NER</span>
            )}
          </button>
        ))}
      </div>
    </GameFrame>
  );
}
