import { z } from "zod";

export const BUDGETS = ["Under $25k", "$25k–75k", "$75k–150k", "$150k+", "Not sure yet"] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name."),
  email: z.string().trim().email("That email doesn't look right."),
  service: z.string().min(1, "Pick the closest match."),
  budget: z.enum(BUDGETS).optional(),
  message: z.string().trim().min(20, "A couple of sentences helps us reply properly (20+ characters)."),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export type InquiryResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "not-configured" | "rate-limited" | "failed" };
