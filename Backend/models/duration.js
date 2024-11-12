const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DurationSchema = new mongoose.Schema({
  itinerary: [
    {
      day: { type: String, required: true },
      activity: { type: String, required: true },
    },
  ],
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  tourPackageId: { type: Schema.Types.ObjectId, ref: "tourPackage" },
});

module.exports = mongoose.model("Duration", DurationSchema);
