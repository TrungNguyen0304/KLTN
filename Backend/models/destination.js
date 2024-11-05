const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    DestinationName: { type: String, required: true},
    Images: { type: String, required: true },
    Description: { type: String, required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' } // Ensure 'Location' model exists
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Destination", destinationSchema);
