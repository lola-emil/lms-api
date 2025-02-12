import nodemailer from "nodemailer";
import { MAILER_ADDRESS, MAILER_PASSWORD } from "./constants";

export function sendMail(from: string, to: string, compose: {
  subject?: string, text?: string, html?: string
}) {
  const mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: "gmail",
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: MAILER_ADDRESS,
      pass: MAILER_PASSWORD,
    }
  });

  mailer.sendMail({
    from,
    to,

    subject: compose.subject,
    text: compose.text,
    html: compose.html,
  });
}