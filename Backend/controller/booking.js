const mongoose = require("mongoose");
const Booking = require("../models/booking");
const Notificationv = require("../models/notificationv");
const TourPackage = require("../models/tourPackage");
const User = require("../models/user");

// Hàm tạo thông báo
const createNotification = async (user, tourPackage, bookingId) => {
  const travel_date = new Date(); // You can adjust this to match the actual travel date.
  const notificationMessage = `Xin chào ${user.firstname} ${user.lastname}, 
    đặt chỗ của bạn cho chuyến tham quan '${tourPackage.package_name}' đã được xác nhận. 

    Bấm vào để xem chi tiết ngày đi du lịch.`;

  const newNotification = new Notificationv({
    userId: user._id,
    message: notificationMessage,
    bookingid: bookingId,
    travel_date: travel_date, // Optional: Include travel date in notification if needed
  });

  await newNotification.save();
};

// Hàm tạo đặt chỗ
const createBooking = async (req, res) => {
  try {
    const { userId, packageId, total, quantity, status, special_requests, selectedDuration } = req.body;

    const code = Math.floor(100000 + Math.random() * 900000);

    const newBooking = new Booking({
      userId,
      packageId,
      total,
      quantity,
      status,
      special_requests,
      code,
      selectedDuration,
    });

    await newBooking.save();

    const user = await User.findById(userId);
    const tourPackage = await TourPackage.findById(packageId);

    // Gửi thông báo sau khi tạo đặt chỗ
    await createNotification(user, tourPackage, newBooking._id);

    // Trả về kết quả thành công
    res.status(201).json({
      message: "Đã tạo đặt chỗ thành công và thông báo đã được gửi!",
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi tạo đặt chỗ", error: error.message });
  }
};


const getAll = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("userId")
      .populate("packageId");

    res.status(200).json({
      message: "Đã đặt chỗ thành công!",
      bookings: bookings,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Lỗi khi tải đặt chỗ", error: error.message });
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
    res.status(500).json({
      message: "Lỗi khi tìm kiếm thông tin đặt chỗ",
      error: error.message,
    });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the booking by its ID
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy đặt chỗ" });
    }

    // Optionally, delete the associated notifications if necessary
    await Notificationv.deleteMany({ bookingid: id });

    res.status(200).json({
      message: "Đã xóa đặt chỗ thành công!",
      bookingId: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi xóa đặt chỗ",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAll,
  getBookingByCode,
  deleteBooking
};
