"use server";

import { company } from "@/content";
import { inquirySchema, type InquiryResult } from "@/lib/forms/inquiry";
import { formatFields, mailConfigured, sendMail } from "@/lib/server/mail";
import { isRateLimited, looksLikeSpam } from "@/lib/server/spam";

/**
 * Receives the inquiry form (home and contact pages) and emails it to
 * INQUIRY_TO (default contact@jadequest.com). Without mail settings, development
 * logs the message and production reports "not-configured" so the UI shows the
 * email address instead of pretending it was sent.
 */
export async function sendInquiry(data: unknown): Promise<InquiryResult> {
  const raw = (data ?? {}) as Record<string, unknown>;
  if (looksLikeSpam(raw)) return { ok: true };
  if (await isRateLimited("inquiry")) return { ok: false, reason: "rate-limited" };

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) return { ok: false, reason: "invalid" };
  const inquiry = parsed.data;

  if (!mailConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.info("[inquiry] (dev only, not delivered)", inquiry);
      return { ok: true };
    }
    return { ok: false, reason: "not-configured" };
  }

  try {
    await sendMail({
      to: process.env.INQUIRY_TO ?? company.contact.email,
      replyTo: inquiry.email,
      subject: `Website inquiry: ${inquiry.service} (${inquiry.name})`,
      text: formatFields({
        Name: inquiry.name,
        Email: inquiry.email,
        Service: inquiry.service,
        Budget: inquiry.budget,
        Message: inquiry.message,
      }),
    });
    return { ok: true };
  } catch (err) {
    console.error("[inquiry] delivery failed", err);
    return { ok: false, reason: "failed" };
  }
}
