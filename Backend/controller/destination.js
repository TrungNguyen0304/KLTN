const Destination = require("../models/destination");
const bcrypt = require("bcrypt");

// API to add a new destination
const createDestination = async (req, res) => {
  try {
    console.log(req.files);
    const { DestinationName, Description, locationId } = req.body;
    const Images = req.files['image'] ? req.files['image'][0].path : "";
    const GroupImages = req.files['groupImages'] ? req.files['groupImages'].map(file => file.path) : [];
    // Xóa khoảng trắng ở đầu và cuối DestinationName
    const trimmedDestinationName = DestinationName.trim();

    const existingDestination = await Destination.findOne({ DestinationName: trimmedDestinationName });
    if (existingDestination) {
      return res.status(400).json({ message: "Địa danh đã tồn tại!" });
    }

    const newDestination = new Destination({
      DestinationName: trimmedDestinationName,
      Images,
      Description,
      GroupImages,
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
  const { DestinationName, Description, locationId } = req.body;
  let Images = req.file ? req.file.path : ""; // If there's a new image, use the new one
  let groudImages = req.files['groudImages'] ? req.files['groudImages'].map(file => file.path) : []; // Handle multiple new images

  try {
    // Fetch the destination to update
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: "Destination not found." });
    }

    // If no new image is uploaded, keep the old one
    if (!Images) {
      Images = destination.Images;  // Keep the current image if no new image is uploaded
    }

    // If no new group images are uploaded, keep the old ones
    if (groudImages.length === 0) {
      groudImages = destination.groudImages; // Keep the current group images
    }

    // Update the destination in the database
    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      {
        DestinationName: DestinationName.trim(),
        Images,
        Description,
        groudImages,
        locationId,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    // If destination update fails
    if (!updatedDestination) {
      return res.status(404).json({ message: "Failed to update destination." });
    }

    res.status(200).json({
      message: "Destination updated successfully!",
      destination: updatedDestination,
    });
  } catch (error) {
    console.error("Error updating destination:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};
// API get all destination
const getAllDestination = async (req, res) => {
  try {
    const destinations = await Destination.find({})
      .populate('locationId', 'firstname') // Populate with the firstname field of Location
      .exec();
    res.status(200).json(destinations);
  } catch (error) {
    console.error("Lỗi lấy danh sách địa danh", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};


const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ message: "Không tìm thấy địa danh." });
    }
    res.status(200).json(destination);
  } catch (error) {
    console.error("Lỗi khi lấy địa danh:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};


module.exports = {
  createDestination,
  deleteDestination,
  editDestination,
  getAllDestination,
  getDestinationById,
};