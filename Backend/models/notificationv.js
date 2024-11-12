const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    bookingid: { type: Schema.Types.ObjectId, ref: "Booking" }, 
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Notificationv", notificationSchema);
