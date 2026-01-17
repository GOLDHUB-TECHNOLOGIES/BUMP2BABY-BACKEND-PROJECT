import nodemailer from "nodemailer";
const { Email_User, Email_Pass } = process.env;

const sendMail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodemailer.createTransport({
    host: "in.mail.tm",
    port: 587,
    secure: false,
    auth: {
      user: String(Email_User),
      pass: String(Email_Pass),
    },
  });
  const message = {
    to: emailTo,
    subject,
    html: `
                <div>
                    <h3>Use this below code to ${content}</h3>
                    <p>Your verification code is: ${code}</p>
                </div>
        `,
  };
  await transporter.sendMail(message);
};

export default sendMail;
