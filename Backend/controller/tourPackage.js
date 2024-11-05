const TourPackage = require("../models/tourPackage");
const bcrypt = require("bcrypt");

const createTour = async (req, res) => {
  try {
    const { package_name, description, price, duration, destination_id } =
      req.body;

    if (!package_name || !price || !destination_id) {
      return res.status(400).json({ message: "Thiếu các trường bắt buộc." });
    }
    const newTour = new TourPackage({
      package_name,
      description,
      price,
      duration,
      destination_id,
    });
    const savedTour = await newTour.save();
    res
      .status(201)
      .json({ message: "Gói tour được tạo thành công.", tour: savedTour });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ cục bộ.", error: error.message });
  }
};

module.exports = {
  createTour,
};
