const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const bookingDetailsSchema = new mongoose.Schema(
  {
    bookingid: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    age: { type: Number },
    special_requests: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BookingDetails", bookingDetailsSchema);
