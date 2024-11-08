const tourGuide = require("../models/tourGuide");
const bcrypt = require("bcrypt");

const createTourGuide = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email } = req.body;
    const newTourGuide = new tourGuide({
      first_name,
      last_name,
      phone_number,
      email,
    });
    const savedTourGuide = await newTourGuide.save();
    res.status(201).json({
      success: true,
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
    res.status(200).json({ message: "Địa danh đã được xóa thành công " });
  } catch (error) {
    console.error("Lỗi khi xóa hướng dẫn viên :", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};
// API edit TourGuide
const editTourGuide = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone_number, email } = req.body;
  try {
    const updateTourGuide = await tourGuide.findByIdAndUpdate(
      id,
      { first_name, last_name, phone_number, email, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updateTourGuide) {
      return res.status(404).json({ message: "Hướng đãn viên không tồn tại" });
    }
    res.status(200).json({
      message: "Đã cập nhật hướng dẫn viên thành công",
      tourGuide: updateTourGuide,
    });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa hướng dẫn viên", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ. " });
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
          return res.status(404).json({ message: 'tourGuides not found' });
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
  getTourGuideById
};
