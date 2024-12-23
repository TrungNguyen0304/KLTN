const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    minlength: 5,  // Ensure message has a minimum length of 5
  },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
},

  {
    timestamps: true,
  });

module.exports = mongoose.model('Message', messageSchema);
