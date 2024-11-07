  const mongoose = require("mongoose");

  const destinationSchema = new mongoose.Schema(
    {
      DestinationName: { type: String, required: true},
      Images: { type: String, required: true },
      GroupImages: [{ type: String, required: true }], // Trường chứa nhiều ảnh
      Description: { type: String, required: true },
      locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location',required: true } // Ensure 'Location' model exists
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model("Destination", destinationSchema);
  