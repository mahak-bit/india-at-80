"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/motion";
import { civicMovements } from "@/lib/data";
import { imagesFor, videosFor } from "@/lib/assets";

gsap.registerPlugin(ScrollTrigger);

const movement = civicMovements.find((m) => m.id === "cjp-2026")!;

// Five moments worth a real photograph, in order. Drop files into
// /public/images/protests/ and register them in lib/assets.ts with these
// captions (or close to them) — this grid renders whichever of the five
// are actually present, generative placeholders for the rest.
const SHOT_LIST = [
  "Crowd at Jantar Mantar, banners and CJP signage visible",
  "Sonam Wangchuk during the hunger strike",
  "Students marching toward Parliament",
  "Police response — baton charge / tear gas, documentary, not staged",
  "Celebration or reaction after Pradhan's resignation, 25 July 2026",
];

export default function GenZChapter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const images = imagesFor("protests");
  const videos = videosFor("protests");
  const video = videos[0];
  const poster = images.find((img) => img.src === video?.src.replace(/\.\w+$/, ".jpg"));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".reveal"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          scrollTrigger: { trigger: section, start: "top 65%" },
        }
      );
      gsap.fromTo(
        section.querySelectorAll(".shot-tile"),
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          scrollTrigger: { trigger: ".shot-grid", start: "top 80%" },
        }
      );
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-6 py-28 md:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,119,34,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl text-center">
        <span className="reveal caption text-saffron">{movement.dateRange} &middot; {movement.location}</span>
        <h2 className="reveal font-display mt-6 text-[clamp(3rem,13vw,9rem)] leading-[0.95] text-ivory md:text-[clamp(3rem,6.5vw,6rem)]">
          Don&rsquo;t worry.
        </h2>
        <h2 className="reveal font-display text-[clamp(3rem,13vw,9rem)] leading-[0.95] text-saffron md:text-[clamp(3rem,6.5vw,6rem)]">
          Gen Z will remember.
        </h2>

        <div className="reveal relative mx-auto mt-10 w-64 -rotate-2 overflow-hidden rounded-sm border-4 border-ivory bg-ivory shadow-2xl md:w-80">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src="/images/protests/genz-se-behes-sign.jpg"
              alt="Protester holding a sign: Gen-Z se behes, zindagi tehes nehes"
              fill
              className="object-cover"
              sizes="320px"
            />
          </div>
        </div>
        <p className="caption mt-3 text-ivory-dim/70">&ldquo;Gen-Z se behes, zindagi tehes nehes&rdquo;</p>

        <p className="reveal mt-8 text-lg text-ivory-dim md:text-xl">{movement.issue}</p>

        {movement.quote && (
          <blockquote className="reveal mx-auto mt-8 max-w-xl border-l-2 border-saffron pl-5 text-left">
            <p className="font-display text-xl italic text-ivory md:text-2xl">
              &ldquo;{movement.quote.text}&rdquo;
            </p>
            <cite className="caption mt-2 block not-italic normal-case tracking-normal text-ivory-dim">
              — {movement.quote.attribution}
            </cite>
          </blockquote>
        )}

        <p className="reveal mt-8 text-ivory-dim">{movement.response}</p>
      </div>

      {video && (
        <div className="reveal relative mx-auto mt-16 aspect-video w-full max-w-4xl overflow-hidden rounded-sm border border-line">
          <video
            src={video.src}
            poster={poster?.src}
            controls
            playsInline
            className="h-full w-full object-cover"
            aria-label={video.caption}
          />
        </div>
      )}

      <div
        dir="rtl"
        className="shot-grid relative mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-5 md:gap-4"
      >{/* rtl: first shot in SHOT_LIST renders in the rightmost tile */}
        {SHOT_LIST.map((caption, i) => {
          const real = images[i];
          return (
            <div
              key={i}
              dir="ltr"
              className={`shot-tile relative aspect-[3/4] overflow-hidden rounded-sm border border-line ${
                reduced ? "" : "opacity-0"
              }`}
            >
              {real ? (
                <Image src={real.src} alt={real.caption} fill className="object-cover" sizes="220px" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a2410] to-[#120a05] p-2">
                  <p className="caption text-center text-[0.55rem] normal-case leading-snug tracking-normal text-ivory-dim/60">
                    {caption}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="reveal caption relative mx-auto mt-10 max-w-lg text-center text-ivory-dim/60">
        {movement.sources.length} sources, linked in the civic chapter above.
      </p>
    </section>
  );
}
