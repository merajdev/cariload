import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new mongoose.Schema({
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
    enum: ['user'],
    default: 'user',
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

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;