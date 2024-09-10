import mongoose, { Schema } from 'mongoose';

const DriverSchema = new mongoose.Schema({
  driverId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, 'Please provide a valid phone number']
    },
    email: {
      type: String,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    address: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'on_leave', 'inactive'],
    default: 'active'
  },
  assignedTruck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Truck',
    default: null
  },
  
  truckOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    default: null
  },
  performance: {
    ratings: {
      type: Number,
      min: 1,
      max: 5,
      default: 0
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        comment: String,
        rating: {
          type: Number,
          min: 1,
          max: 5
        }
      }
    ],
    tripHistory: [
      {
        tripId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Trip'
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  assignedRoutes: [
    {
      routeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route'
      },
      assignedDate: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

const Driver = mongoose.models.Driver || mongoose.model('Driver', DriverSchema);
export default Driver;
