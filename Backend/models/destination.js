const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    DestinationName: { type: String, require: true,unique: true },
    Images: { type: String, require: true },
    Description: { type: String, require: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' } // New field  
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Destination", destinationSchema);
