"use server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

const contactAttempts = new Map<string, number>();
const THROTTLE_MS = 60_000;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function throttleKey(formData: FormData): string {
  return String(formData.get("_throttleId") ?? "default");
}

export type ContactState = {
  success: boolean;
  error?: string;
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    return { success: false, error: "Invalid submission" };
  }

  const key = throttleKey(formData);
  const now = Date.now();
  const last = contactAttempts.get(key);
  if (last && now - last < THROTTLE_MS) {
    return {
      success: false,
      error: "Please wait before sending another message",
    };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Missing fields" };
  }
  if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
    return { success: false, error: "Input too long" };
  }
  if (!EMAIL_RE.test(email)) {
    return { success: false, error: "Invalid email address" };
  }

  const nodemailer = await import("nodemailer");
  const smtpUser = process.env.SMTP_USER;
  const recipients = [
    process.env.RECIPIENT_EMAIL,
    process.env.RECIPIENT_EMAIL_1,
  ].filter(Boolean) as string[];

  if (!smtpUser || recipients.length === 0) {
    return { success: false, error: "Email is not configured" };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: process.env.SMTP_PASS!,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    for (const rec of recipients) {
      await transporter.sendMail({
        from: `"2osysthmakilkis.gr" <${smtpUser}>`,
        replyTo: email,
        to: rec,
        subject: `Νέο μήνυμα από την σελίδα (${name})`,
        text: `${message}\n\nFrom: ${name} (${email})`,
        html: `<p>${safeMessage}</p><p>From: ${safeName} (${safeEmail})</p>`,
      });
    }

    contactAttempts.set(key, now);
    return { success: true };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: "Email failed to send" };
  }
}
