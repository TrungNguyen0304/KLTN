const Booking = require("../models/booking");
const User = require("../models/user"); 
const TourPackage = require("../models/tourPackage"); 
const Notificationv = require("../models/notificationv");

const createBooking = async (req, res) => {
  try {
    const { userid, packageid, booking_date, travel_date, total, status, special_requests } = req.body;

    const user = await User.findById(userid);
    const tourPackage = await TourPackage.findById(packageid);

    const newBooking = new Booking({ userid, packageid, booking_date, travel_date, total, status, special_requests });
    const savedBooking = await newBooking.save();

    const notificationMessage = `Xin chào ${user.firstname} ${user.lastname}, 
       đặt chỗ của bạn cho chuyến tham quan '${tourPackage.package_name}' đã được xác nhận. 
       
      // Ngày đi du lịch: ${travel_date}, Tổng cộng: ${total} VND.`;

    const newNotification = new Notificationv({ userid, message: notificationMessage, bookingid: savedBooking._id });
    const savedNotification = await newNotification.save();

    savedBooking.notificationid = savedNotification._id;
    await savedBooking.save();

    res.status(201).json({
      success: true,
      data: {
        booking: savedBooking,
        user: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
        tour: {
          name: tourPackage.name,
          description: tourPackage.description,
          price: tourPackage.price,
        },
      },
      message: 'Đặt chỗ đã được tạo thành công và thông báo đã được gửi!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Đã xảy ra lỗi khi tạo đặt chỗ và thông báo.', error: error.message });
  }
};
const getTourPackageById = async (req, res) => {
  try {
    const {id } = req.params;

    const tourPackage = await TourPackage.findById(id);

    if (!tourPackage) {
      return res.status(404).json({ success: false, message: "Tour package not found." });
    }

    res.status(200).json({
      success: true,
      data: tourPackage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while retrieving the tour package.", error: error.message });
  }
};
const getAllTourPackages = async (req, res) => {
  try {
    const tourPackages = await TourPackage.find();

    if (!tourPackages || tourPackages.length === 0) {
      return res.status(404).json({ success: false, message: "No tour packages found." });
    }

    res.status(200).json({
      success: true,
      data: tourPackages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while retrieving all tour packages.", error: error.message });
  }
};


module.exports = {
  createBooking,
  getTourPackageById,
  getAllTourPackages
};
