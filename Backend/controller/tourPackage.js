const tourPackage = require("../models/tourPackage");
const TourPackage = require("../models/tourPackage");

const mongoose = require('mongoose');

const createTour = async (req, res) => {
  try {
    const image = req.files && req.files['image'] ? req.files['image'][0].path : "";
    const groupImages = req.files && req.files["groupImages"] ? req.files["groupImages"].map((file) => file.path) : [];

    const { package_name, description, price, durations, destinationId, tourGuideId, locationId, incAndExc } = req.body;

    let parsedDurations = durations;
    if (typeof durations === 'string') {
      parsedDurations = JSON.parse(durations);
    }

    if (!Array.isArray(parsedDurations) || parsedDurations.length === 0) {
      return res.status(400).json({ message: "Durations phải là một mảng các ObjectId hợp lệ và không được rỗng." });
    }

    const invalidDurations = parsedDurations.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidDurations.length > 0) {
      return res.status(400).json({ message: `Các ID trong durations không hợp lệ: ${invalidDurations.join(', ')}` });
    }

    const newTour = new TourPackage({
      package_name,
      description,
      price,
      image,
      durations: parsedDurations, 
      destinationId,
      tourGuideId,
      locationId,
      incAndExc, 
      groupImages
    });

    await newTour.save();
    console.log("Tour package saved successfully:", newTour);

    return res.status(201).json({ message: "Tour package created successfully!", tour: newTour });

  } catch (error) {
    console.error("Error creating tour:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình tạo tour.", error: error.message });
  }
};



// Api Delete tourPacket
const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTour = await tourPackage.findByIdAndDelete(id);
    if (!deleteTour) {
      return res.status(404).json({ message: "Tour package không tồn tại" });
    }
    res.status(200).json({ message: " Đã được xóa thành công Tour package. " });
  } catch (error) {
    console.error("Lỗi khi xóa Tour package :", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

//Api edit tour
const editTour = async (req, res) => {
  const { id } = req.params;
  const { package_name, description, price, durations, destination_id } =
    req.body;
  const images = req.file ? req.file.path : null;
  const groupImages = req.files["groupImages"]
    ? req.files["groupImages"].map((file) => file.path)
    : null;
  try {
    const updatedTour = await TourPackage.findByIdAndUpdate(
      id,
      {
        package_name,
        description,
        price,
        durations,
        destination_id,
        ...(images && { images }),
        ...(groupImages && { groupImages }),
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
      .populate("destinationId", "DestinationName") 
      .populate("tourGuideId", "first_name") 
      .populate("locationId", "firstname")
      .exec();

    res.status(200).json(tourpackages); 
  } catch (error) {
    console.error("Error fetching tour packages", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

module.exports = {
  createTour,
  deleteTour,
  editTour,
  getAllTour,
};
