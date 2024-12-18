const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tourPackageSchema = new mongoose.Schema({
  package_name: { type: String, required: true },
  pricechildren_price: { type: Number, required: true },
  adult_price: { type: Number, required: true },
  incAndExc: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: false },
  groupImages: { type: [String], required: true },
  totalReviews: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' },
  destinationId: { type: Schema.Types.ObjectId, ref: 'Destination' },
  tourGuideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TourGuide",  // Liên kết tới bảng TourGuide
  },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  durations: { type: [Schema.Types.ObjectId], ref: 'Duration', required: true },
  userGuideId: { type: Schema.Types.ObjectId, ref: 'User' },
},
  {
    timestamps: true,
  });

module.exports = mongoose.model('TourPackage', tourPackageSchema);