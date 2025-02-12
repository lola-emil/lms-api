import nodemailer from "nodemailer";
import { MAILER_ADDRESS, MAILER_PASSWORD } from "./constants";

export const mailer = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: MAILER_ADDRESS,
      pass: MAILER_PASSWORD,
    }
});