"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/motion";
import { timeline } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Drop a photo per entry into /public/images/timeline/<slug>.jpg using
// these exact filenames and it appears automatically as the card's
// full-bleed background — nothing to register elsewhere. Keyed by title
// since two entries share the year "2026".
const TIMELINE_SLUGS: Record<string, string> = {
  Independence: "1947-independence",
  "The Constitution": "1950-constitution",
  "First general election": "1951-52-first-election",
  "Green Revolution": "1966-70s-green-revolution",
  "The Emergency": "1975-77-emergency",
  "Economic liberalisation": "1991-liberalisation",
  "The IT decade": "2000s-it-decade",
  "UPI launches": "2016-upi-launch",
  "CAA–NRC protests": "2019-20-caa-nrc",
  "COVID-19 lockdown": "2020-covid-lockdown",
  "Farmers' protests": "2020-21-farmers-protests",
  "Chandrayaan-3": "2023-chandrayaan-3",
  "The 'Cockroach' protests": "2026-cockroach-protests",
  "India at 80": "2026-india-at-80",
};

export default function HistoryTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || reduced) return;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      return () => tween.kill();
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) {
    return (
      <section className="bg-near-black px-6 py-24">
        <h2 className="caption mb-10 text-gold">1947 — 2026</h2>
        <div className="flex flex-col gap-10">
          {timeline.map((t) => (
            <TimelineCard key={`${t.year}-${t.title}`} entry={t} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-near-black">
      <div className="absolute left-6 top-8 z-10 md:left-12 md:top-12">
        <span className="caption text-gold">A timeline, not a verdict</span>
      </div>
      <div ref={trackRef} className="flex h-full w-max items-center gap-6 px-[8vw] will-change-transform md:gap-12">
        {timeline.map((t) => (
          <TimelineCard key={`${t.year}-${t.title}`} entry={t} wide />
        ))}
      </div>
    </section>
  );
}

function TimelineCard({
  entry,
  wide,
}: {
  entry: (typeof timeline)[number];
  wide?: boolean;
}) {
  const slug = TIMELINE_SLUGS[entry.title];
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showPhoto = Boolean(slug) && !failed;

  if (wide) {
    return (
      <div
        className={`relative flex h-[62vh] w-[76vw] shrink-0 flex-col justify-end overflow-hidden border-l border-line md:w-[38vw] lg:w-[30vw]`}
      >
        {showPhoto && (
          <>
            <Image
              src={`/images/timeline/${slug}.jpg`}
              alt={entry.title}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 38vw, 76vw"
              quality={90}
              className={`object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/55 to-transparent" />
          </>
        )}
        <div className="relative pl-5 pb-6">
          <span className="font-display text-5xl text-saffron md:text-6xl">{entry.year}</span>
          <h3 className="font-display mt-2 text-2xl text-ivory md:text-3xl">{entry.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory-dim">{entry.body}</p>
          <p className="caption mt-4 normal-case tracking-normal text-ivory-dim/70">
            Source: {entry.source}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col border-l border-line pl-5">
      {showPhoto && (
        <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-sm border border-line">
          <Image
            src={`/images/timeline/${slug}.jpg`}
            alt={entry.title}
            fill
            sizes="100vw"
            quality={90}
            className={`object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        </div>
      )}
      <span className="font-display text-5xl text-saffron md:text-6xl">{entry.year}</span>
      <h3 className="font-display mt-2 text-2xl text-ivory md:text-3xl">{entry.title}</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory-dim">{entry.body}</p>
      <p className="caption mt-4 normal-case tracking-normal text-ivory-dim/70">
        Source: {entry.source}
      </p>
    </div>
  );
}
