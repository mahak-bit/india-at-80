"use client";

import { useState } from "react";

export default function Nav() {
  // No ambient audio file ships with this build (see lib/assets.ts note on
  // why no placeholder media is faked). This toggle is wired and ready —
  // point it at a real <audio> element once a licensed ambient track
  // (paper / wind / crowd / train, per the brief's sound section) is added.
  const [soundOn, setSoundOn] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-4 mix-blend-difference md:px-10">
      <span className="font-display text-lg text-ivory">80</span>
      <button
        onClick={() => setSoundOn((v) => !v)}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Mute ambient sound" : "Unmute ambient sound"}
        className="caption text-ivory"
      >
        Sound: {soundOn ? "On" : "Off"}
      </button>
    </nav>
  );
}
