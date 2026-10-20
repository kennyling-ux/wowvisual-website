import { Resend } from "resend";
import { contactSchema, contactSummary } from "@/lib/contact-schema";

/**
 * POST /api/contact (§6.13) → Resend → CONTACT_TO_EMAIL.
 * - Honeypot: a filled `website` field gets a silent 200 and is dropped.
 * - Basic rate limit: 5 requests / 10 min per IP (per server instance — good
 *   enough to stop casual abuse; use a shared store if spam becomes a problem).
 * - No RESEND_API_KEY → 503 { code: "email_unavailable" } and the client falls
 *   back to WhatsApp with the message prefilled (§13: never a dead form).
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > MAX_REQUESTS;
}

const escape = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

const json = (body: unknown, status = 200) => Response.json(body, { status });

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return json({ ok: false, code: "rate_limited" }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, code: "invalid_json" }, 400);
  }

  // Honeypot before validation, so bots get no feedback
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    (body as { website?: unknown }).website
  ) {
    return json({ ok: true });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, code: "invalid", fields: parsed.error.flatten().fieldErrors }, 400);
  }
  const data = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "wowvisualofficial@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL || "hello@wowvisual.my";
  if (!apiKey) return json({ ok: false, code: "email_unavailable" }, 503);

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone / WhatsApp", data.phone],
    ["Service", data.service],
    ["Budget", data.budget],
  ];
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;font-size:15px;line-height:1.6;color:#0a0a0a">
      <h2 style="margin:0 0 16px">New enquiry from wowvisual.my</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows
          .filter(([, v]) => v)
          .map(
            ([k, v]) =>
              `<tr><td style="color:#5c5c5c">${k}</td><td><strong>${escape(v)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:20px 0 6px;color:#5c5c5c">Project details</p>
      <p style="white-space:pre-wrap;margin:0">${escape(data.message)}</p>
    </div>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `WOW VISUAL Website <${from}>`,
      to,
      replyTo: data.email,
      subject: `New enquiry: ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text: contactSummary(data),
      html,
    });
    if (error) {
      console.error("[contact] Resend error", error);
      return json({ ok: false, code: "send_failed" }, 502);
    }
  } catch (err) {
    console.error("[contact] Unexpected error", err);
    return json({ ok: false, code: "send_failed" }, 502);
  }

  return json({ ok: true });
}
