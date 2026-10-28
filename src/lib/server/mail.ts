import { Resend } from "resend";

type Mail = {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
};

/** True when RESEND_API_KEY and MAIL_FROM are set (MAIL_FROM must be on a domain verified in Resend). */
export function mailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.MAIL_FROM);
}

export async function sendMail({ to, subject, text, replyTo, attachments }: Mail) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: process.env.MAIL_FROM!,
    to,
    subject,
    text,
    replyTo,
    attachments,
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

/** Plain-text email body from labelled fields; empty values are skipped. */
export function formatFields(fields: Record<string, string | undefined>) {
  return Object.entries(fields)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}:\n${v}`)
    .join("\n\n");
}
