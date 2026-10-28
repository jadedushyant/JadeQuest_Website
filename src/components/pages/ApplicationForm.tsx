"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitApplication, type ApplyState } from "@/app/actions/apply";
import { ArrowIcon, Button } from "@/components/ui";
import { company } from "@/content";
import { cn } from "@/lib/cn";

const input =
  "w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-3 text-base text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]";

const EXPERIENCE = ["0–2 years", "3–5 years", "6–9 years", "10+ years"];

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-[var(--fg-muted)]">
        {label}
        {optional && <span className="text-[var(--fg-subtle)]"> (optional)</span>}
      </span>
      {children}
      {error && (
        <span id={`${name}-error`} role="alert" className="text-sm text-[#a3471f]">
          {error}
        </span>
      )}
    </label>
  );
}

/** Careers application. Works without JavaScript; the server validates every field. */
export function ApplicationForm() {
  const [state, action, pending] = useActionState<ApplyState, FormData>(submitApplication, { status: "idle" });
  const errors = state.status === "invalid" ? state.errors : {};
  // Spam check: when the form appeared (filled in after hydration).
  const startedRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);
  const err = (name: string) => ({
    "aria-invalid": !!errors[name] || undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  if (state.status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-card border border-[var(--line)] bg-[var(--card)] p-8">
        <p className="font-display text-h3 font-semibold">Application received.</p>
        <p className="text-[var(--fg-muted)]">Thanks for applying. We&apos;ll be in touch by email if there&apos;s a fit.</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-7" encType="multipart/form-data">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Full name" name="name" error={errors.name}>
          <input name="name" required autoComplete="name" className={input} {...err("name")} />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <input name="email" type="email" required autoComplete="email" className={input} {...err("email")} />
        </Field>
        <Field label="Phone" name="phone" optional>
          <input name="phone" type="tel" autoComplete="tel" className={input} />
        </Field>
        <Field label="Role you're applying for" name="role" error={errors.role}>
          <input name="role" required className={input} {...err("role")} />
        </Field>
        <Field label="Experience" name="experience" error={errors.experience}>
          <select name="experience" required defaultValue="" className={cn(input, "appearance-none")} {...err("experience")}>
            <option value="" disabled>
              Choose
            </option>
            {EXPERIENCE.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Resume (PDF, DOC or DOCX, up to 5 MB)" name="resume" error={errors.resume}>
          <input
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className={cn(input, "file:mr-4 file:rounded-button file:border-0 file:bg-[var(--accent)] file:px-3 file:py-1.5 file:text-sm file:text-[var(--on-accent)]")}
            {...err("resume")}
          />
        </Field>
        <Field label="Portfolio link" name="portfolio" optional error={errors.portfolio}>
          <input name="portfolio" type="url" placeholder="https://" className={input} {...err("portfolio")} />
        </Field>
        <Field label="LinkedIn" name="linkedin" optional error={errors.linkedin}>
          <input name="linkedin" type="url" placeholder="https://" className={input} {...err("linkedin")} />
        </Field>
      </div>
      <Field label="Anything you'd like us to know" name="message" optional>
        <textarea name="message" rows={4} className={cn(input, "resize-none")} />
      </Field>

      {state.status === "unavailable" && (
        <p role="alert" className="text-sm text-[var(--fg-muted)]">
          We couldn&apos;t send this from the site right now. Please email your resume to{" "}
          <a href={`mailto:${company.contact.careersEmail}`} className="text-[var(--accent)] underline underline-offset-4">
            {company.contact.careersEmail}
          </a>{" "}
          instead.
        </p>
      )}

      <Button type="submit" size="lg" icon={<ArrowIcon />} disabled={pending} className="self-start disabled:opacity-60">
        {pending ? "Sending…" : "Submit application"}
      </Button>
    </form>
  );
}
