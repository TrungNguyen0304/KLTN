const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const LocationSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  destinationId: { type: Schema.Types.ObjectId, ref: "Destination", }
});

module.exports = mongoose.model("Location", LocationSchema);
