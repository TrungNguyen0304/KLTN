const Destination = require("../models/destination");
const bcrypt = require("bcrypt");

// API to add a new destination
const createDestination = async (req, res) => {
  try {
    const { DestinationName, Description, locationId } = req.body;
    const Images = req.files['image'] ? req.files['image'][0].path : "";
    const groudImages = req.files['groudImages'] ? req.files['groudImages'].map(file => file.path) : [];

    const trimmedDestinationName = DestinationName.trim();

    const existingDestination = await Destination.findOne({ DestinationName: trimmedDestinationName });
    if (existingDestination) {
      return res.status(400).json({ message: "Địa danh đã tồn tại!" });
    }

    const newDestination = new Destination({
      DestinationName: trimmedDestinationName,
      Images,
      Description,
      groudImages,
      locationId,
    });

    await newDestination.save();
    res.status(201).json({
      message: "Đã thêm địa danh thành công!",
      destination: newDestination,
    });
  } catch (error) {
    console.error("Lỗi khi thêm đích:", error.message);
    res.status(500).json({ message: "Lỗi khi thêm địa danh", error: error.message });
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
  const { DestinationName, Description } = req.body;
  const Images = req.files['image'] ? req.files['image'][0].path : "";
  const groudImages = req.files['groudImages'] ? req.files['groudImages'].map(file => file.path) : [];

  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      { DestinationName, Images,groudImages, Description, updatedAt: Date.now() },
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
    const destinations = await Destination.find({})
      .populate('locationId', 'firstname') 
      .exec();
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Lỗi lấy danh sách địa danh", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};



module.exports = {
  createDestination,
  deleteDestination,
  editDestination,
  getAllDestination,
};