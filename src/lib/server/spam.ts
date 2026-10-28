import { headers } from "next/headers";

/** Hidden field real people never fill in. */
export const HONEYPOT_FIELD = "website";
/** Hidden timestamp set when the form appears in the browser. */
export const STARTED_FIELD = "startedAt";

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * Cheap bot checks: a filled honeypot, or a form submitted faster than a person
 * could type it. Callers pretend success so bots learn nothing.
 */
export function looksLikeSpam(raw: Record<string, unknown>) {
  const honeypot = raw[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  const started = Number(raw[STARTED_FIELD]);
  return Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS;
}

// Per-instance memory: enough to stop a burst from one client. On serverless
// hosts each instance has its own window; add Turnstile or an edge rate limit
// if abuse shows up.
const hits = new Map<string, number[]>();

export async function isRateLimited(scope: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}
