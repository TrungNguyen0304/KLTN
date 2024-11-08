const TourPackage = require("../models/tourPackage");
const bcrypt = require("bcrypt");

const createTour = async (req, res) => {
  try {
    const { package_name, description, price, duration, destination_id } =
      req.body;
    const images = req.file ? req.file.path : "";
    if (!package_name || !price || !destination_id) {
      return res.status(400).json({ message: "Thiếu các trường bắt buộc." });
    }
    const newTour = new TourPackage({
      package_name,
      description,
      images,
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
    res
      .status(500)
      .json({ message: "Lỗi máy chủ cục bộ.", error: error.message });
  }
};
// Api Delete tourPacket
const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTour = await TourPackage.findByIdAndDelete(id);
    if (!deleteTour) {
      return res.status(404).json({ message: " Gói tour không tồn tại " });
    }
    res.status(200).json({ message: "Gói tour đã được xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa gói tour", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};
//Api edit tour
const editTour = async (req, res) => {
  const { id } = req.params;
  const { package_name, description, price, duration, destination_id } =
    req.body;
  const images = req.file ? req.file.path : "";

  try {
    const updatedTour = await TourPackage.findByIdAndUpdate(
      id,
      {
        package_name,
        description,
        images,
        price,
        duration,
        destination_id,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );
    if (!updatedTour) {
      return res.status(404).json({ message: "Gói tour không tồn tại." });
    }
    res.status(200).json({
      message: "Đã cập nhật gói tour thành công!",
      tourpackages: updatedTour,
    });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa gói tour:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};
// API get all tourPacket
const getAllTour = async (req, res) => {
  try {
    const tourpackages = await TourPackage.find({})
      .populate("destination_id", "package_name")
      .exec();
    res.status(200).json(tourpackages);
  } catch (error) {
    console.error("Lỗi lấy danh sách địa danh", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

module.exports = {
  createTour,
  deleteTour,
  editTour,
  getAllTour,
};
