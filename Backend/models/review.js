const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const reviewSchema = new mongoose.Schema({
    booking_id: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    rating: { type: Number, required: true },
    feedback: { type: String },
   
  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('Review', reviewSchema);
  