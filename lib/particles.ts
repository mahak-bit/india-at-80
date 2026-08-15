export type Point = { x: number; y: number };

/**
 * Renders arbitrary canvas content via `drawFn`, then samples every `step`
 * pixels where alpha > threshold. Used to turn text, an SVG path, or any
 * shape into a particle field for GSAP-scrubbed formation/dispersal.
 */
export function sampleCanvasAlpha(
  w: number,
  h: number,
  step: number,
  drawFn: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  threshold = 120
): Point[] {
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const ctx = off.getContext("2d");
  if (!ctx) return [];
  ctx.clearRect(0, 0, w, h);
  drawFn(ctx, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const pts: Point[] = [];
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const alpha = data[(y * w + x) * 4 + 3];
      if (alpha > threshold) pts.push({ x, y });
    }
  }
  return pts;
}

/**
 * India's silhouette, hand-simplified for an atmospheric particle mass —
 * NOT a surveyed or cartographically precise boundary, and deliberately
 * soft-edged rather than a hard bordered polygon so nothing here reads as
 * an authoritative political-boundary claim. Coordinates are in a 0–100
 * normalized box (scale to any canvas size).
 */
export const INDIA_SILHOUETTE_PATH = `
  M 51 2
  C 58 2 63 6 66 11
  C 70 10 75 12 76 17
  C 79 18 83 21 82 26
  C 88 28 90 33 87 38
  C 90 42 89 48 85 51
  C 88 55 86 60 82 61
  C 83 66 79 69 76 68
  C 76 73 72 76 69 75
  C 68 80 64 84 61 82
  C 60 87 57 93 54 92
  C 53 96 51 99 49 96
  C 47 92 47 87 49 84
  C 45 82 44 77 46 74
  C 42 71 41 65 44 62
  C 40 58 40 52 44 49
  C 41 45 42 39 46 37
  C 43 33 44 27 49 26
  C 47 21 48 15 52 14
  C 50 10 48 5 51 2
  Z
`;
