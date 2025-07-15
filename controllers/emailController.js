// controllers/emailController.js
import sendEmail from '../utils/sendEmail.js';

/**
 * @desc    Send an email via contact form
 * @route   POST /api/email/send
 * @access  Public
 */
export const sendTestEmail = async (req, res) => {
  const { email, subject, message, name = 'User' } = req.body;

  // 1️⃣ Validate fields
  if (!email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: '❌ Email, subject, and message are required.',
    });
  }

  // 2️⃣ Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: '❌ Invalid email format.',
    });
  }

  // 3️⃣ HTML Email content
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #007acc;">📩 New Message from ${name}</h2>
      <p><strong>From:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br />')}</p>
      <hr />
      <small style="color: #888;">Received on ${new Date().toLocaleString()}</small>
    </div>
  `;

  try {
    const info = await sendEmail({
      email,
      subject,
      message,
      html: htmlContent,
    });

    return res.status(200).json({
      success: true,
      message: `✅ Email successfully sent to ${email}`,
      details: {
        to: email,
        subject,
        preview: message.length > 100 ? message.substring(0, 100) + '...' : message,
        messageId: info.messageId,
        accepted: info.accepted,
        response: info.response,
      },
    });
  } catch (error) {
    console.error('❌ Email send error:', error);
    return res.status(500).json({
      success: false,
      message: '❌ Failed to send email. Try again later.',
      error: error.message || 'Unknown error',
    });
  }
};
