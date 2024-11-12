const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const tourPackageSchema = new mongoose.Schema({
    package_name: { type: String, required: true },
    description: { type: String },
    images: { type: String,required: false  },
    groupImages: { type: [String], required: false },
    price: { type: Number, required: true },
    inclusions_exclusions: { type: Number, required: true },
    itinerary: { type: String },
    destinationid: { type: Schema.Types.ObjectId, ref: 'Destination', required: true },
    tourGuideid: { type: Schema.Types.ObjectId, ref: 'TourGuide', required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location',required: true } ,
    durations: { type: mongoose.Schema.Types.ObjectId, ref: 'Duration',required: true } ,
  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('TourPackage', tourPackageSchema);
  