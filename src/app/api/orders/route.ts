import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/order.model';
import { getUserDetails } from '@/utils/getUserDetails'; // Adjust the path as needed
import { z } from 'zod';

const orderSchema = z.object({
  pickupAddress: z.string().min(1, 'Pickup address is required'),
  shippingAddress: z.string().min(1, 'Shipping address is required'),
  packageDetails: z.object({
    size: z.string().min(1, 'Package size is required'),
    weight: z.string().min(1, 'Package weight is required'),
    type: z.string().min(1, 'Package type is required'),
    instructions: z.string().optional(),
  }),
  truckOption: z.enum(['small', 'medium', 'large']),
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal', 'cod']),
  status: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all orders from the database
    const orders = await Order.find();

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = orderSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.issues }, { status: 400 });
    }

    const { pickupAddress, shippingAddress, packageDetails, truckOption, paymentMethod } = parsedData.data;

    // Extract the token from headers
    const authHeader = req.headers.get('Authorization') || '';
    const token = authHeader.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Connect to the database
    await dbConnect();

    // Get user details
    const userResponse = await getUserDetails(token);
    if (!userResponse.success) {
      return NextResponse.json({ error: userResponse.error }, { status: 401 });
    }

    const user = userResponse.user;

    // Validate that the userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(user._id)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const newOrder = await Order.create({
      pickupAddress,
      shippingAddress,
      packageDetails,
      truckOption,
      paymentMethod,
      user: user._id,
      status: 'pending',
    });

    return NextResponse.json({ message: 'Order created successfully', order: newOrder }, { status: 201 });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 });
  }
}
