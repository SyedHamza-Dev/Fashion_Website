// controllers/contactController.js

import { sendContactEmail } from '../utils/email.js'; // Import the email utility

export const sendContactEmailController = async (req, res) => {
  const { landlordEmail, username, listingName, message, userEmail } = req.body;

  // Debugging output
  console.log("User Email:", userEmail); // Log the userEmail to verify

  if (!message || message.trim() === '') {
    return res.status(400).json({ success: false, message: 'Please enter a message before sending.' });
  }

  try {
    await sendContactEmail(landlordEmail, username, listingName, message, userEmail);
    res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
};
