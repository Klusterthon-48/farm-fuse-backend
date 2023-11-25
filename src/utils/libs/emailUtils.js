// utils/libs/emailUtils.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});



export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Welcome to Farm Fuse",
    html: `
            <p>Hello, ${name}!</p>
            <p>Welcome to Farm Fuse! We're thrilled that you've chosen to register with us.</p>
            <p>If you have any questions or need assistance, feel free to reach out.</p>
            <p>Thank you for joining us on the journey of cultivating success and transforming agriculture.</p>
            <p>Best regards,</p>
            <p>The Farm Fuse Team</p>
          `,
  };

  return transporter.sendMail(mailOptions);
};



export const sendPasswordResetEmail = async (email, name, resetToken) => {
  const resetLink = `${process.env.CLIENT_URL}/api/reset_password?email=${email}&token=${resetToken}`;

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
