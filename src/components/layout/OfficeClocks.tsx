"use client";

import { useEffect, useState } from "react";
import { company } from "@/content";

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" }).format(new Date());
}

/** Local time in each office. Rendered as "--:--" on the server to avoid a hydration mismatch. */
export function OfficeClocks({ className }: { className?: string }) {
  const [times, setTimes] = useState<string[] | null>(null);

  useEffect(() => {
    const tick = () => setTimes(company.offices.map((o) => formatTime(o.timeZone)));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <ul className={className}>
      {company.offices.map((office, i) => (
        <li key={office.code} className="flex items-baseline justify-between gap-6">
          <span>{office.country}</span>
          <time className="font-mono text-xs text-[var(--fg-subtle)] tabular-nums">{times?.[i] ?? "--:--"}</time>
        </li>
      ))}
    </ul>
  );
}
