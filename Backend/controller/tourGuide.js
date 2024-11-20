const tourGuide = require("../models/tourGuide");
const bcrypt = require("bcrypt");

const createTourGuide = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email } = req.body;
    const images = req.files["image"] ? req.files["image"][0].path : "";
    const newTourGuide = new tourGuide({
      first_name,
      last_name,
      images,
      phone_number,
      email,
    });
    const savedTourGuide = await newTourGuide.save();
    res.status(201).json({
      success: true,
      message: "Đã tạo hướng dẫn viên.",
      data: savedTourGuide,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi tạo hướng dẫn viên.",
      error: error.message,
    });
  }
};
// Api delete Tourguide

const deleteTourGuide = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTourGuide = await tourGuide.findByIdAndDelete(id);
    if (!deleteTourGuide) {
      return res.status(404).json({ message: "Hướng dẫn viên không tồn tại" });
    }
    res
      .status(200)
      .json({ message: " Đã được xóa thành công hướng dẫn viên. " });
  } catch (error) {
    console.error("Lỗi khi xóa hướng dẫn viên :", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};
// API edit TourGuide

const editTourGuide = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number, email } = req.body;

  let images = req.files?.["image"] ? req.files["image"][0].path : null;

  try {
    const currentTourGuide = await tourGuide.findById(id);
    if (!currentTourGuide) {
      return res.status(404).json({ message: "Tour guide does not exist" });
    }

    if (!images) {
      images = currentTourGuide.images;
    }

    const updateTourGuide = await tourGuide.findByIdAndUpdate(
      id,
      {
        first_name,
        last_name,
        phone_number,
        images,
        email,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Tour guide updated successfully",
      tourGuide: updateTourGuide,
    });
  } catch (error) {
    console.error("Error updating tour guide:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// API get all tourGuide
const getAllTourGuide = async (req, res) => {
  try {
    const tourGuides = await tourGuide.find({});
    res.status(200).json(tourGuides);
  } catch (error) {
    console.error("Lỗi lấy danh sách hướng dẫn viên", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ. " });
  }
};

const getTourGuideById = async (req, res) => {
  try {
    const tourGuides = await tourGuide.findById(req.params.id);
    if (!tourGuides) {
      return res.status(404).json({ message: "tourGuides not found" });
    }
    res.status(200).json(tourGuides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createTourGuide,
  deleteTourGuide,
  editTourGuide,
  getAllTourGuide,
  getTourGuideById,
};
