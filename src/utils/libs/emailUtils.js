// utils/libs/emailUtils.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

export const sendPasswordResetEmail = async (email, name, resetToken) => {
  const resetLink = `/reset-password?token=${resetToken}`;

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Password Reset",
    html: `
            <p>Hello, ${name}</p>
            <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click on the following link to reset your password:</p>
            <a href="${resetLink}" target="_blank" rel="noopener noreferrer">Reset Password</a>
            <p>If you did not request this, please ignore this email, and your password will remain unchanged.</p>
            <p>Thank you,</p>
            <p>Your Company Name</p>
          `,
  };

  return transporter.sendMail(mailOptions);
};
