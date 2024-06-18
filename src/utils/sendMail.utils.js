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

    const currentDate = new Date().toLocaleDateString();

    await transport.sendMail({
      from: `Ecommerce Tecno <${process.env.GOOGLE_EMAIL}>`,
      to: data.email,
      subject: `Welcome to Ecommerce Tecno, ${data.name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h1 style="color: #ff6600;">Welcome to Ecommerce Tecno!</h1>
          <p>Dear ${data.name},</p>
          <p>Thank you for registering with <strong>Ecommerce Tecno</strong>. We are excited to have you on board.</p>
          <p>Your registration was successful on <strong>${currentDate}</strong>.</p>
          <h2 style="color: #ff6600;">Getting Started</h2>
          <p>To get started, please visit our website and explore our wide range of products.</p>
          <a href="ecommerce-tecno-dev.up.railway.app" style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #ff6600; color: #fff; text-decoration: none; border-radius: 5px;">Visit Ecommerce Tecno</a>
          <h2 style="color: #ff6600;">Need Help?</h2>
          <p>If you have any questions, feel free to reply to this email or visit our <a href="ecommerce-tecno-dev.up.railway.app" style="color: #ff6600; text-decoration: none;">support page</a>.</p>
          <p>Best Regards,</p>
          <p><strong>The Ecommerce Tecno Team</strong></p>
        </div>
      `,
    });

  } catch (error) {
    throw error;
  }
}

export default sendEmail;
