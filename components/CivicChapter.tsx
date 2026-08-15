"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";
import { civicMovements, type CivicMovement } from "@/lib/data";
import { INDIA_SILHOUETTE_PATH } from "@/lib/particles";

gsap.registerPlugin(ScrollTrigger);

function CivicIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".line"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, scrollTrigger: { trigger: el, start: "top 60%" } }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 bg-black px-6 py-16 text-center" ref={ref}>
      <p className="line caption text-ivory-dim">A functioning democracy argues with itself</p>
      <h2 className="line font-display text-[clamp(2.5rem,10vw,7rem)] leading-none text-ivory md:text-[clamp(2.8rem,6vw,5rem)]">
        When people say no.
      </h2>
    </div>
  );
}

function MovementPanel({ movement, onClose }: { movement: CivicMovement; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 md:items-center md:p-6" onClick={onClose}>
      <div
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-t-lg border border-line bg-near-black p-6 md:rounded-lg md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <span className="caption text-saffron">{movement.status}</span>
          <button onClick={onClose} aria-label="Close" className="caption text-ivory-dim hover:text-ivory">
            Close ✕
          </button>
        </div>
        <Field label="Location" value={movement.location} />
        <Field label="Date" value={movement.dateRange} />
        <Field label="Issue" value={movement.issue} />
        <Field label="Participants" value={movement.participants} />
        <Field label="Demands" value={movement.demands} />
        <Field label="Response" value={movement.response} />
        {movement.quote && (
          <blockquote className="mb-5 border-l-2 border-saffron pl-4">
            <p className="font-display text-lg italic text-ivory">&ldquo;{movement.quote.text}&rdquo;</p>
            <cite className="caption mt-1 block not-italic normal-case tracking-normal text-ivory-dim">
              — {movement.quote.attribution}
            </cite>
          </blockquote>
        )}
        <div className="mt-5">
          <p className="caption mb-2 text-ivory-dim">Sources</p>
          <ul className="space-y-1">
            {movement.sources.map((s) => (
              <li key={s.label} className="text-sm text-ivory-dim">
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline decoration-line hover:text-saffron">
                    {s.label}
                  </a>
                ) : (
                  s.label
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4">
      <p className="caption mb-1 text-ivory-dim">{label}</p>
      <p className="text-ivory">{value}</p>
    </div>
  );
}

function ProtestMap() {
  const [active, setActive] = useState<CivicMovement | null>(null);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-lg px-6 py-16 md:max-w-xl">
      <svg viewBox="0 0 100 100" className="h-full w-full text-ivory-dim/30" aria-hidden>
        <path d={INDIA_SILHOUETTE_PATH} fill="currentColor" />
      </svg>
      {civicMovements.map((m) => (
        <button
          key={m.id}
          onClick={() => setActive(m)}
          aria-label={`${m.location}, ${m.dateRange}: ${m.issue}`}
          style={{ left: `${m.mapPosition.x}%`, top: `${m.mapPosition.y}%` }}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
        >
          <span className="absolute inline-flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-saffron/50" />
          <span className="relative block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron ring-2 ring-midnight" />
        </button>
      ))}
      {active && <MovementPanel movement={active} onClose={() => setActive(null)} />}
    </div>
  );
}

export default function CivicChapter() {
  return (
    <section className="bg-black">
      <CivicIntro />
      <div className="border-t border-line px-6 pb-24 pt-4 md:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <span className="caption text-ivory-dim">Verified · dated · sourced</span>
          <p className="mt-3 text-ivory-dim">
            Six documented civic movements from independent India&rsquo;s history, spanning 1975 to 2026.
            Tap a point on the map for location, dates, stated demands, and the response that
            followed — with sources.
          </p>
        </div>
        <ProtestMap />
      </div>
    </section>
  );
}
