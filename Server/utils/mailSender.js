const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT) || 587,
      secure: true, // use true for port 465, false for 587
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`, // sender email from env
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.error("❌ Error in mailSender:", error?.response || error.message || error);
    throw new Error("Failed to send email");
  }
};

module.exports = mailSender;