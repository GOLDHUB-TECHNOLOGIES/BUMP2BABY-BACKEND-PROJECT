import FormData from "form-data"; // form-data v4.0.1
import Mailgun from "mailgun.js"; // mailgun.js v11.1.0

// async function sendSimpleMessage() {
//   const mailgun = new Mailgun(FormData);
//   const mg = mailgun.client({
//     username: "api",
//     key: process.env.MAIL_APIKEY,
//     // When you have an EU-domain, you must specify the endpoint:
//     // url: "https://api.eu.mailgun.net"
//   });
//   try {
//     const data = await mg.messages.create("sandboxd6cbf348e90e478aa9afa2d5884a340d.mailgun.org", {
//       from: "Mailgun Sandbox <postmaster@sandboxd6cbf348e90e478aa9afa2d5884a340d.mailgun.org>",
//       to: ["Justin <justinphones74@gmail.com>"],
//       subject: "Hello Justin",
//       text: "Congratulations Justin, you just sent an email with Mailgun! You are truly awesome!",
//     });

//     console.log(data); // logs response data
//   } catch (error) {
//     console.log(error); //logs any error
//   }
// }

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

  const from = process.env.MAIL_FROM || `bump2baby <postmaster@${domain}>`; // or a verified sender you configured in Mailgun

  const html = `
    <div>
      <h3>Use this below code to ${content}</h3>
      <p>Your verification code is: ${code}</p>
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
