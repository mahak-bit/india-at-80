// ── ASSET MANIFEST ──────────────────────────────────────────────────
// Drop real, licensed photographs into /public/images/<category>/ and
// register each one below. Every visual chapter (Hero particles, the
// Archive Wall, the People Mosaic, the India map, the Culture chapter)
// reads from this manifest first. Any category left empty renders a
// generative/typographic treatment instead — never a stand-in stock
// photo and never an AI-generated "documentary" image. See the brief's
// own rule #7: if a verified image isn't available, use an abstract
// visualization, not a fake one.
//
// Suggested real sources for historical material: Wikimedia Commons,
// the National Archives of India, the Press Information Bureau photo
// division, and state archive/museum collections that permit reuse.
// Always keep the license and source fields honest — they render in
// the Credits section.

export type ImageCategory =
  | "history"
  | "people"
  | "culture"
  | "architecture"
  | "landscapes"
  | "protests"
  | "cities"
  | "future"
  | "textures"
  | "maps";

export type ManifestImage = {
  src: string; // path under /public, e.g. "/images/history/1947-flag.jpg"
  category: ImageCategory;
  year?: number;
  caption: string;
  source: string;
  license: string;
};

export const assetManifest: ManifestImage[] = [
  // Order matches GenZChapter.tsx's SHOT_LIST exactly — that component
  // indexes imagesFor("protests") positionally against its five captions.
  {
    src: "/images/protests/cjp-crowd-india-gate.jpg",
    category: "protests",
    year: 2026,
    caption: "CJP demonstrators at India Gate, signs reading \"CJP Chalo Sansad\"",
    source: "Provided by site owner",
    license: "Unverified — confirm rights before public deployment",
  },
  {
    src: "/images/protests/wangchuk-hunger-strike.jpg",
    category: "protests",
    year: 2026,
    caption: "Sonam Wangchuk during the hunger strike",
    source: "Provided by site owner",
    license: "Unverified — confirm rights before public deployment",
  },
  {
    src: "/images/protests/march-to-parliament.jpg",
    category: "protests",
    year: 2026,
    caption: "Ground scene from the Delhi agitation",
    source: "Provided by site owner",
    license: "Unverified — confirm rights before public deployment",
  },
  {
    src: "/images/protests/police-tear-gas.jpg",
    category: "protests",
    year: 2026,
    caption: "Police tear-gas response during the Delhi agitation",
    source: "Provided by site owner",
    license: "Unverified — confirm rights before public deployment",
  },
  {
    src: "/images/protests/pradhan-resigns.jpg",
    category: "protests",
    year: 2026,
    caption: "Dharmendra Pradhan resigns as Union Education Minister, 25 July 2026",
    source: "Provided by site owner",
    license: "Unverified — confirm rights before public deployment",
  },
];

export function imagesFor(category: ImageCategory): ManifestImage[] {
  return assetManifest.filter((img) => img.category === category);
}

export function hasImages(category: ImageCategory): boolean {
  return imagesFor(category).length > 0;
}

// ── VIDEO MANIFEST ──────────────────────────────────────────────────
// Same rule as photos: real, licensed, sourced footage only, registered
// here. Drop files into /public/videos/ (mp4, ideally with a poster
// frame image already in assetManifest above for the loading state).

export type ManifestVideo = {
  src: string; // path under /public, e.g. "/videos/protests/jantar-mantar.mp4"
  category: ImageCategory;
  caption: string;
  source: string;
  license: string;
};

// Empty by default — same "no photography" rule applies to video.
export const videoManifest: ManifestVideo[] = [
  // {
  //   src: "/videos/protests/cjp-2026-jantar-mantar.mp4",
  //   category: "protests",
  //   caption: "Students gather at Jantar Mantar, July 2026",
  //   source: "Wire-service footage, licensed",
  //   license: "Licensed for this use",
  // },
];

export function videosFor(category: ImageCategory): ManifestVideo[] {
  return videoManifest.filter((v) => v.category === category);
}
