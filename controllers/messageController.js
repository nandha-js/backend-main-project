import Message from '../models/Message.js';
import sendEmail from '../utils/sendEmail.js';
import User from '../models/User.js';
import Property from '../models/Property.js';

/**
 * @desc    User contacts about property
 * @route   POST /api/messages
 * @access  Public or Protected
 */
export const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, message, property } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: '❌ Name, email, and message are required',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '❌ Invalid email format',
      });
    }

    const propertyData = await Property.findById(property).populate('postedBy', 'email');

    const newMessage = await Message.create({
      name,
      email,
      phone,
      message,
      property,
      ...(req.user && { user: req.user.id }),
    });

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>📩 New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${propertyData?.title ? `<p><strong>Property:</strong> ${propertyData.title}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <small>Received at ${new Date().toLocaleString()}</small>
      </div>
    `;

    const recipients = [
      {
        email: 'admin@gmail.com',
        subject: '📨 New Contact Message on Real Estate Platform',
      },
    ];

    if (propertyData?.postedBy?.email) {
      recipients.push({
        email: propertyData.postedBy.email,
        subject: '📨 New Message About Your Property',
      });
    }

    for (const recipient of recipients) {
      await sendEmail({
        email: recipient.email,
        subject: recipient.subject,
        message: `You have received a new message from ${name}`,
        html,
      });
    }

    res.status(201).json({
      success: true,
      data: newMessage,
      message: '✅ Message sent successfully',
    });
  } catch (error) {
    console.error('❌ Send Message Error:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Server Error while sending message',
      error: error.message,
    });
  }
};

/**
 * @desc    Agent contacts user
 * @route   POST /api/messages/send-to-user
 * @access  Private (Agent/Admin only)
 */
export const sendMessageToUser = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: '❌ To, subject, and message are required',
      });
    }

    const recipientUser = await User.findOne({ email: to });

    if (!recipientUser) {
      return res.status(404).json({
        success: false,
        message: '❌ No user found with this email',
      });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>📬 Message from Agent</h2>
        <p><strong>From:</strong> ${req.user?.name || 'Agent'} (${req.user?.email})</p>
        <p><strong>To:</strong> ${to}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <small>Sent on ${new Date().toLocaleString()}</small>
      </div>
    `;

    await sendEmail({
      email: to,
      subject,
      message: `Message from Agent: ${subject}`,
      html,
    });

    await Message.create({
      name: req.user?.name || 'Agent',
      email: to,
      message,
      user: req.user?._id,
      recipient: recipientUser._id,
    });

    res.status(200).json({
      success: true,
      message: '✅ Message sent to user successfully',
    });
  } catch (error) {
    console.error('❌ Agent to User Message Error:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Server Error while sending agent message',
      error: error.message,
    });
  }
};

/**
 * @desc    Get all messages
 * @route   GET /api/messages
 * @access  Private (Admin & Agent)
 */
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('property', 'title')
      .populate('recipient', 'name email')
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('❌ Get Messages Error:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Server Error while fetching messages',
      error: error.message,
    });
  }
};

/**
 * @desc    View received messages (User or Agent)
 * @route   GET /api/messages/my-messages
 * @access  Private (User or Agent)
 */
export const getMyMessages = async (req, res) => {
  try {
    let messages = [];

    if (req.user.role === 'agent') {
      const properties = await Property.find({ postedBy: req.user._id }).select('_id');
      const propertyIds = properties.map((p) => p._id);

      messages = await Message.find({ property: { $in: propertyIds } })
        .populate('user', 'name email')
        .populate('recipient', 'name email')
        .populate('property', 'title')
        .sort({ createdAt: -1 });
    } else if (req.user.role === 'user') {
      messages = await Message.find({ recipient: req.user._id })
        .populate('user', 'name email')
        .populate('property', 'title')
        .sort({ createdAt: -1 });
    } else {
      return res.status(403).json({
        success: false,
        message: '❌ Only users or agents can access their messages',
      });
    }

    res.status(200).json({ success: true, data: messages });
  } catch (error) {
    console.error('❌ My Messages Error:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Server Error while fetching your messages',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a message
 * @route   DELETE /api/messages/:id
 * @access  Private (Admin only)
 */
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: '❌ Message not found',
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: '✅ Message deleted successfully',
    });
  } catch (error) {
    console.error('❌ Delete Message Error:', error.message);
    res.status(500).json({
      success: false,
      message: '❌ Server Error while deleting message',
      error: error.message,
    });
  }
};