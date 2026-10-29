export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-6"
    >
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-line" />
        <div className="absolute inset-0 rounded-full border-2 border-cyan border-t-transparent animate-spin" />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-subtle">
        Loading Sovereign Ledger…
      </span>
    </div>
  );
}

