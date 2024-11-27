const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const reviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    feedback: { type: String },
    bookingid: { type: Schema.Types.ObjectId, ref: 'booking', required: true },
    userid: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
   
  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('Review', reviewSchema);
  