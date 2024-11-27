const mongoose = require("mongoose");
const User = require("../models/user");
const TourPackage = require("../models/tourPackage");

const createBooking = async (req, res) => {
  try {
    const {
      userid,
      packageid,
      booking_date,
      travel_date,
      total,
      status,
      special_requests,
    } = req.body;

    const user = await User.findById(userid);
    const tourPackage = await TourPackage.findById(packageid);

    const newBooking = new Booking({
      userid,
      packageid,
      booking_date,
      travel_date,
      total,
      status,
      special_requests,
    });
    const savedBooking = await newBooking.save();

    const notificationMessage = `Xin chào ${user.firstname} ${user.lastname}, 
       đặt chỗ của bạn cho chuyến tham quan '${tourPackage.package_name}' đã được xác nhận. 
       
      // Ngày đi du lịch: ${travel_date}, Tổng cộng: ${total} VND.`;

    const newNotification = new Notificationv({
      userid,
      message: notificationMessage,
      bookingid: savedBooking._id,
    });
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
      message: "Đặt chỗ đã được tạo thành công và thông báo đã được gửi!",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Đã xảy ra lỗi khi tạo đặt chỗ và thông báo.",
        error: error.message,
      });
  }
};
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Người dùng không tìm thấy." });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy thông tin người dùng.",
      error: error.message,
    });
  }
};

const getUserAndTourPackage = async (req, res) => {
  try {
    const { userId, packageId } = req.params;

    console.log("Đã nhận userId:", userId);
    console.log("Đã nhận packageId:", packageId);

    // Kiểm tra nếu userId và packageId đã được cung cấp
    if (!userId || !packageId) {
      return res.status(400).json({
        success: false,
        message: "Cần có cả userId và packageId.",
      });
    }

    // Kiểm tra định dạng ObjectId hợp lệ
    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(packageId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Định dạng ObjectId không hợp lệ cho userId hoặc packageId.",
      });
    }

    // Lấy thông tin người dùng
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng.",
      });
    }

    // Lấy thông tin gói tour
    const tourPackage = await TourPackage.findById(packageId).exec();
    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy gói tour.",
      });
    }

    // Gửi kết quả kết hợp
    res.status(200).json({
      success: true,
      data: { user, tourPackage },
    });
  } catch (error) {
    console.error(
      "Đã xảy ra lỗi khi lấy thông tin người dùng và gói tour:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy dữ liệu.",
      error: error.message,
    });
  }
};

const getTourPackageById = async (req, res) => {
  try {
    const { id } = req.params;

    const tourPackage = await TourPackage.findById(id);

    if (!tourPackage) {
      return res
        .status(404)
        .json({ success: false, message: "Gói tour không tìm thấy." });
    }

    res.status(200).json({
      success: true,
      data: tourPackage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy thông tin gói tour.",
      error: error.message,
    });
  }
};

const getAllTourPackages = async (req, res) => {
  try {
    const tourPackages = await TourPackage.find();

    if (!tourPackages || tourPackages.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Không có gói tour nào." });
    }

    res.status(200).json({
      success: true,
      data: tourPackages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy tất cả các gói tour.",
      error: error.message,
    });
  }
};



module.exports = {
  getUserAndTourPackage,
  // getBookingByUserId,
  getUserById,
  getTourPackageById,
  getAllTourPackages,
};
