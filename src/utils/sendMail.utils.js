import { createTransport } from "nodemailer";

async function sendEmail(data) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: process.env.PORT,
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASS,
      },
    });
    await transport.sendMail({
      from: `E-COMMERCE <${process.env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: `
        <h1>USER REGISTERED!<h1>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;