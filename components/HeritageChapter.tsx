"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// Drop photos into /public/images/culture/ using these exact filenames
// and they appear automatically — no code changes needed.
const SLOTS = [
  { slug: "heritage-1", caption: "Sweets & street food", aspect: "aspect-[3/4]", offset: "", objectPosition: "center 25%" },
  { slug: "heritage-2", caption: "Cinema & fashion", aspect: "aspect-[4/5]", offset: "sm:mt-20" },
  { slug: "heritage-3", caption: "Everyday travel", aspect: "aspect-[4/5]", offset: "sm:-mt-10" },
  { slug: "heritage-4", caption: "Village life", aspect: "aspect-[3/4]", offset: "sm:mt-6" },
];

function Tile({
  slug,
  caption,
  aspect,
  offset,
  objectPosition,
}: {
  slug: string;
  caption: string;
  aspect: string;
  offset: string;
  objectPosition?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`tile relative ${aspect} ${offset} overflow-hidden rounded-sm border border-line shadow-2xl`}>
      {!failed && (
        <Image
          src={`/images/culture/${slug}.jpg`}
          alt={caption}
          fill
          sizes="(min-width: 640px) 45vw, 90vw"
          quality={90}
          style={objectPosition ? { objectPosition } : undefined}
          className={`object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
      {(failed || !loaded) && (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3a2410] to-[#120a05] p-2">
          <p className="caption text-center text-[0.6rem] normal-case leading-snug tracking-normal text-ivory-dim/60">
            {caption} — awaiting photograph
          </p>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <p className="caption text-[0.6rem] normal-case tracking-normal text-ivory-dim">{caption}</p>
      </div>
    </div>
  );
}

export default function HeritageChapter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".tile"),
        { opacity: 0, y: 80, rotateZ: () => gsap.utils.random(-5, 5), scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          stagger: { each: 0.15, from: "random" },
          scrollTrigger: { trigger: section, start: "top 75%" },
        }
      );
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="bg-near-black px-6 py-28 md:px-12">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <span className="caption text-gold">Not just history — inheritance</span>
        <h2 className="font-display mt-3 text-4xl leading-tight text-ivory md:text-5xl">
          The beauty of India.
        </h2>
      </div>
      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10">
        {SLOTS.map((s) => (
          <Tile
            key={s.slug}
            slug={s.slug}
            caption={s.caption}
            aspect={s.aspect}
            offset={s.offset}
            objectPosition={s.objectPosition}
          />
        ))}
      </div>
    </section>
  );
}
