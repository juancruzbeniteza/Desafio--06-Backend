import { createTransport } from "nodemailer";
import env from './env.utils.js'

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
      from: `Ecommerce Tecno  <${process.env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
      html: `
        <h1>USER REGISTERED SUCCESFULLY<h1>
      `,
    });
  } catch (error) {
    throw error;
  }
}

export default sendEmail;