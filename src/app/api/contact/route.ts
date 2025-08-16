import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, token } = await req.json();

    // Verify Google reCAPTCHA v3
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });
    const captchaData = await captchaRes.json();

    if (!captchaData.success || captchaData.score < 0.5) {
      return NextResponse.json({ error: 'Failed captcha verification' }, { status: 400 });
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'Michael Patrick Construction <mail@mgallagherconstruction.com>', // You can use a verified domain here
      to: ['nick@nickp.com'],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
