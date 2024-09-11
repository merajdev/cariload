import dbConnect from "@/lib/mongodb";
import Truck from "@/models/truck.model";
import { getUserDetails } from "@/utils/getUserDetails";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        const authHeader = req.headers.get('Authorization') || '';
        const token = authHeader.split(' ')[1];

        if (!token) {
            return NextResponse.json({ success: false, error: 'No token provided' }, { status: 401 });
        }

        const userResponse = await getUserDetails(token);

        if (!userResponse.success) {
            return NextResponse.json({ success: false, error: userResponse.error }, { status: 401 });
        }

        const user = userResponse.user;

        if (user.role !== 'owner') {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const trucks = await Truck.find({ owner: user._id });
        
        return NextResponse.json({ success: true, trucks }, { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ success: false, error: err }), { status: 500 });
    }
}

export async function POST(req: Request) {

    try {
        await dbConnect();

        const truckData = await req.json();

        const authHeader = req.headers.get('Authorization') || '';
        const token = authHeader.split(' ')[1];

        if (!token) {
            return new Response(JSON.stringify({ success: false, error: 'No token provided' }), { status: 401 });
        }

        const userResponse = await getUserDetails(token);

        if (!userResponse.success) {
            return new Response(JSON.stringify({ success: false, error: userResponse.error }), { status: 401 });
        }

        const user = userResponse.user;

        if (user.role !== 'owner') {
            return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401 });
        }

        const { truckId, driverId, license, model, capacity, status, gpsLocation, maintenanceSchedule } = truckData;

        const truck = await Truck.create({
            owner: user._id,
            truckId,
            driverId,
            license,
            model,
            capacity,
            status,
            gpsLocation,
            maintenanceSchedule,
        });

        return new Response(JSON.stringify({ success: true, truck }), { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ success: false, error: err }), { status: 500 });
    }
}