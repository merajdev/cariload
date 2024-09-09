import mongoose, { Schema } from 'mongoose';

const TruckSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        required: true,
    },
    truckId: {
        type: String,
        required: true,
        unique: true,
    },
    license: {
        type: String,
        required: true,
        unique: true,
    },
    model: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'on-trip', 'under maintenance'],
        default: 'available',
    },
    gpsLocation: {
        type: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        required: false,
    },
    maintenanceSchedule: {
        lastMaintenance: {
            type: Date,
            required: true,
        },
        nextMaintenance: {
            type: Date,
            required: true,
        },
        recentRepairs: {
            type: String,
            required: false,
        },
    },
});

const Truck = mongoose.models.Truck || mongoose.model('Truck', TruckSchema);
export default Truck;
