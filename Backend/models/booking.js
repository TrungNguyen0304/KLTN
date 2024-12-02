const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
    },
    total: { type: Number, required: true },
    code: { type: Number, required: true },
    quantity: { type: Number, required: true },
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
