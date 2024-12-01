const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true,  min: 1,  max: 10  },
    feedback: { type: String },
    tourPackageId: { type: Schema.Types.ObjectId, ref: 'TourPackage', required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('Review', reviewSchema);
  