const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    order_id: { type: String, required: true },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
    },
    amount: { type: Number, required: true },
    notificationid: { type: Schema.Types.ObjectId, ref: "Notification" },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    method: { type: String, required: true },
    code: { type: String, unique: true, required: true },
    totalPeople: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "complete", "failed"],
      default: "pending",
    },
    userGuideId: { type: Schema.Types.ObjectId, ref: 'User' },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
