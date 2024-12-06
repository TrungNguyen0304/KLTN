const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const tourPackageSchema = new mongoose.Schema({
    package_name: { type: String, required: true },
    pricechildren_price: { type: Number, required: true },
    adult_price: { type: Number, required: true },
    incAndExc: { type: String,required: true },
    description: { type: String },
    image: { type: String,required: false  },
    groupImages: { type: [String], required: true },  
    totalReviews: { type: Number, default: 0 },   // Tổng số đánh giá
    totalRating: { type: Number, default: 0 },    // Tổng điểm đánh giá
    averageRating: { type: Number, default: 0 },  // Điểm trung bình đánh giá
    reviewId: { type: Schema.Types.ObjectId, ref: 'Review' },
    destinationId: { type: Schema.Types.ObjectId, ref: 'Destination' },
    tourGuideId: { type: Schema.Types.ObjectId, ref: 'TourGuide', required: true },
    locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    durations: { type: [Schema.Types.ObjectId], ref: 'Duration', required: true } 
  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('TourPackage', tourPackageSchema);