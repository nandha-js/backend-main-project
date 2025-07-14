import nodemailer from 'nodemailer';

/**
 * @desc    Send an email using configured SMTP transporter
 * @param   {Object} options
 * @param   {string} options.email - Recipient email address
 * @param   {string} options.subject - Email subject
 * @param   {string} options.message - Email plain text content
 * @param   {string} [options.html] - Optional HTML content
 * @returns {Object} Nodemailer info object
 */
const sendEmail = async (options) => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_SECURE,
    FROM_NAME,
    FROM_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_EMAIL || !SMTP_PASSWORD) {
    throw new Error('SMTP configuration is missing in environment variables');
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${FROM_NAME || 'No-Reply'} <${FROM_EMAIL || SMTP_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || undefined, // ✅ Optional HTML email support
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️  Email sent to ${options.email} (Message ID: ${info.messageId})`);
    return info;
  } catch (error) {
    console.error('❌ Email sending failed:', error.message || error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;
