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
    enum: ['owner', 'user'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;