const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema(
    {
        durations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Duration', required: true }],
        destinationId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
        locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
        tourPackageId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage' }],
        tourGuideId: { type: Schema.Types.ObjectId, ref: 'TourGuide', required: true }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Filter", filterSchema);
