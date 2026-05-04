import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { name, email, projectType, budget, message } = await req.json();

  if (!name || !email || !projectType || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New project inquiry from ${name} — ${projectType}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;background:#070f18;color:#f0f6ff;padding:32px;border-radius:12px;border:1px solid rgba(20,184,166,0.15)">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.07)">
          <div style="width:36px;height:36px;background:rgba(20,184,166,0.15);border:1px solid rgba(20,184,166,0.3);border-radius:8px;display:flex;align-items:center;justify-content:center;font-weight:700;color:#14b8a6;font-size:14px">PS</div>
          <span style="font-weight:600;color:#f0f6ff">New project inquiry</span>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          ${[
            ["Name", name],
            ["Email", email],
            ["Project type", projectType],
            ["Budget range", budget || "Not specified"],
          ].map(([l, v]) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#4d6f88;font-size:12px;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;width:130px;vertical-align:top">${l}</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#f0f6ff;font-size:14px;vertical-align:top">${v}</td>
            </tr>
          `).join("")}
        </table>

        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:16px;margin-bottom:24px">
          <div style="font-size:11px;color:#4d6f88;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:10px">Project details</div>
          <p style="margin:0;color:#8eafc8;font-size:14px;line-height:1.7">${message.replace(/\n/g, "<br>")}</p>
        </div>

        <a href="mailto:${email}" style="display:inline-block;background:#14b8a6;color:#070f18;padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;text-decoration:none">Reply to ${name}</a>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
