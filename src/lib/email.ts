import "server-only";

import { Resend } from "resend";

export interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  subject?: string;
  budget?: string;
  projectType?: string;
  currentUrl?: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatMessageHtml = (message: string) => escapeHtml(message).replace(/\n/g, "<br />");

const buildOptionalText = (label: string, value?: string) =>
  value ? `${label}: ${value}` : `${label}: Not provided`;

const buildOptionalRow = (label: string, value?: string) => `
  <tr>
    <td style="padding:8px 0;font-weight:600;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;">${escapeHtml(value || "Not provided")}</td>
  </tr>
`;

const getResendConfig = () => {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    throw new Error(
      "Missing Resend configuration. Expected RESEND_API_KEY, RESEND_FROM_EMAIL, and CONTACT_TO_EMAIL.",
    );
  }

  return { apiKey, fromEmail, toEmail };
};

export const sendContactEmail = async (payload: ContactEmailPayload) => {
  const { apiKey, fromEmail, toEmail } = getResendConfig();
  const resend = new Resend(apiKey);
  const subject = payload.subject?.trim()
    ? `[Luna Lab] ${payload.subject.trim()} - ${payload.name}`
    : `[Luna Lab] New contact form submission from ${payload.name}`;

  const { data, error } = await resend.emails.send({
    from: fromEmail,
    to: [toEmail],
    subject,
    replyTo: payload.email,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
        <h2 style="margin-bottom:16px;">New contact form submission</h2>
        <table style="border-collapse:collapse;">
          ${buildOptionalRow("Name", payload.name)}
          ${buildOptionalRow("Email", payload.email)}
          ${buildOptionalRow("Project type", payload.projectType)}
          ${buildOptionalRow("Budget", payload.budget)}
          ${buildOptionalRow("Page URL", payload.currentUrl)}
        </table>
        <div style="margin-top:24px;">
          <h3 style="margin-bottom:8px;">Message</h3>
          <p style="margin:0;">${formatMessageHtml(payload.message)}</p>
        </div>
      </div>
    `,
    text: [
      "New contact form submission",
      "",
      buildOptionalText("Name", payload.name),
      buildOptionalText("Email", payload.email),
      buildOptionalText("Project type", payload.projectType),
      buildOptionalText("Budget", payload.budget),
      buildOptionalText("Page URL", payload.currentUrl),
      "",
      "Message:",
      payload.message,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message || "Resend failed to send the email.");
  }

  return data;
};
