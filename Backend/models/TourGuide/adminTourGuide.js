const mongoose = require('mongoose');

const AdminTourGuideSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  images:{type: String, require: true},
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
},
{
  timestamps: true,
});

module.exports = mongoose.model('AdminTourGuide', AdminTourGuideSchema);
