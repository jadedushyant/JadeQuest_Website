"use server";

import { z } from "zod";
import { company } from "@/content";
import { formatFields, mailConfigured, sendMail } from "@/lib/server/mail";
import { isRateLimited, looksLikeSpam } from "@/lib/server/spam";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const applicationSchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name."),
  email: z.string().trim().email("That email doesn't look right."),
  phone: z.string().trim().optional(),
  role: z.string().trim().min(2, "Which role are you applying for?"),
  experience: z.string({ error: "Pick your experience level." }).min(1, "Pick your experience level."),
  portfolio: z.union([z.literal(""), z.string().trim().url("Use a full link, starting with https://")]).optional(),
  linkedin: z.union([z.literal(""), z.string().trim().url("Use a full link, starting with https://")]).optional(),
  message: z.string().trim().optional(),
});

export type ApplyState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: Record<string, string> }
  | { status: "unavailable" };

/**
 * Careers application, emailed to CAREERS_TO (default careers@jadequest.com)
 * with the resume attached. Without mail settings, development logs it and
 * production reports "unavailable" so applicants are pointed to email.
 */
export async function submitApplication(_prev: ApplyState, form: FormData): Promise<ApplyState> {
  const raw = Object.fromEntries(form);
  if (looksLikeSpam(raw)) return { status: "sent" };
  if (await isRateLimited("apply")) return { status: "unavailable" };

  const parsed = applicationSchema.safeParse(raw);
  const errors: Record<string, string> = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] ??= issue.message;
  }

  const resume = form.get("resume");
  if (!(resume instanceof File) || resume.size === 0) errors.resume = "Attach your resume.";
  else if (resume.size > MAX_RESUME_BYTES) errors.resume = "The resume must be 5 MB or smaller.";
  else if (!RESUME_TYPES.includes(resume.type)) errors.resume = "Use a PDF, DOC or DOCX file.";

  if (Object.keys(errors).length > 0 || !parsed.success) return { status: "invalid", errors };
  const file = resume as File;
  const application = parsed.data;

  if (!mailConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.info("[application] (dev only, not delivered)", application, { resume: file.name, bytes: file.size });
      return { status: "sent" };
    }
    return { status: "unavailable" };
  }

  try {
    await sendMail({
      to: process.env.CAREERS_TO ?? company.contact.careersEmail,
      replyTo: application.email,
      subject: `Application: ${application.role} (${application.name})`,
      text: formatFields({
        Name: application.name,
        Email: application.email,
        Phone: application.phone,
        Role: application.role,
        Experience: application.experience,
        Portfolio: application.portfolio,
        LinkedIn: application.linkedin,
        Message: application.message,
      }),
      attachments: [{ filename: file.name, content: Buffer.from(await file.arrayBuffer()) }],
    });
    return { status: "sent" };
  } catch (err) {
    console.error("[application] delivery failed", err);
    return { status: "unavailable" };
  }
}
