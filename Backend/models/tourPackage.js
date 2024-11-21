const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const tourPackageSchema = new mongoose.Schema({
    package_name: { type: String, required: true },
    price: { type: Number, required: true },
    incAndExc: { type: String,required: true },
    description: { type: String },
    image: { type: String,required: false  },
    groupImages: { type: [String], required: true }, 
    destinationId: { type: Schema.Types.ObjectId, ref: 'Destination' },
    tourGuideId: { type: Schema.Types.ObjectId, ref: 'TourGuide', required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    durations: { type: [Schema.Types.ObjectId], ref: 'Duration', required: true } 
  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('TourPackage', tourPackageSchema);