const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const bookingSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    package_id: {
      type: Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
    },
    booking_date: { type: Date, required: true },
    travel_date: { type: Date, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
