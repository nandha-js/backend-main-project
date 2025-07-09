// models/Property.js
import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price cannot be negative'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
        required: true,
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
        required: true,
      },
      formattedAddress: {
        type: String,
        required: true,
      },
    },
    type: {
      type: String,
      enum: ['apartment', 'house', 'villa'],
      required: [true, 'Please specify a property type'],
      lowercase: true,
      trim: true,
    },
    size: {
      type: Number,
      required: [true, 'Please specify the size'],
      min: [0, 'Size cannot be negative'],
    },
    rooms: {
      type: Number,
      default: 0,
      min: [0, 'Rooms cannot be negative'],
    },
    bedrooms: {
      type: Number,
      default: 0,
      min: [0, 'Bedrooms cannot be negative'],
    },
    bathrooms: {
      type: Number,
      default: 0,
      min: [0, 'Bathrooms cannot be negative'],
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model('Property', propertySchema);

export default Property;
 