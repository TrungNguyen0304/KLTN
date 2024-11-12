const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const bookingSchema = new mongoose.Schema(
  {
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
    packageid: {
      type: Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
    },
    booking_date: { type: Date, required: true },
    travel_date: { type: Date, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true },
    special_requests: { type: String, required: true },
    notificationid: {type: Schema.Types.ObjectId,ref: "Notification",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
