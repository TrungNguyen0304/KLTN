const mongoose = require('mongoose');

const tourGuideSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  images: { type: String, require: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  tourPackageId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage' }],

},
  {
    timestamps: true,
  });

module.exports = mongoose.model('TourGuide', tourGuideSchema);
