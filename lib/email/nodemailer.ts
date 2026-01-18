// src/lib/email/nodemailer.ts
import nodemailer from "nodemailer";
import { EmailPayload } from '@/lib/types';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  requireTLS: true,
  tls:{
    minVersion: 'TLSv1.2', 
  },
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail(payload: EmailPayload) {
  const { to, subject, html } = payload;

  return await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL,
    to,
    subject,
    html,
  });
}

export async function verifySMTP() {
  return await transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
      console.log(success)
    }
  });
}
