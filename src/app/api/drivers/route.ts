import dbConnect from "@/lib/mongodb";
import Driver from "@/models/driver.model";
import Truck from "@/models/truck.model";
import { getUserDetails } from "@/utils/getUserDetails";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    //Add Driver data to the database with the reference of the owner
    try {
        await dbConnect();

        const driverData = await req.json();

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

        const driverExists = await Driver.findOne({ driverId: driverData.driverId });

        if (driverExists) {
            return new Response(JSON.stringify({ success: false, error: 'Driver already exists' }), { status: 400 });
        }

        const truckDetail = await Truck.findOne({ owner: user._id});

        if (!truckDetail) {
            return new Response(JSON.stringify({ success: false, error: 'Truck not found' }), { status: 404 });
        }

        const  owner = user._id;
        const truckId = truckDetail._id;

        if(!(truckId === driverData.assignedTruck)) {
            return new Response(JSON.stringify({ success: false, error: 'Truck ID does not exist' }), { status: 404 });
        }

        const driverDetail = {
            owner, // explicitly include owner
            truckId,
            driverId: driverData.driverId,
            name: driverData.name,
            contact: {
                phone: driverData.contact.phone,
                email: driverData.contact.email,
                address: '',
            },
            status: driverData.status,
            assignedTruck: driverData.assignedTruck,
            ratings: 0,
            tripHistory: [],
        };

        const driver = await Driver.create(driverDetail); // pass driverData explicitly

        return new Response(JSON.stringify({ success: true, driver }), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ success: false, error: err }), { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    //Get all the drivers data from the database with the reference of the owner
    try {
        await dbConnect();

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
            return new Response(JSON.stringify({ success: false, error: 'Unauthorized User' }), { status: 401 });
        }

        const drivers = await Driver.find({ owner: user._id });

        return new Response(JSON.stringify({ success: true, drivers }), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ success: false, error: err }), { status: 500 });
    }
}