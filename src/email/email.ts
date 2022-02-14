import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "expressnodemailer@gmail.com",
    pass: "heroku123456789",
  },
});
