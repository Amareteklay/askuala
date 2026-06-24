"use client";

import { useState } from "react";

const EMOJIS = ["⭐", "🍎", "🐶", "🌸", "🐠"];

function randomTarget() {
  return Math.floor(Math.random() * 8) + 3; // 3–10
}

function randomEmoji() {
  return EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
}

export default function CountingGame() {
  const [target, setTarget] = useState(randomTarget);
  const [emoji, setEmoji] = useState(randomEmoji);
  const [count, setCount] = useState(0);
  const [won, setWon] = useState(false);

  function tap() {
    if (won) return;
    const next = count + 1;
    setCount(next);
    if (next === target) setWon(true);
  }

  function newRound() {
    setTarget(randomTarget());
    setEmoji(randomEmoji());
    setCount(0);
    setWon(false);
  }

  return (
    <div className="rounded-2xl border-4 border-rose-300 bg-white p-6 text-center shadow-sm">
      <p className="font-[var(--font-caveat)] text-3xl font-bold text-rose-600">
        Tap {target} {emoji}!
      </p>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {Array.from({ length: target }).map((_, i) => (
          <button
            key={i}
            onClick={tap}
            disabled={i < count ? false : i > count}
            className={`flex h-16 w-16 items-center justify-center rounded-full text-3xl transition ${
              i < count
                ? "scale-110 bg-rose-100"
                : "bg-neutral-50 hover:bg-rose-50 active:scale-95"
            }`}
            aria-label={`tap ${emoji} number ${i + 1}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      <p className="mt-5 text-xl font-semibold text-neutral-600">
        {won ? "🎉 You counted them all!" : `${count} / ${target}`}
      </p>

      <button
        onClick={newRound}
        className="mt-4 rounded-full bg-rose-500 px-6 py-2 text-sm font-semibold text-white"
      >
        New round
      </button>
    </div>
  );
}
