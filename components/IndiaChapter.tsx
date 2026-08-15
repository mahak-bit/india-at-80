"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";
import { regions } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

// Drop a photo per region into /public/images/regions/<slug>.jpg using
// these exact filenames and it appears automatically, full-screen, during
// that region's beat — nothing to register elsewhere.
const REGION_SLUGS: Record<string, string> = {
  North: "north",
  South: "south",
  East: "east",
  West: "west",
  Northeast: "northeast",
  "Central India": "central-india",
  Islands: "islands",
};

const REGION_START = 12;
const REGION_GAP = 7;

export default function IndiaChapter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);

  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const regionKeys = Object.keys(REGION_SLUGS);
    const state = { regionIdx: -1 };

    function renderRegion(idx: number) {
      if (idx < 0) {
        if (labelRef.current) labelRef.current.textContent = "";
        if (noteRef.current) noteRef.current.textContent = "";
        if (photoWrapRef.current) photoWrapRef.current.style.opacity = "0";
        return;
      }
      const key = regionKeys[idx];
      const data = regions.find((r) => r.name === key);
      if (labelRef.current) labelRef.current.textContent = key;
      if (noteRef.current) noteRef.current.textContent = data?.note ?? "";
      if (photoRef.current && photoWrapRef.current) {
        const img = photoRef.current;
        const wrap = photoWrapRef.current;
        wrap.style.opacity = "0";
        img.onload = () => {
          wrap.style.opacity = "1";
        };
        img.onerror = () => {
          wrap.style.opacity = "0";
        };
        img.src = `/images/regions/${REGION_SLUGS[key]}.jpg`;
        img.alt = `${key} — India`;
      }
    }

    if (reduced) {
      gsap.set(titleRef.current, { opacity: 1 });
      renderRegion(0);
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=380%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(titleRef.current, { opacity: 1, duration: 5 }, 0).to(
      titleRef.current,
      { opacity: 0, duration: 3 },
      8
    );

    regionKeys.forEach((_, i) => {
      const start = REGION_START + i * REGION_GAP;
      tl.to(state, { regionIdx: i, duration: 0.01, onStart: () => renderRegion(i) }, start);
    });
    tl.to(
      state,
      { regionIdx: -1, duration: 0.01, onStart: () => renderRegion(-1) },
      REGION_START + regionKeys.length * REGION_GAP + 3
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-midnight">
      <div ref={photoWrapRef} className="absolute inset-0 opacity-0 transition-opacity duration-700 ease-out">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={photoRef} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/30 to-midnight/10" />
      </div>

      <div ref={titleRef} className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0">
        <span className="caption text-gold">Not one image</span>
        <h2 className="font-display text-[clamp(3rem,13vw,10rem)] leading-none tracking-tightest text-ivory md:text-[clamp(4rem,9vw,8rem)]">
          India
        </h2>
      </div>

      <div className="pointer-events-none absolute bottom-14 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 px-6 text-center">
        <div ref={labelRef} className="font-display text-4xl text-ivory md:text-5xl" />
        <p ref={noteRef} className="caption max-w-md normal-case tracking-normal text-ivory-dim" />
      </div>
    </section>
  );
}
