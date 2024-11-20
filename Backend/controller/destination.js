const Destination = require("../models/destination");
const TourPackage = require("../models/tourPackage");

const bcrypt = require("bcrypt");

// API to add a new destination
const createDestination = async (req, res) => {
  try {
    const { DestinationName, Description, locationId } = req.body;
    const Images = req.files["image"] ? req.files["image"][0].path : "";
    // Xóa khoảng trắng ở đầu và cuối DestinationName
    const trimmedDestinationName = DestinationName.trim();

    const existingDestination = await Destination.findOne({
      DestinationName: trimmedDestinationName,
    });
    if (existingDestination) {
      return res.status(400).json({ message: "Địa danh đã tồn tại!" });
    }

    const newDestination = new Destination({
      DestinationName: trimmedDestinationName,
      Images,
      Description,
      locationId,
    });

    await newDestination.save();
    res.status(201).json({
      message: "Đã thêm địa danh thành công!",
      destination: newDestination,
    });
  } catch (error) {
    console.error("Lỗi khi thêm đích:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi khi thêm địa danh", error: error.message });
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

  // Lấy ảnh chính và ảnh nhóm mới (nếu có)
  let Images = req.files["image"] ? req.files["image"][0].path : ""; // Dùng ảnh mới nếu có

  try {
    // Lấy thông tin địa danh hiện tại từ DB
    const destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({ message: "Không tìm thấy địa danh." });
    }

    // Giữ lại ảnh chính cũ nếu không có ảnh mới
    if (!Images) {
      Images = destination.Images;
    }

    // Cập nhật thông tin địa danh
    const updatedDestination = await Destination.findByIdAndUpdate(
      id,
      {
        DestinationName: DestinationName.trim(),
        Images,
        Description,
        locationId,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedDestination) {
      return res.status(404).json({ message: "Không thể cập nhật địa danh." });
    }

    res.status(200).json({
      message: "Cập nhật địa danh thành công!",
      destination: updatedDestination,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật địa danh:", error.message);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

// API get all destination
const getAllDestination = async (req, res) => {
  try {
    // Lấy tất cả các Destination và populate thông tin Location
    const destinations = await Destination.find({})
      .populate("locationId")
      .exec();

    // Đếm số lượng TourPackage cho mỗi Destination
    const destinationsWithTourCount = await Promise.all(
      destinations.map(async (destination) => {
        const tourCount = await TourPackage.countDocuments({
          destinationId: destination._id,
        });

        return {
          ...destination.toObject(), // Chuyển đổi Destination thành object
          tourCount, // Thêm trường tourCount vào object
        };
      })
    );

    // Trả về danh sách Destinations kèm số lượng TourPackage
    res.status(200).json(destinationsWithTourCount);
  } catch (error) {
    console.error("Lỗi lấy danh sách địa danh", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate("locationId")
      .populate("tourPackages") 
      .lean();

    if (!destination) {
      return res.status(404).json({ message: "Không tìm thấy địa danh." });
    }

    // Lấy các tour liên kết với destination
    const tourPackages = await TourPackage.find({
      destinationId: destination._id,
    })
      .populate("tourGuideId", "first_name last_name")
    .populate("durations")  
      .lean();

    // Gắn danh sách tour vào destination
    destination.tourPackages = tourPackages;

    res.status(200).json(destination);
  } catch (error) {
    console.error("Lỗi khi lấy địa danh:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

const getDestinationsCountByLocation = async (locationId) => {
  try {
    // Đếm số lượng Destination có locationId tương ứng
    const count = await Destination.countDocuments({ locationId });
    return count;
  } catch (error) {
    throw new Error("Lỗi khi đếm các Destination: " + error.message);
  }
};

module.exports = {
  createDestination,
  deleteDestination,
  editDestination,
  getAllDestination,
  getDestinationById,
  getDestinationsCountByLocation,
};
