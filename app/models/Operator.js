import mongoose from 'mongoose';

const operatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide operator name'],
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide operator description'],
  },
  logo: String,
  baseCity: {
    type: String,
    required: [true, 'Please provide base city'],
  },
  contactPhone: {
    type: String,
    required: [true, 'Please provide contact phone'],
  },
  contactEmail: {
    type: String,
    required: [true, 'Please provide contact email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  website: String,
  fleetSize: {
    type: Number,
    required: [true, 'Please provide fleet size'],
  },
  yearEstablished: Number,
  facilities: [{
    type: String,
  }],
  terminals: [{
    terminal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Terminal',
    },
    routes: [{
      destination: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      schedule: [{
        type: String,
      }],
      amenities: [{
        type: String,
      }],
      vehicleType: {
        type: String,
        required: true,
      },
    }],
  }],
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Operator = mongoose.models.Operator || mongoose.model('Operator', operatorSchema);

export default Operator;
