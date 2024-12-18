import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com
  port: process.env.EMAIL_PORT, // e.g., 587
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

// Function to send verification emails
export const sendVerificationEmail = async (email, code) => {
  const mailOptions = {
    from: `"FIT & FLAIR SUPPORT" <${process.env.EMAIL_USER}>`, // Your support email
    to: email,
    subject: 'Email Verification',
    text: `Your verification code is: ${code}`,
    html: `<p>Your verification code is: <b>${code}</b></p>`,
  };

  await transporter.sendMail(mailOptions);
};

// New function to send contact emails
export const sendContactEmail = async (landlordEmail, username, listingName, message, userEmail) => {
  const mailOptions = {
    from: `"${username}" <${process.env.EMAIL_USER}>`, // Show the username but use the verified email
    to: landlordEmail, // The landlord's email
    subject: `New message regarding ${listingName}`, // Subject line
    text: `You have received a new message from (${userEmail}) regarding "${listingName}":\n\n${message}`, // Plain text body with user's email
    html: `<p>You have received a new message from (<em>${userEmail}</em>) regarding "<strong>${listingName}</strong>":</p><p>${message}</p>`, // HTML body with user's email
  };

  await transporter.sendMail(mailOptions);
};


