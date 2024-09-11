import dbConnect from "@/lib/mongodb";
import Truck from "@/models/truck.model";
import { getUserDetails } from "@/utils/getUserDetails";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { truckId: string } }) {
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

        const { truckId } = params;

        if (!truckId) {
            return NextResponse.json({ success: false, error: 'Truck ID is required' }, { status: 400 });
        }

        const truck = await Truck.findOneAndDelete({ owner: user._id, _id: truckId });

        if (!truck) {
            return NextResponse.json({ success: false, error: 'Truck not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: 'Truck deleted successfully' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: err }, { status: 500 });
    }
}
