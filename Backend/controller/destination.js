const Destination = require("../models/destination");
const bcrypt = require("bcrypt");

// API to add a new destination
const createDestination = async (req, res) => {
  try {
    const { DestinationName, Tours } = req.body;
    const Images = req.file ? req.file.path : "";
    const newDestination = new Destination({
      DestinationName,
      Images,
      Tours,
    });
    await newDestination.save();
    res.status(201).json({
      message: "Đã thêm địa danh thành công!",
      destination: newDestination,
    });
  } catch (error) {
    console.error("Lỗi khi thêm đích:", error);
    res.status(500).json({ message: "Lỗi khi thêm địa danh", error });
  }
};

// Api delete destination
const deleteDestination = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteDestination = await Destination.findByIdAndDelete(id);
    if (!deleteDestination) {
      return res.status(404).json({ message: "Địa danh không tồn tại." });
    }
    res.status(200).json({ message: "Địa danh đã được xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa địa danh:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

// Api edit destination
const editDestination = async (req, res) => {
  const { id } = req.params;
  const { DestinationName, Tours } = req.body;
  const Images = req.file ? req.file.path : "";

  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      { DestinationName, Images, Tours, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!updatedDestination) {
      return res.status(404).json({ message: "Địa danh không tồn tại." });
    }
    res.status(200).json({
      message: "Đã cập nhật địa danh thành công!",
      destination: updatedDestination,
    });
  } catch (error) {
    console.error("Lỗi khi chỉnh sửa điạ danh:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

// API get all destination
const getAllDestination = async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Lỗi lấy danh sách đia danh", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

module.exports = {
  createDestination,
  deleteDestination,
  editDestination,
  getAllDestination,
};
