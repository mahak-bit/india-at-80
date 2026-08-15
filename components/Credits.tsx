export default function Credits() {
  return (
    <footer className="chapter-rule bg-black px-6 py-16 md:px-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl text-ivory">India at 80</h3>
          <p className="mt-3 max-w-xs text-sm text-ivory-dim">
            An independent, non-commissioned digital exhibition marking 80 years since independence.
            Not affiliated with any government body or political party.
          </p>
        </div>
        <div>
          <p className="caption mb-3 text-ivory-dim">Sources & method</p>
          <p className="text-sm text-ivory-dim">
            Historical dates and figures are drawn from public records — parliamentary and court
            documents, national archives, and wire-service reporting — cited inline in the History
            and Civic chapters. Photography is intentionally absent from this build; every visual is
            generative or typographic. See the asset manifest for how to add real, licensed images.
          </p>
        </div>
        <div>
          <p className="caption mb-3 text-ivory-dim">Corrections</p>
          <p className="text-sm text-ivory-dim">
            If a date, figure, or characterisation here is wrong or missing context, it should be
            fixed — this file is meant to be edited, not treated as a finished record.
          </p>
        </div>
      </div>
      <p className="caption mt-14 text-ivory-dim/60">
        Built as one continuous scroll narrative · GSAP ScrollTrigger + Lenis · No AI-generated
        imagery presented as documentary fact
      </p>
    </footer>
  );
}
