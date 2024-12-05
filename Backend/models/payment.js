const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    order_id: {type: String, required: true},
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
    },    amount: { type: Number, required: true },
    method: { type: String, required: true },
    status: { type: String, default: "pending" },
    order_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
