import { NextResponse } from "next/server";

import { sendContactEmail, type ContactEmailPayload } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const readString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  const payload: ContactEmailPayload = {
    name: readString(body.name),
    email: readString(body.email),
    subject: readString(body.subject),
    message: readString(body.message),
    currentUrl: readString(body.currentUrl),
    projectType: readString(body.projectType),
    budget: readString(body.budget),
  };

  if (!payload.name || !payload.email || !payload.message) {
    return NextResponse.json(
      {
        success: false,
        message: "Please fill in all required fields.",
      },
      { status: 400 },
    );
  }

  if (!EMAIL_REGEX.test(payload.email)) {
    return NextResponse.json(
      {
        success: false,
        message: "Please enter a valid email address.",
      },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail(payload);

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully. We'll respond within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later or contact us directly by email.",
      },
      { status: 500 },
    );
  }
}
