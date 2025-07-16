import mongoose from 'mongoose';
import validator from 'validator';

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ✅ sender (can be user or agent)
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ✅ recipient user (when agent contacts user)
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
