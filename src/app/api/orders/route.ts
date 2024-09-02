import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb'; // Import the dbConnect function
import OrderModel from '@/models/order.model';
import { getUserDetails } from '@/utils/getUserDetails'; // Adjust the import path if necessary

// Handler for POST requests
export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Use dbConnect to connect to MongoDB

    // Extract token from headers
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('Authorization header is missing');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('Token is missing from Authorization header');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.log('Extracted Token:', token);

    // Fetch user details
    const userDetails = await getUserDetails(token);
    console.log('User Details:', userDetails);

    if (!userDetails.success || !userDetails.user?._id) {
      console.log('Invalid token or user not found');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const requestBody = await req.json();

    // Basic validation for request body
    if (!requestBody.pickupAddress || !requestBody.shippingAddress || !requestBody.packageDetails || !requestBody.truckOption || !requestBody.paymentMethod) {
      return NextResponse.json({ message: 'Bad Request: Missing required fields' }, { status: 400 });
    }

    const orderData = {
      ...requestBody,
      user: userDetails.user._id, // Attach the user ID to the order
    };

    const newOrder = new OrderModel(orderData);
    await newOrder.save();

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ message: 'Failed to create order' }, { status: 500 });
  }
}
