const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema(
  {
    DestinationName: { type: String, require: true, unique: true },
    Images: { type: String, require: true },
    Description: { type: String, require: true },
<<<<<<< HEAD
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' } // New field  
=======
>>>>>>> bf0632b95dedb3264002e1f626cba0e0fc9bd649
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Destination", destinationSchema);
