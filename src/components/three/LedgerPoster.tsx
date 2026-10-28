import { cn } from "@/lib/cn";

const COLS = 9;
const ROWS = 5;
const W = 1600;
const H = 900;

/**
 * Static SVG version of the ledger grid. Shown before WebGL loads, and
 * instead of it for reduced motion or devices without WebGL.
 */
export function LedgerPoster({ className }: { className?: string }) {
  const cellW = W / COLS;
  const cellH = H / ROWS;
  const bw = cellW * 0.52;
  const bh = cellH * 0.38;

  const blocks = Array.from({ length: ROWS * COLS }, (_, i) => {
    const r = Math.floor(i / COLS);
    const c = i % COLS;
    return { x: (c + 0.5 + (r % 2) * 0.5) * cellW - cellW * 0.25, y: (r + 0.5) * cellH, r, c };
  });

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 size-full", className)}
    >
      <g stroke="#829187" strokeOpacity="0.16" strokeWidth="1">
        {blocks.map((b) =>
          b.c < COLS - 1 ? (
            <line key={`h${b.r}-${b.c}`} x1={b.x + bw / 2} y1={b.y} x2={b.x + cellW - bw / 2} y2={b.y} />
          ) : null,
        )}
      </g>
      <g fill="none" stroke="#829187" strokeOpacity="0.32" strokeWidth="1.25" strokeDasharray="1.5 5" strokeLinecap="round">
        {blocks.map((b) => (
          <rect key={`b${b.r}-${b.c}`} x={b.x - bw / 2} y={b.y - bh / 2} width={bw} height={bh} rx="3" />
        ))}
      </g>
      {/* A single verified block, so the poster still says something */}
      <rect
        x={blocks[23].x - bw / 2}
        y={blocks[23].y - bh / 2}
        width={bw}
        height={bh}
        rx="3"
        fill="none"
        stroke="#19b58a"
        strokeOpacity="0.7"
        strokeWidth="1.25"
        strokeDasharray="1.5 5"
        strokeLinecap="round"
      />
    </svg>
  );
}
