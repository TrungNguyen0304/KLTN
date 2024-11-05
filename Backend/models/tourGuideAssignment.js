const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const tourGuideAssignmentSchema = new mongoose.Schema({
    guide_id: { type: Schema.Types.ObjectId, ref: 'TourGuide', required: true },
    package_id: { type: Schema.Types.ObjectId, ref: 'TourPackage', required: true },
    assignment_date: { type: Date, required: true },
    
  },
  {
    timestamps: true,
  });
  
  module.exports = mongoose.model('TourGuideAssignment', tourGuideAssignmentSchema);
  