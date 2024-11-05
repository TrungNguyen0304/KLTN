const Booking = require("../models/booking");
const bcrypt = require("bcrypt");

const createBooking = async (req, res) => {
  try {
    const { user_id, package_id, booking_date, travel_date, total, status } = req.body;
    const newBooking = new Booking({
      user_id,
      package_id,
      booking_date,
      travel_date,
      total,
      status,
    });
    const savedBooking = await newBooking.save();
    res.status(201).json({
      success: true,
      data: savedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Đã xảy ra lỗi khi tạo lượt đặt chỗ.',
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
};
