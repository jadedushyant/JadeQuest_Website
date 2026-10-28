"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { sendInquiry } from "@/app/actions/inquiry";
import { ArrowIcon, Button } from "@/components/ui";
import { company, services } from "@/content";
import { BUDGETS, inquirySchema, type Inquiry } from "@/lib/forms/inquiry";
import { cn } from "@/lib/cn";

const fieldBase =
  "peer w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 text-base text-[var(--fg)] outline-none placeholder:text-[var(--fg-subtle)] focus:ring-0";

/** Underline that draws in jade when the field above it has focus. */
const Focusline = () => (
  <span
    aria-hidden
    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-jade transition-transform duration-500 ease-[var(--ease-expo-out)] peer-focus:scale-x-100"
  />
);

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-[var(--fg-muted)]">{label}</span>
      <span className="relative block">{children}</span>
      {error && (
        <span role="alert" className="text-sm text-[#f0a58a]">
          {error}
        </span>
      )}
    </label>
  );
}

export function InquiryForm() {
  const id = useId();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<"sent" | "unavailable" | null>(null);
  // Spam checks: a hidden field people never fill, and when the form appeared.
  const honeypotRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inquiry>({ resolver: zodResolver(inquirySchema), defaultValues: { service: "" } });

  const budget = watch("budget");

  const onSubmit = (data: Inquiry) =>
    startTransition(async () => {
      const res = await sendInquiry({ ...data, website: honeypotRef.current?.value ?? "", startedAt: startedAt.current });
      setResult(res.ok ? "sent" : "unavailable");
    });

  if (result === "sent") {
    return (
      <div role="status" className="flex flex-col gap-4 rounded-card border border-line bg-surface p-8">
        <span className="flex size-10 items-center justify-center rounded-full bg-jade text-forest" aria-hidden>
          ✓
        </span>
        <p className="font-display text-h3 font-semibold">Thanks, it&apos;s with us.</p>
        <p className="text-[var(--fg-muted)]">One of our engineers will get back to you by email.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-7">
      <input ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Your name" error={errors.name?.message}>
          <input {...register("name")} autoComplete="name" className={fieldBase} aria-invalid={!!errors.name} />
          <Focusline />
        </Field>
        <Field label="Work email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className={fieldBase}
            aria-invalid={!!errors.email}
          />
          <Focusline />
        </Field>
      </div>

      <Field label="What do you need?" error={errors.service?.message}>
        <select {...register("service")} className={cn(fieldBase, "appearance-none")} aria-invalid={!!errors.service}>
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title} className="bg-surface">
              {s.title}
            </option>
          ))}
          <option value="Something else" className="bg-surface">
            Something else
          </option>
        </select>
        <Focusline />
      </Field>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm text-[var(--fg-muted)]">Rough budget (optional)</legend>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <label key={b} className="cursor-pointer">
              <input
                type="radio"
                name={`${id}-budget`}
                value={b}
                checked={budget === b}
                onChange={() => setValue("budget", b)}
                className="peer sr-only"
              />
              <span className="inline-flex h-9 items-center rounded-button border border-line px-3 text-sm text-mist transition-colors peer-checked:border-jade peer-checked:bg-jade peer-checked:text-forest peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-jade hover:border-mist">
                {b}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Tell us about the project" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={4}
          className={cn(fieldBase, "resize-none")}
          aria-invalid={!!errors.message}
        />
        <Focusline />
      </Field>

      {result === "unavailable" && (
        <p role="alert" className="text-sm text-[var(--fg-muted)]">
          We couldn&apos;t send this from the site right now. Please email{" "}
          <a href={`mailto:${company.contact.email}`} className="text-jade underline underline-offset-4">
            {company.contact.email}
          </a>{" "}
          instead.
        </p>
      )}

      <Button type="submit" size="lg" icon={<ArrowIcon />} disabled={pending} className="self-start disabled:opacity-60">
        {pending ? "Sending…" : "Send inquiry"}
      </Button>
    </form>
  );
}
