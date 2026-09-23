import { useEffect, useState } from "react";
import { loadProgress, saveProgress } from "./progress.js";
import { warmSpeech, speak } from "./speech.js";
import TodaysStory from "./TodaysStory.jsx";
import MissingObject from "./MissingObject.jsx";
import MatchPair from "./MatchPair.jsx";
import Jukebox from "./Jukebox.jsx";
import KitchenSort from "./KitchenSort.jsx";
import { TileArt } from "./TileArt.jsx";

const GAMES = [
  {
    id: "story",
    title: "Today’s Story",
    as: "আজিৰ কাহিনী",
    focus: "Memory & recall",
    blurb: "3–5 daily scenes in time order — tea, tamul, jadoh, newspaper.",
    kind: "tea",
  },
  {
    id: "missing",
    title: "Find the Missing Object",
    as: "কোনো নাই?",
    focus: "Attention",
    blurb: "A grid of NER household things. One vanishes. Tap what is gone.",
    kind: "gamosa",
  },
  {
    id: "pair",
    title: "Match the Pair",
    as: "যুগল মিলন",
    focus: "Pattern recognition",
    blurb: "Bihu with pepa, Hornbill with headgear, matching Muga motifs.",
    kind: "muga",
  },
  {
    id: "jukebox",
    title: "Nostalgia Jukebox",
    as: "পুৰণি সুৰ",
    focus: "Emotional engagement",
    blurb: "Hear a folk clip. Tap Happy, Sad, Calm, or Nostalgic.",
    kind: "bihu",
  },
  {
    id: "kitchen",
    title: "Kitchen Sort",
    as: "ৰান্ধনি ঘৰ",
    focus: "Life skills & safety",
    blurb: "Eat now vs not now — bamboo shoot, pickle, raw fish, kerosene.",
    kind: "jadoh",
  },
];

export default function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [screen, setScreen] = useState("home");

  useEffect(() => {
    warmSpeech();
  }, []);

  function update(next) {
    setProgress(next);
    saveProgress(next);
  }

  function open(id) {
    setScreen(id);
    const g = GAMES.find((x) => x.id === id);
    if (g) speak(`${g.title}. ${g.as}`);
  }

  return (
    <div className="app">
      <div className="bg-pattern" aria-hidden />
      {screen === "home" ? (
        <Home progress={progress} onOpen={open} />
      ) : screen === "story" ? (
        <TodaysStory progress={progress} onProgress={update} onHome={() => setScreen("home")} />
      ) : screen === "missing" ? (
        <MissingObject progress={progress} onProgress={update} onHome={() => setScreen("home")} />
      ) : screen === "pair" ? (
        <MatchPair progress={progress} onProgress={update} onHome={() => setScreen("home")} />
      ) : screen === "jukebox" ? (
        <Jukebox progress={progress} onProgress={update} onHome={() => setScreen("home")} />
      ) : (
        <KitchenSort progress={progress} onProgress={update} onHome={() => setScreen("home")} />
      )}
    </div>
  );
}

function Home({ progress, onOpen }) {
  return (
    <main className="home">
      <header className="hero">
        <p className="kicker">North East India · Cognitive care</p>
        <h1>NER Smriti</h1>
        <p className="lead">
          Five gentle games for daily recall, attention, pattern sense, mood, and kitchen safety —
          with Assamese, Khasi, Naga, and Garo textures of home.
        </p>
        <p className="lang-row">
          <span>অসমীয়া</span>
          <span>Meiteilon</span>
          <span>Khasi</span>
          <span>English</span>
        </p>
      </header>
      <ul className="game-list">
        {GAMES.map((g) => (
          <li key={g.id}>
            <button className="game-card" onClick={() => onOpen(g.id)}>
              <TileArt kind={g.kind} size={76} />
              <div>
                <small>{g.focus}</small>
                <strong>{g.title}</strong>
                <em>{g.as}</em>
                <p>{g.blurb}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <p className="adapt">
        The app remembers how you play: shorter stories if you struggle, larger grids if you are
        quick, open cards when matching is hard, brighter folk tunes if sadness repeats.
        {progress.storyFamilyMode ? " Family-face mode is on for Today’s Story." : ""}
      </p>
    </main>
  );
}
