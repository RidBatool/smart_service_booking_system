
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: String,
    },
    customerFirstName: {
      type: String,
      required: true,
    },
    customerLastName: {
      type: String,
      required: true,
    },
    customerContactNumber: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    vehicleMake: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    vehicleReg: {
      type: String,
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    serviceOption: {
      type: String,
      required: true,
    },
    addInfo: {
      type: String,
    },
    status: {
      type: String,
      default: "SCHEDULED",
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Booking", bookingSchema);
