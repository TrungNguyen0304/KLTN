const mongoose = require("mongoose");
const Notificationv = require("../models/notificationv");
const TourPackage = require("../models/tourPackage");  
const notificationv = require("../models/notificationv");

const getNotificationsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "userId không hợp lệ" });
    }

    const notifications = await notificationv.find({ userId })
      .populate("paymentid")
      
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, notifications });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi máy chủ", error: err });
  }
};

const getNotificationById = async (req, res) => {
  const { notificationId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return res.status(400).json({ success: false, message: "notificationId không hợp lệ" });
    }

    const notification = await Notificationv.findById(notificationId)
      .populate("userId")   
      .populate("paymentid") 
      .exec(); 

    if (!notification) {
      return res.status(404).json({ success: false, message: "Thông báo không tìm thấy" });
    }

    const packageId = notification.paymentid ? notification.paymentid.packageId : null;

    const populatedNotification = {
      ...notification.toObject(),
      packageId: packageId
        ? await TourPackage.findById(packageId)
            .populate("locationId", "firstname")  
            .populate(  "durations") : null
    };

    res.status(200).json({ success: true, notification: populatedNotification });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi máy chủ", error: err });
  }
};

const deleteAllNotificationsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "userId không hợp lệ" });
    }

    const result = await Notificationv.deleteMany({  userId });
    res.status(200).json({
      success: true,
      message: `${result.deletedCount} thông báo đã được xóa`,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Lỗi máy chủ", error: err });
  }
};


const deleteNotificationById = async (req, res) => {
  const { notificationId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return res.status(400).json({ success: false, message: "notificationId không hợp lệ" });
    }

    const notification = await Notificationv.findByIdAndDelete(notificationId);

    if (!notification) {
      return res.status(404).json({ success: false, message: "Thông báo không tìm thấy" });
    }

    res.status(200).json({ success: true, message: "Thông báo đã được xóa" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Lỗi máy chủ", error: err });
  }
};

module.exports = { 
  getNotificationsByUserId,
   getNotificationById ,
   deleteAllNotificationsByUserId,
   deleteNotificationById
  };
