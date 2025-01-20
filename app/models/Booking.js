import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  operator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operator',
    required: true,
  },
  terminal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Terminal',
    required: true,
  },
  route: {
    destination: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    departureTime: {
      type: String,
      required: true,
    },
    vehicleType: String,
  },
  passengers: [{
    name: {
      type: String,
      required: true,
    },
    age: Number,
    gender: String,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  bookingStatus: {
    type: String,
    enum: ['confirmed', 'cancelled', 'completed'],
    default: 'confirmed',
  },
  paymentReference: String,
  bookingReference: {
    type: String,
    unique: true,
  },
  travelDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Generate booking reference before saving
bookingSchema.pre('save', function(next) {
  if (!this.bookingReference) {
    this.bookingReference = 'BK' + Date.now() + Math.floor(Math.random() * 1000);
  }
  next();
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;
