const mongoose = require("mongoose");
const axios = require("axios");
const crypto = require("crypto");
const Payment = require("../models/payment");
const tourPackage = require("../models/tourPackage");
var accessKey = process.env.MOMO_ACCESS_KEY;
var secretKey = process.env.MOMO_SECRET_KEY;

const payment = async (req, res) => {
  const { id } = req.params;
  const { total } = req.body;

  console.log("tourPackage ID:", id);
  console.log("Total:", total);

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

    console.log("Tour Package found:", tourPackageData);

    const orderInfo = `Payment for ${tourPackageData.package_name}`;
    const partnerCode = "MOMO";
    const redirectUrl = "http://localhost:3000/";
    const ipnUrl = "http://b628-116-98-249-88.ngrok-free.app/callback";
    const requestType = "payWithMethod";
    const amount = total;
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = "";
    const orderGroupId = "";
    const autoCapture = true;
    const lang = "vi";

    const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

    // Tạo signature

    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);
    // Tạo body gửi API MoMo
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
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

    if (result.data.resultCode === 0) {
      const newPayment = new Payment({
        packageId: id,
        amount: total,
        status: "pending",
        order_id: orderId,
        method: "MoMo",
      });

      await newPayment.save();
      console.log("Payment saved successfully:", newPayment);

      return res.status(200).json(result.data);
    } else {
      console.error("MoMo Payment Failed:", result.data);
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
      console.log("callback received:", req.body);

      if (req.body.resultCode === 0) {
        const { orderId } = req.body;

        const payment = await Payment.findOneAndUpdate(
          { order_id: orderId },
          { status: true },
          { new: true }
        );
        if (payment) {
          return res
            .status(200)
            .json({ success: true, message: "Payment successful." });
        }
      }

      return res
        .status(400)
        .json({ success: false, message: "Payment failed." });
    }
  } catch (error) {
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

module.exports = {
  payment,
  callback,
  checkPaymentStatus,
};
