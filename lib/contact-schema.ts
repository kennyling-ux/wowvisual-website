import { z } from "zod";
import { contact } from "@/content/site";

const e = contact.errors;

/** Shared by the form (client) and /api/contact (server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, e.name).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email(e.email).max(200),
  phone: z
    .string()
    .trim()
    .min(7, e.phone)
    .max(30)
    .regex(/^[+()\d\s-]+$/, e.phone),
  service: z.string().trim().max(120).optional().default(""),
  budget: z.string().trim().max(60).optional().default(""),
  message: z.string().trim().min(10, e.message).max(5000),
  consent: z.boolean().refine((v) => v, { message: e.consent }),
  // Honeypot — must stay empty (hidden from people, filled by bots)
  website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

/** Plain-text summary used for the email body and the WhatsApp fallback. */
export function contactSummary(d: Partial<ContactData>) {
  return [
    `Hi Wow Visual, I'm ${d.name ?? ""}${d.company ? ` from ${d.company}` : ""}.`,
    d.service ? `Service: ${d.service}` : "",
    d.budget ? `Budget: ${d.budget}` : "",
    d.message ? `\n${d.message}` : "",
    `\nEmail: ${d.email ?? ""}`,
    d.phone ? `Phone: ${d.phone}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
