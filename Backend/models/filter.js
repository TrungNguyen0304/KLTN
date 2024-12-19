const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema(
    {
        durations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Duration', required: true }],
        destinationId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }],
        locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
        tourPackageId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TourPackage' }],
        userGuideId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Filter", filterSchema);
