// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    phone: String,

    tourId: mongoose.Schema.Types.ObjectId,
    tourTitle: String,
    tourType: String, // group | individual

    travelDate: String,
    pricePerPerson: Number,
    persons: Number,
    totalAmount: Number,

    note: String,
    paymentType: {
      type: String,
      default: "full"
    },
    payableAmount: {
      type: Number,
      default: 0
    },
    remainingAmount: {
      type: Number,
      default: 0
    },
    selectedSeats: {
      type: [Number],
      default: []
    },

    selectedVehicleId: {
      type: String,
      default: null
    },
    selectedVehicleName: {
      type: String,
      default: null
    },
    selectedVehiclePricePerKm: {
      type: Number,
      default: null
    },
    selectedVehicleSeats: {
      type: Number,
      default: null
    },
    selectedVehicleType: {
      type: String,
      default: null
    },

    status: {
      type: String,
      default: "pending" // pending | confirmed | cancelled
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
