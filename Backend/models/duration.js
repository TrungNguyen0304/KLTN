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
  tourPackageId: { type: Schema.Types.ObjectId, ref: "TourPackage" },
});


// Virtual property to calculate duration in days and nights
DurationSchema.virtual("durationText").get(function () {
  const startDate = new Date(this.start_date);
  const endDate = new Date(this.end_date);
  const diffInDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const nights = diffInDays - 1;
  return `${diffInDays} Ngày ${nights} Đêm`;
});

// To include virtuals in JSON response
DurationSchema.set("toJSON", { virtuals: true });
DurationSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Duration", DurationSchema);
