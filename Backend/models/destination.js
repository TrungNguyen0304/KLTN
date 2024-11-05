const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    DestinationName: { type: String, require: true,unique: true },
    Images: { type: String, require: true },
    Tours: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Destination", destinationSchema);
