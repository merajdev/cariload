import mongoose, { Schema, model, models } from 'mongoose';

const OwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    enum: ['owner'],
    default: 'owner',
  },
  password: {
    type: String,
    required: true,
  },
  emailVerified: {
      type: Boolean,
      default: false
  },
  otp: {
      type: String
  },
  otpExpiry: {
      type: Date
  },
});

const Owner = mongoose.models.Owner || mongoose.model('Owner', OwnerSchema);
export default Owner;