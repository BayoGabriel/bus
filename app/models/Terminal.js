import mongoose from 'mongoose';

const terminalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide terminal name'],
    unique: true,
  },
  location: {
    type: String,
    required: [true, 'Please provide terminal location'],
  },
  city: {
    type: String,
    required: [true, 'Please provide city'],
  },
  state: {
    type: String,
    required: [true, 'Please provide state'],
  },
  description: {
    type: String,
    required: [true, 'Please provide terminal description'],
  },
  facilities: [{
    type: String,
  }],
  imageUrl: String,
  contactPhone: String,
  contactEmail: String,
  operatingHours: {
    open: String,
    close: String,
  },
  operators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Operator',
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

const Terminal = mongoose.models.Terminal || mongoose.model('Terminal', terminalSchema);

export default Terminal;
