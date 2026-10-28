"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const InquiryForm = dynamic(() => import("./InquiryForm").then((m) => m.InquiryForm), {
  ssr: false,
  loading: () => <FormPlaceholder />,
});

function FormPlaceholder() {
  return <div aria-hidden className="min-h-[34rem] rounded-card border border-dashed border-[var(--line)]" />;
}

/**
 * Loads the form code (react-hook-form + zod) only when the form is about to
 * scroll into view, keeping it out of the home page's first load.
 */
export function LazyInquiryForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{show ? <InquiryForm /> : <FormPlaceholder />}</div>;
}
