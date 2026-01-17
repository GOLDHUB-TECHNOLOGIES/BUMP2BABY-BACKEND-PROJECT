import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

// ...existing code...

const mailgun = new Mailgun(FormData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAIL_APIKEY,
  // If you use EU region, uncomment and set:
  // url: "https://api.eu.mailgun.net",
});

const sendMail = async ({ emailTo, subject, code, content }) => {
  const domain = process.env.MAILGUN_DOMAIN;
  if (!domain)
    throw new Error("MAILGUN_DOMAIN is missing in environment variables");
  if (!process.env.MAIL_APIKEY)
    throw new Error("MAIL_APIKEY is missing in environment variables");
  if (!emailTo) throw new Error("emailTo is required");
  if (!subject) throw new Error("subject is required");

  const from = process.env.MAIL_FROM || `Bump2Baby <postmaster@${domain}>`; // or a verified sender you configured in Mailgun

  const html = `
    <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:24px;">
    <div style="max-width:560px; margin:0 auto; background:#fff; border-radius:12px; padding:24px; border:1px solid #e9e9ef;">
      <h2 style="margin:0 0 12px; color:#111827;">Bump2Baby</h2>
      <p style="margin:0 0 16px; color:#374151;">
        Use the code below to ${content}.
      </p>
      <div style="font-size:28px; letter-spacing:6px; font-weight:700; padding:14px 16px; background:#f3f4f6; border-radius:10px; text-align:center;">
        ${code}
      </div>
      <p style="margin:16px 0 0; color:#6b7280; font-size:12px;">
        If you didn’t request this, you can ignore this email.
      </p>
    </div>
  </div>
  `;

  await mg.messages.create(domain, {
    from,
    to: [emailTo],
    subject,
    html,
  });
};

export default sendMail;

// ...existing code...
