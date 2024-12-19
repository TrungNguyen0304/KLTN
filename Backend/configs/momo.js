const mongoose = require("mongoose");
const axios = require("axios");
const crypto = require("crypto");
const Payment = require("../models/payment");
const Notificationv = require("../models/notificationv");
const tourPackage = require("../models/tourPackage");
const notificationv = require("../models/notificationv");
var accessKey = process.env.MOMO_ACCESS_KEY;
var secretKey = process.env.MOMO_SECRET_KEY;

const payment = async (req, res) => {
  const { id } = req.params;
  const { totalPrice, userId, totalPeople } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid tourPackage ID" });
  }

  try {
    const tourPackageData = await tourPackage.findById(id);
    if (!tourPackageData) {
      return res
        .status(404)
        .json({ success: false, message: "Tour package not found" });
    }

    const orderInfo = `Payment for ${tourPackageData.package_name}`;
    const partnerCode = "MOMO";
    const redirectUrl = "http://localhost:3000/";
    const ipnUrl =
      "https://195f-2001-ee0-4c25-9f20-7d04-d7d6-97a5-c36c.ngrok-free.app/callback";
    const requestType = "payWithMethod";
    const amount = totalPrice;
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = "";
    const autoCapture = true;
    const lang = "vi";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");

    const requestBody = JSON.stringify({
      partnerCode,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture,
      extraData,
      signature,
    });

    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };

    const result = await axios(options);
    const code = `ORDER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    if (result.data.resultCode === 0) {
      const newPayment = new Payment({
        packageId: id,
        amount: totalPrice,
        status: "complete",
        order_id: orderId,
        method: "MoMo",
        userId,
        totalPeople,
        code,
      });

      await newPayment.save();

      // Tạo thông báo cho user thanh toán thành công
      const notification = new Notificationv({
        userId,
        message: `Thanh toán thành công cho gói tour: ${tourPackageData.package_name}`,
        paymentid: newPayment._id,
      });

      await notification.save();

      // Kiểm tra và chuyển thông tin nếu có userGuideId
      if (tourPackageData.userGuideId) {
        const tourGuideNotification = new Notificationv({
          userId: tourPackageData.userGuideId, // Gửi thông báo đến tourGuideId
          message: `Bạn đã nhận được một thanh toán cho gói tour: ${tourPackageData.package_name}`,
          paymentid: newPayment._id,
        });

        await tourGuideNotification.save();
      }

      return res.status(200).json(result.data);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Error during payment processing:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};



const callback = async (req, res) => {
  try {
    if (req.body) {
      console.log("Callback received:", req.body);

      // Kiểm tra kết quả thanh toán
      if (req.body.resultCode === 0) {
        const { orderId, userId } = req.body;

        // Cập nhật trạng thái thanh toán
        const payment = await Payment.findOneAndUpdate(
          { order_id: orderId },
          { status: "complete" },
          { new: true }
        );

        if (payment) {
          // Tạo thông báo
          const notification = new notificationv({
            userId: userId,
            message: "Thanh toán thành công cho đơn hàng: " + orderId,
            paymentid: payment._id, // Gắn tham chiếu đến Payment
          });

          // Lưu thông báo vào database
          await notification.save();

          // Gắn notificationId vào thanh toán
          payment.notificationid = notification._id;
          await payment.save();

          // Gửi phản hồi
          return res
            .status(200)
            .json({ success: true, message: "Thanh toán thành công." });
        } else {
          return res
            .status(400)
            .json({
              success: false,
              message: "Không tìm thấy giao dịch thanh toán.",
            });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Thanh toán thất bại." });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Dữ liệu callback không hợp lệ." });
    }
  } catch (error) {
    console.error("Error during callback:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const checkPaymentStatus = async (req, res) => {
  const { id: packageId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(packageId)) {
      return res.status(400).json({
        success: false,
        message: "ID gói tour không hợp lệ.",
      });
    }

    const payment = await Payment.findOne({ packageId: packageId });

    if (!payment) {
      console.log(`Không tìm thấy thanh toán cho ID gói tour: ${packageId}`);
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy thông tin thanh toán cho gói tour này.",
        packageId,
      });
    }

    return res.status(200).json({
      success: true,
      status: payment.status,
      packageId,
    });
  } catch (error) {
    console.error("Lỗi khi kiểm tra trạng thái thanh toán:", error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi kiểm tra trạng thái thanh toán.",
    });
  }
};

const getAll = async (req, res) => {
  try {
    const payments = await Payment.find({})
      .populate("userId")
      .populate("packageId");

    res.status(200).json({
      message: "Đã đặt chỗ thành công!",
      payments: payments,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Lỗi khi tải đặt chỗ", error: error.message });
  }
};
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the booking by its ID
    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
      return res.status(404).json({ message: "Không tìm thấy đặt chỗ" });
    }

    // Optionally, delete the associated notifications if necessary
    await Notificationv.deleteMany({ paymentid: id });

    res.status(200).json({
      message: "Đã xóa đặt chỗ thành công!",
      paymentid: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi xóa đặt chỗ",
      error: error.message,
    });
  }
};
const getBookingByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const payment = await Payment.findOne({ code })
      .populate("userId")
      .populate("packageId");

    if (!payment) {
      return res.status(404).json({ message: "Không tìm thấy đặt chỗ" });
    }

    res.status(200).json({
      message: "Đã lấy thông tin đặt chỗ thành công!",
      payment: payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi khi tìm kiếm thông tin đặt chỗ",
      error: error.message,
    });
  }
};

const getPaymentsByUser = async (req, res) => {
  try {
    const { userid } = req.params;

    // Kiểm tra tính hợp lệ của userId
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res
        .status(400)
        .json({ success: false, message: "userId không hợp lệ" });
    }

    // Truy vấn payments theo userId
    const payments = await Payment.find({ userId: userid })
      .populate("userId")
      .populate("packageId");

    if (!payments.length) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy lịch sử thanh toán cho user này.",
      });
    }

    // Xử lý mỗi payment trong payments
    const populatedPayments = await Promise.all(
      payments.map(async (payment) => {
        const packageId = payment.packageId ? payment.packageId : null;

        const populatedPayment = {
          ...payment.toObject(),
          packageId: packageId
            ? await tourPackage.findById(packageId)
                .populate("locationId")  
                .populate("durations")
                .populate("userGuideId")  
                : null,
        };

        return populatedPayment;
      })
    );

    res.status(200).json({
      success: true,
      message: "Lấy lịch sử thanh toán thành công!",
      payments: populatedPayments,
    });
  } catch (error) {
    console.error("Lỗi khi tải lịch sử thanh toán:", error.message);
    res.status(500).json({
      success: false,
      message: "Lỗi khi tải lịch sử thanh toán",
      error: error.message,
    });
  }
};



module.exports = {
  payment,
  callback,
  checkPaymentStatus,
  getAll,
  deleteBooking ,
  getBookingByCode,
  getPaymentsByUser
};
