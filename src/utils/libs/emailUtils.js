// utils/libs/emailUtils.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const farmFuseLogo =
  "https://res.cloudinary.com/dn4gfzlhq/image/upload/v1700938194/farm_d14gwq.png";

export const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Welcome to Farm Fuse",
    html: `
      <div style="background-color: #307C31; padding: 20px; color: #ffffff; border-radius: 5px">
        <img src="${farmFuseLogo}" alt="Farm Fuse Logo" style="max-width: 150px; height: 30px; margin-bottom: 20px;">
        <div style="text-align: center;">
        <p style="font-size: 18px;">Hello, ${name}!</p>
        <p style="font-size: 16px;">Welcome to Farm Fuse! We're thrilled that you've chosen to register with us.</p>
        <p style="font-size: 16px;">If you have any questions or need assistance, feel free to reach out.</p>
        <p style="font-size: 16px;">Thank you for joining us on the journey of cultivating success and transforming agriculture.</p>
        <p style="font-size: 16px;">Best regards,</p>
        <p style="font-size: 16px;">The Farm Fuse Team</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};




export const sendPasswordResetEmail = async (email, name, resetToken) => {
  const resetLink = `https://farm-fuse-frontend.vercel.app/reset-password/api/reset_password?email=${email}&resetPasswordToken=${resetToken}`;


  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Password Reset",
    html: `
    <div style="background-color: #307C31; padding: 20px; color: #ffffff; border-radius: 5px">
        <img src="${farmFuseLogo}" alt="Farm Fuse Logo" style="max-width: 150px; height: 30px; margin-bottom: 20px;">
        <div style="text-align: center;">
            <p>Hello, ${name}</p>
            <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click on the following link to reset your password:</p>
            <a href="${resetLink}" target="_blank" rel="noopener noreferrer" style="color: #4DA1FF; text-decoration: underline;">Reset Password</a>
            <p>If you did not request this, please ignore this email, and your password will remain unchanged.</p>
            <p>Thank you,</p>
            <p>The Farm Fuse Team</p>
            </div>
      </div>
          `,
  };

  return transporter.sendMail(mailOptions);
};
