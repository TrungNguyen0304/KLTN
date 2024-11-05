const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const tourGuideSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  
},
{
  timestamps: true,
});

module.exports = mongoose.model('TourGuide', tourGuideSchema);
