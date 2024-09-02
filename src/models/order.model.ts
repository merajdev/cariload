// models/Order.ts
import mongoose, { Document, Schema } from 'mongoose';
import User from './user.model'; // Import the User model

interface PackageDetails {
  size: string;
  weight: string;
  type: string;
  instructions: string;
}

interface Order extends Document {
  user: Schema.Types.ObjectId; // Reference to the User
  pickupAddress: string;
  shippingAddress: string;
  packageDetails: PackageDetails;
  truckOption: string;
  paymentMethod: string;
}

const packageDetailsSchema = new Schema({
  size: { type: String, required: true },
  weight: { type: String, required: true },
  type: { type: String, required: true },
  instructions: { type: String, default: '' },
});

const orderSchema = new Schema<Order>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  pickupAddress: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  packageDetails: { type: packageDetailsSchema, required: true },
  truckOption: { type: String, required: true },
  paymentMethod: { type: String, required: true },
});

const OrderModel = mongoose.models.Order || mongoose.model<Order>('Order', orderSchema);
export default OrderModel;
