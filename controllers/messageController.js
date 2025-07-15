import Message from '../models/Message.js';

/**
 * @desc    Send a message
 * @route   POST /api/messages
 * @access  Public (or Protected if user is logged in)
 */
export const sendMessage = async (req, res) => {
  try {
    const { name, email, phone, message, property } = req.body;

    // 1️⃣ Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: '❌ Name, email, and message are required',
      });
    }

    // 2️⃣ Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: '❌ Invalid email format',
      });
    }

    // 3️⃣ Create message
    const newMessage = await Message.create({
      name,
      email,
      phone,
      message,
      property,
      ...(req.user && { user: req.user.id }), // Add user if logged in
    });

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
 * @desc    Get all messages
 * @route   GET /api/messages
 * @access  Private (Admin & Agent)
 */
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('property', 'title')
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
