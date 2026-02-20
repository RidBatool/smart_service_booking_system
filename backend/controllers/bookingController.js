

/* Importing the Database Schema Model into the controller file */
const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");

/* Retrieving all service bookings from the database */
const getBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookingsList = await Booking.find({ userId });
    res.json({
      message: "All service bookings from the bookingsDB Database",
      bookings: bookingsList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* Get a single service booking matching a certain ID */
const getSingleBooking = async (req, res) => {
  try {
    const bookingID = req.params.id;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(bookingID)) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const singleBooking = await Booking.findOne({
      _id: bookingID,
      userId: userId,
    });

    if (!singleBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({
      message: "Service Booking Found.",
      booking: singleBooking,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* Adding a new service booking document to the database */
const createBooking = async (req, res) => {
  try {
    if (req.body.addInfo === "") {
      req.body.addInfo = "None"; // Set "addInfo" to a string value of "None" if no additional booking information is provided.
    }

    const userId = req.user._id;
    const bookingPayload = {
      ...req.body,
      userId,
      customerId: req.body.customerId || userId,
      providerId: req.body.providerId || null,
      serviceId: req.body.serviceId || null,
      date: req.body.date || req.body.bookingDate,
    };

    await Booking.create(bookingPayload);
    const bookingsList = await Booking.find({ userId });

    res.json({
      message: "New Service Booking Add",
      bookings: bookingsList,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* Updating an existing service booking document in the database */
const updateBooking = async (req, res) => {
  try {
    if (req.body.addInfo === "") {
      req.body.addInfo = "None"; // Set "addInfo" to a string value of "None" if no additional booking information is provided.
    }

    const bookingID = req.params.id;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(bookingID)) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const bookingUpdate = await Booking.findOneAndUpdate(
      { _id: bookingID, userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!bookingUpdate) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const bookingsList = await Booking.find({ userId });
    res.json({
      message: "Service Booking Updated",
      bookings: bookingsList,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* Deleting a service booking document from the database */
const deleteBooking = async (req, res) => {
  try {
    const bookingID = req.params.id;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(bookingID)) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const bookingDelete = await Booking.findOneAndDelete({ _id: bookingID, userId });
    if (!bookingDelete) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const bookingsList = await Booking.find({ userId });
    res.json({
      message: `Service Booking with id:${bookingID} has been removed from the database.`,
      bookings: bookingsList,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBookings,
  getSingleBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
