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
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Please add agent phone number'],
    },
    bio: {
      type: String,
      default: '',
      trim: true,
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

// === Virtual populate (optional for future scalability) ===
// agentSchema.virtual('propertiesList', {
//   ref: 'Property',
//   localField: '_id',
//   foreignField: 'agent',
//   justOne: false,
// });

const Agent = mongoose.model('Agent', agentSchema);

export default Agent;
