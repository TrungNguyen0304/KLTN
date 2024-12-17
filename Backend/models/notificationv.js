const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    paymentid: { type: Schema.Types.ObjectId, ref: "Payment" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notificationv", notificationSchema);
