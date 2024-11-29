const mongoose = require("mongoose"); 
const Booking = require("../models/booking"); 

const createBooking = async (req, res) => {
  try {
    const {
      userId,
      packageId,
      total,
      status,
      special_requests,
    } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000); 

    const newBooking = new Booking({
      userId,
      packageId,
      total,
      status,
      special_requests,
      code,
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Đã tạo đặt chỗ thành công!',
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tạo đặt chỗ', error: error.message });
  }
};
const getAll = async (req, res) => {
  try {
    const bookings = await Booking.find({})
    .populate("userId")
    .populate("packageId")

    res.status(200).json({
      message: 'Đã đặt chỗ thành công!',
      bookings: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi khi tải đặt chỗ', error: error.message });
  }
};
const getBookingByCode = async (req, res) => {
  try {
    const { code } = req.params;
    
    const booking = await Booking.findOne({ code })
      .populate("userId")
      .populate("packageId");

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy đặt chỗ" });
    }

    res.status(200).json({
      message: "Đã lấy thông tin đặt chỗ thành công!",
      booking: booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tìm kiếm thông tin đặt chỗ", error: error.message });
  }
};
module.exports = {
  createBooking,
  getAll,
  getBookingByCode
}
