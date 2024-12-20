const mongoose = require("mongoose");
const TourPackage = require("../../models/tourPackage");
const Duration = require("../../models/duration");
const Destination = require("../../models/destination");
const Location = require("../../models/location");

// Controller to get filtered tour packages
const getFilteredTourPackages = async (req, res) => {
    try {
        const {
            userGuideId,
            userGuide,
            locationId,
            destinationId,
            durations,
            tourPackageId,
            tourType,
            adultPriceMin,
            adultPriceMax,
            sortByPrice // New query parameter for sorting by price
        } = req.query;

        let filterConditions = {};
        const { ObjectId } = mongoose.Types;

        // Lọc theo locationId
        if (locationId) {
            if (!ObjectId.isValid(locationId)) {
                return res.status(400).json({ message: "Invalid ObjectId format for locationId" });
            }
            filterConditions.locationId = new ObjectId(locationId);
        }

        // Lọc theo destinationId
        if (destinationId) {
            const destinationIds = destinationId.split(",").map((id) => {
                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ message: `Invalid ObjectId format for destinationId: ${id}` });
                }
                return new ObjectId(id);
            });
            filterConditions.destinationId = { $in: destinationIds };
        }

        // Lọc theo durations
        if (durations) {
            const durationIds = durations.split(",").map((id) => {
                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ message: `Invalid ObjectId format for durations: ${id}` });
                }
                return new ObjectId(id);
            });
            filterConditions.durations = { $in: durationIds };
        }

        // Lọc theo tourPackageId
        if (tourPackageId) {
            const tourPackageIds = tourPackageId.split(",").map((id) => {
                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ message: `Invalid ObjectId format for tourPackageId: ${id}` });
                }
                return new ObjectId(id);
            });
            filterConditions._id = { $in: tourPackageIds };
        }

        // Lọc theo loại tua (tourType)
        if (tourType) {
            filterConditions.tourType = tourType;
        }

        // Lọc theo adult_price
        if (adultPriceMin || adultPriceMax) {
            filterConditions.adult_price = {};
            if (adultPriceMin) {
                if (isNaN(adultPriceMin)) {
                    return res.status(400).json({ message: "adultPriceMin must be a valid number" });
                }
                filterConditions.adult_price.$gte = parseFloat(adultPriceMin);
            }
            if (adultPriceMax) {
                if (isNaN(adultPriceMax)) {
                    return res.status(400).json({ message: "adultPriceMax must be a valid number" });
                }
                filterConditions.adult_price.$lte = parseFloat(adultPriceMax);
            }
        }

        let sortOptions = {};
        if (sortByPrice === 'asc') {
            sortOptions.adult_price = 1;
        } else if (sortByPrice === 'desc') {
            sortOptions.adult_price = -1;
        }

        const filteredTourPackages = await TourPackage.find(filterConditions)
            .populate("durations", "start_date end_date")
            .populate("destinationId", "DestinationName")
            .populate("locationId", "firstname")
            .populate("userGuideId", "firstname lastmame")
            .populate("userGuideId", "firstname lastname")
            .sort(sortOptions);

        if (!filteredTourPackages.length) {
            return res.status(404).json({ message: "No tour packages found matching the filters" });
        }

        return res.json(filteredTourPackages);
    } catch (error) {
        console.error("Error fetching filtered tour packages:", error);
        if (!res.headersSent) {
            return res.status(500).json({ message: "Server Error", error: error.message });
        }
    }
};

module.exports = { getFilteredTourPackages };
