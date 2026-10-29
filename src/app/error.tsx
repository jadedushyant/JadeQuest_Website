"use client";

import { useEffect } from "react";
import { Button, Container } from "@/components/ui";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-6">
      <Container className="max-w-xl text-center flex flex-col items-center gap-6 p-10 rounded-card border border-line bg-surface">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
          <AlertCircle className="w-7 h-7" />
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-cyan font-bold">
          System Interruption
        </span>

        <h1 className="font-display text-2xl md:text-3xl font-semibold text-paper">
          An unexpected execution error occurred
        </h1>

        <p className="text-sm text-mist leading-relaxed">
          The requested view encountered a runtime error. Our observability pipeline has captured the exception digest. You may retry the action or return to the home screen.
        </p>

        {error.digest && (
          <div className="p-3 rounded bg-surface-raised border border-line/60 font-mono text-[11px] text-subtle">
            Digest: {error.digest}
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center mt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button bg-cyan text-forest font-semibold text-sm hover:bg-cyan/90 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>
          <Button href="/" variant="ghost" size="md">
            <Home className="w-4 h-4 mr-2" />
            <span>Return to Homepage</span>
          </Button>
        </div>
      </Container>
    </div>
  );
}

