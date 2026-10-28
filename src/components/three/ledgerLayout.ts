/**
 * Geometry for the "Living Ledger" hero. Two layouts share one vertex order:
 *  - rest: a staggered grid of blocks (rectangles of particles) chained by links
 *  - target: a Merkle tree, where blocks shrink into nodes and links become edges
 * The shader mixes between them with `uBurst`.
 */

export type LedgerLayout = {
  points: Float32Array;
  pointTargets: Float32Array;
  pointRandom: Float32Array;
  lines: Float32Array;
  lineTargets: Float32Array;
  lineRandom: Float32Array;
};

type Options = {
  width: number;
  height: number;
  cols: number;
  rows: number;
  perBlock: number;
  dust: number;
  seed?: number;
};

// Small deterministic PRNG so the layout is stable between renders.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TREE_LEVELS = 5; // 16 leaves → 31 nodes, 30 edges

function treeNodes(width: number, height: number) {
  const nodes: [number, number][] = [];
  const treeW = width * 0.62;
  const treeH = height * 0.62;
  for (let level = 0; level < TREE_LEVELS; level++) {
    const count = 2 ** level;
    for (let i = 0; i < count; i++) {
      nodes.push([(i + 0.5) / count * treeW - treeW / 2 + width * 0.12, treeH / 2 - (level / (TREE_LEVELS - 1)) * treeH]);
    }
  }
  return nodes;
}

/** Point on the perimeter of a w×h rectangle, t in [0, 1). */
function perimeter(t: number, w: number, h: number): [number, number] {
  const p = 2 * (w + h);
  let d = t * p;
  if (d < w) return [d - w / 2, -h / 2];
  d -= w;
  if (d < h) return [w / 2, d - h / 2];
  d -= h;
  if (d < w) return [w / 2 - d, h / 2];
  d -= w;
  return [-w / 2, h / 2 - d];
}

export function buildLedger({ width, height, cols, rows, perBlock, dust, seed = 7 }: Options): LedgerLayout {
  const rand = mulberry32(seed);
  const nodes = treeNodes(width, height);
  const nodeSize = Math.min(width, height) * 0.035;

  const cellW = width / cols;
  const cellH = height / rows;
  const blockW = cellW * 0.52;
  const blockH = cellH * 0.38;

  type Block = { x: number; y: number; z: number };
  const blocks: Block[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Odd rows shift half a cell: reads as a chain rather than a spreadsheet.
      const x = (c + 0.5 + (r % 2) * 0.5) * cellW - width / 2 - cellW * 0.25;
      const y = height / 2 - (r + 0.5) * cellH;
      blocks.push({ x, y, z: (rand() - 0.6) * 1.6 });
    }
  }

  const pointCount = blocks.length * perBlock + dust;
  const points = new Float32Array(pointCount * 3);
  const pointTargets = new Float32Array(pointCount * 3);
  const pointRandom = new Float32Array(pointCount);

  let i = 0;
  blocks.forEach((b, bi) => {
    const [nx, ny] = nodes[bi % nodes.length];
    for (let k = 0; k < perBlock; k++, i++) {
      const t = (k + rand() * 0.4) / perBlock;
      const [ox, oy] = perimeter(t, blockW, blockH);
      points.set([b.x + ox, b.y + oy, b.z], i * 3);
      const [tx, ty] = perimeter(t, nodeSize * 2.2, nodeSize * 1.4);
      pointTargets.set([nx + tx, ny + ty, 0], i * 3);
      pointRandom[i] = rand();
    }
  });

  // Loose particles fill the space and gather around the tree on burst.
  for (let d = 0; d < dust; d++, i++) {
    points.set([(rand() - 0.5) * width * 1.1, (rand() - 0.5) * height * 1.1, (rand() - 0.7) * 3], i * 3);
    const [nx, ny] = nodes[Math.floor(rand() * nodes.length)];
    const a = rand() * Math.PI * 2;
    const rr = nodeSize * (1.6 + rand() * 2.5);
    pointTargets.set([nx + Math.cos(a) * rr, ny + Math.sin(a) * rr, (rand() - 0.5) * 0.5], i * 3);
    pointRandom[i] = rand();
  }

  // Links: right neighbour on the same row, and down to the next row.
  const segs: [Block, Block][] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const b = blocks[r * cols + c];
      if (c < cols - 1) segs.push([b, blocks[r * cols + c + 1]]);
      if (r < rows - 1 && rand() > 0.45) segs.push([b, blocks[(r + 1) * cols + c]]);
    }
  }

  const lines = new Float32Array(segs.length * 6);
  const lineTargets = new Float32Array(segs.length * 6);
  const lineRandom = new Float32Array(segs.length * 2);
  segs.forEach(([a, b], s) => {
    const horizontal = Math.abs(a.y - b.y) < 1e-3;
    const ax = horizontal ? a.x + blockW / 2 : a.x;
    const ay = horizontal ? a.y : a.y - blockH / 2;
    const bx = horizontal ? b.x - blockW / 2 : b.x;
    const by = horizontal ? b.y : b.y + blockH / 2;
    lines.set([ax, ay, a.z, bx, by, b.z], s * 6);

    const child = (s % (nodes.length - 1)) + 1;
    const parent = (child - 1) >> 1;
    lineTargets.set([...nodes[parent], 0, ...nodes[child], 0], s * 6);
    const r = rand();
    lineRandom[s * 2] = r;
    lineRandom[s * 2 + 1] = r;
  });

  return { points, pointTargets, pointRandom, lines, lineTargets, lineRandom };
}
