const mongoose = require("mongoose");
const Destination = require("../../models/destination");

const searchDestination = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    // Modify the filter to use DestinationName
    const filter = searchQuery
      ? {
        DestinationName: { $regex: searchQuery, $options: "i" }, // Search by DestinationName
      }
      : {};

    // Lấy danh sách destinations đã lọc
    const destinations = await Destination.find(filter);

    // Trả về danh sách destinations đã lọc
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Error fetching destinations" });
  }
};

module.exports = { searchDestination };
