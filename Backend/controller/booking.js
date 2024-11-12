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

module.exports = {
  createBooking,
};
