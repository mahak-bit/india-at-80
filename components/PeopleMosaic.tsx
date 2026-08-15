"use client";

import ParticleText from "./ParticleText";

const PALETTE = ["#f3ecdf", "#c9a24b", "#ff7722", "#9a8264", "#cfc6b4"];

export default function PeopleMosaic() {
  return (
    <ParticleText
      introLine="Independence was never just a date."
      word="INDIA"
      palette={PALETTE}
      baseBudget={2400}
      bg="bg-near-black"
    />
  );
}
