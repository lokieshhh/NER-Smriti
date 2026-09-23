import { useMemo, useState } from "react";
import { TileArt } from "./TileArt.jsx";
import { shuffle } from "./progress.js";
import { GameFrame } from "./TodaysStory.jsx";
import { playMiss, playSuccess } from "./tunes.js";
import { speak } from "./speech.js";

const ITEMS = [
  {
    id: "rice",
    title: "Steamed rice",
    kind: "rice",
    bin: "eat",
    note: "Bhaat is safe. Eat now.",
    gentle: "This is safe to eat with your meal.",
  },
  {
    id: "jadoh",
    title: "Jadoh",
    kind: "jadoh",
    bin: "eat",
    note: "Khasi rice and meat dish — eat while hot.",
    gentle: "Jadoh is food. Enjoy it with family.",
  },
  {
    id: "bamboo",
    title: "Fermented bamboo shoot",
    kind: "bamboo",
    bin: "eat",
    note: "Safe with rice — khorisa / soibum style.",
    gentle: "This is safe to eat, but only with rice!",
  },
  {
    id: "pickle",
    title: "Home pickle",
    kind: "pickle",
    bin: "eat",
    note: "Achar is fine in a small spoon.",
    gentle: "Pickle is food. Take a little with rice.",
  },
  {
    id: "mandarin",
    title: "Khasi mandarin",
    kind: "mandarin",
    bin: "eat",
    note: "Fresh fruit — eat now.",
    gentle: "The orange is ready to eat.",
  },
  {
    id: "driedfish",
    title: "Dried fish (cooked)",
    kind: "driedfish",
    bin: "eat",
    note: "Shutki / hukoti after cooking — with rice.",
    gentle: "Dried fish is food after it is cooked, with rice.",
  },
  {
    id: "rawfish",
    title: "Raw river fish",
    kind: "rawfish",
    bin: "later",
    note: "Not now — needs thorough cooking.",
    gentle: "Not yet. Cook the fish well, then eat.",
  },
  {
    id: "mold",
    title: "Mouldy pickle",
    kind: "mold",
    bin: "later",
    note: "Danger — throw away.",
    gentle: "This pickle is spoiled. Do not eat.",
  },
  {
    id: "kerosene",
    title: "Kerosene bottle",
    kind: "kerosene",
    bin: "later",
    note: "Never food. Keep away from the kitchen plate.",
    gentle: "This is not food. It is dangerous.",
  },
];

export default function KitchenSort({ progress, onProgress, onHome }) {
  const queue = useMemo(() => shuffle(ITEMS).slice(0, 6), [progress.plays]);
  const [i, setI] = useState(0);
  const [msg, setMsg] = useState("Eat now = safe food. Not now = wait, cook, or danger.");
  const item = queue[i];

  function sort(bin) {
    if (!item) return;
    const ok = item.bin === bin;
    if (ok) {
      playSuccess();
      setMsg(item.note);
      speak(item.note);
    } else {
      playMiss();
      const line = item.gentle;
      setMsg(line);
      speak(line);
    }
    setTimeout(() => {
      if (i + 1 >= queue.length) {
        onProgress({ ...progress, plays: progress.plays + 1 });
        setI(0);
        setMsg("Kitchen is sorted. New items coming.");
      } else {
        setI(i + 1);
      }
    }, 1600);
  }

  if (!item) return null;

  return (
    <GameFrame
      title="Kitchen Sort"
      as="ৰান্ধনি ঘৰ"
      onHome={onHome}
      hint="Local foods: bamboo shoot, pickle, rice, fish. Safety first."
    >
      <div className="kitchen">
        <div className="cell big">
          <TileArt kind={item.kind} size={120} />
          <strong>{item.title}</strong>
        </div>
        <p className="msg">{msg}</p>
        <div className="actions two">
          <button className="btn eat" onClick={() => sort("eat")}>
            Eat now
            <small>Safe / ready</small>
          </button>
          <button className="btn later" onClick={() => sort("later")}>
            Not now
            <small>Cook / danger</small>
          </button>
        </div>
      </div>
    </GameFrame>
  );
}
