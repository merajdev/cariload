import mongoose, { Schema } from 'mongoose';

const DriverSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true,
  },
  driverId: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, 'Please provide a valid phone number'],
    },
    email: {
      type: String,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    address: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['active', 'on_leave', 'inactive'],
    default: 'active',
  },
  assignedTruck: {
    type: String,
    default: '',
  },
  ratings: {
    type: Number,
    min: 1,
    max: 5,
    default: 0,
  },
  tripHistory: [
    {
      tripId: String,
      date: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

const Driver = mongoose.models.Driver || mongoose.model('Driver', DriverSchema);
export default Driver;
