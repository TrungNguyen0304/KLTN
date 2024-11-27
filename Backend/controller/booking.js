const mongoose = require("mongoose"); 
const Booking = require("../models/booking"); 

const createBooking = async (req, res) => {
  try {
    const {
      userId,
      packageId,
      booking_date,
      travel_date,
      total,
      status,
      special_requests,
    } = req.body;

    // Create a new booking instance
    const newBooking = new Booking({
      userId,
      packageId,
      booking_date,
      travel_date,
      total,
      status,
      special_requests,
    });

    // Save the booking to the database
    await newBooking.save();

    // Return success response
    res.status(201).json({
      message: 'Booking created successfully!',
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

module.exports = {
  createBooking
}
