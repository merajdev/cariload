import mongoose, { Schema, model, models } from 'mongoose';

const PackageDetailsSchema = new Schema({
  size: { type: String, required: true },
  weight: { type: String, required: true },
  type: { type: String, required: true },
  instructions: { type: String },
});

const OrderSchema = new Schema({
  pickupAddress: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  packageDetails: PackageDetailsSchema,
  truckOption: { type: String, enum: ['small', 'medium', 'large'], required: true },
  paymentMethod: { type: String, enum: ['credit_card', 'debit_card', 'paypal', 'cod'], required: true },
  status: { type: String, default: 'pending' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the User model
}, {
  timestamps: true,
});

const Order = models.Order || model('Order', OrderSchema);

export default Order;
