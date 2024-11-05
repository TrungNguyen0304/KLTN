const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
});

module.exports = mongoose.model("Location", LocationSchema);
