import mongoose from 'mongoose';
import validator from 'validator';

const agentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add agent name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add agent email'],
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Please add agent phone number'],
      validate: {
        validator: function (v) {
          // Ensure only digits and length between 10 and 15
          return /^\d{10,15}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;
