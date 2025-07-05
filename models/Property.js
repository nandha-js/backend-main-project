import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title']
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      required: true
    },
    formattedAddress: {
      type: String,
      required: true
    }
  },
  type: {
    type: String,
    enum: ['apartment', 'house', 'villa'], // ✅ added 'villa'
    required: [true, 'Please specify a property type']
  },
  size: {
    type: Number, // ✅ should be Number only, like 2500 (not '2500 sqft')
    required: [true, 'Please specify the size']
  },
  rooms: {
    type: Number,
    default: 0
  },
  bedrooms: {
    type: Number,
    default: 0
  },
  bathrooms: {
    type: Number,
    default: 0
  },
  images: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

export default Property;
