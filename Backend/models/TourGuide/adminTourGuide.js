const mongoose = require('mongoose');

const AdminTourGuideSchema = new mongoose.Schema({
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  tourPackageId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage' }],
  destinationId:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
  durationsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Duration', required: true }],
  bookingId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true }],
  userId:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
},
  {
    timestamps: true,
  });

module.exports = mongoose.model('AdminTourGuide', AdminTourGuideSchema);
