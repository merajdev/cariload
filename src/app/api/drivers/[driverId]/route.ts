import dbConnect from "@/lib/mongodb";
import Driver from "@/models/driver.model";
import { getUserDetails } from "@/utils/getUserDetails";
import { NextRequest } from "next/server";



export async function DELETE(req: NextRequest, {params}: {params: {driverId: string}}) {
    try {
        await dbConnect();

        const authHeader = req.headers.get('Authorization') || '';
        const token = authHeader.split(' ')[1];

        if (!token) {
            return new Response(JSON.stringify({success: false, error: 'No token provided'}), {status: 401});
        }

        const userResponse = await getUserDetails(token);

        if (!userResponse.success) {
            return new Response(JSON.stringify({success: false, error: userResponse.error}), {status: 401});
        }

        const user = userResponse.user;

        if (user.role !== 'owner') {
            return new Response(JSON.stringify({success: false, error: 'Unauthorized'}), {status: 401});
        }

        const {driverId} = params;

        if (!driverId) {
            return new Response(JSON.stringify({success: false, error: 'Driver ID is required'}), {status: 400});
        }

        const driver = await Driver.findOneAndDelete({owner: user._id, _id: driverId});

        if (!driver) {
            return new Response(JSON.stringify({success: false, error: 'Driver not found'}), {status: 404});
        }

        return new Response(JSON.stringify({success: true, message: 'Driver deleted successfully'}), {status: 200});
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({success: false, error: err}), {status: 500});
    }
}

export async function PUT(req: NextRequest, {params}: {params: {driverId: string}}) {
    try {
        await dbConnect();

        const authHeader = req.headers.get('Authorization') || '';
        const token = authHeader.split(' ')[1];

        if (!token) {
            return new Response(JSON.stringify({success: false, error: 'No token provided'}), {status: 401});
        }

        const userResponse = await getUserDetails(token);

        if (!userResponse.success) {
            return new Response(JSON.stringify({success: false, error: userResponse.error}), {status: 401});
        }

        const user = userResponse.user;

        if (user.role !== 'owner') {
            return new Response(JSON.stringify({success: false, error: 'Unauthorized'}), {status: 401});
        }

        const {driverId} = params;

        if (!driverId) {
            return new Response(JSON.stringify({success: false, error: 'Driver ID is required'}), {status: 400});
        }

        const driverData = await req.json();

        const driver = await Driver.findOne({owner: user._id, _id: driverId});

        if (!driver) {
            return new Response(JSON.stringify({success: false, error: 'Driver not found'}), {status: 404});
        }

        const updatedDriver = await Driver.findOneAndUpdate({owner: user._id, _id: driverId}, driverData, {new: true});

        return new Response(JSON.stringify({success: true, driver: updatedDriver}), {status: 200});
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({success: false, error: err}), {status: 500});
    }
}