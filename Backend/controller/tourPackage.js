const TourPackage = require("../models/tourPackage");
const Destination = require("../models/destination");
const tourGuide = require("../models/tourGuide");
const Duration = require("../models/duration");
const user = require("../models/user");
const mongoose = require("mongoose"); // Make sure mongoose is imported

const createTour = async (req, res) => {
  try {
    const image =
      req.files && req.files["image"] ? req.files["image"][0].path : "";
    const groupImages =
      req.files && req.files["groupImages"]
        ? req.files["groupImages"].map((file) => file.path)
        : [];
    const {
      package_name,
      description,
      adult_price,
      pricechildren_price,
      durations,
      destinationId,
      // tourGuideId,
      userGuideId,
      locationId,
      incAndExc,
    } = req.body;

    let parsedDurations = durations;
    if (typeof durations === "string") {
      parsedDurations = JSON.parse(durations);
    }

    if (!Array.isArray(parsedDurations) || parsedDurations.length === 0) {
      return res.status(400).json({
        message: "Durations phải là một mảng các ObjectId hợp lệ và không được rỗng.",
      });
    }

    const invalidDurations = parsedDurations.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidDurations.length > 0) {
      return res.status(400).json({
        message: `Các ID trong durations không hợp lệ: ${invalidDurations.join(", ")}`,
      });
    }

    // Tạo một instance mới của TourPackage
    const newTour = new TourPackage({
      package_name,
      description,
      adult_price,
      pricechildren_price,
      image,
      durations: parsedDurations,
      destinationId,
      // tourGuideId,
      userGuideId,
      locationId,
      incAndExc,
      groupImages,
    });

    // Lưu tour mới vào cơ sở dữ liệu
    await newTour.save();

    // Cập nhật các document Duration với tourPackageId mới
    await Duration.updateMany(
      { _id: { $in: parsedDurations } },
      { $set: { tourPackageId: newTour._id } }
    );

    // Nếu có destinationId, cập nhật Destination với tourPackageId mới
    if (destinationId) {
      await Destination.findByIdAndUpdate(
        destinationId,
        { $push: { tourPackages: newTour._id } },
        { new: true }
      );
    }

    // if (tourGuideId) {
    //   await tourGuide.findByIdAndUpdate(
    //     tourGuideId,
    //     { $push: { tourPackageId: newTour._id } },
    //     { new: true }
    //   );
    // }

    if (userGuideId) {
      await user.findByIdAndUpdate(
        userGuideId,
        { $push: { tourPackageId: newTour._id } },
        { new: true }
      );
    }

    // Truy vấn tất cả các tourPackage của userId được chọn
    const userTourPackages = await TourPackage.find({ userGuideId: userGuideId });

    // Trả về phản hồi với ID của tour mới và toàn bộ dữ liệu liên quan của user
    return res.status(201).json({
      message: "Tour package created successfully!",
      tour: {
        _id: newTour._id,
        package_name: newTour.package_name,
        description: newTour.description,
        adult_price: newTour.adult_price,
        pricechildren_price: newTour.pricechildren_price,
        durations: newTour.durations,
        image: newTour.image,
        groupImages: newTour.groupImages,
        destinationId: newTour.destinationId,
        // tourGuideId: newTour.tourGuideId,
        userGuideId: newTour.userGuideId,
        locationId: newTour.locationId,
        incAndExc: newTour.incAndExc,
      },
      userTours: userTourPackages, // Trả về toàn bộ danh sách tour của user
    });
  } catch (error) {
    console.error("Error creating tour:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi trong quá trình tạo tour.",
      error: error.message,
    });
  }
};

// Api Delete tourPacket
const deleteTour = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }
  try {
    const deleteTour = await TourPackage.findByIdAndDelete(id);

    if (!deleteTour) {
      console.log("Tour not found with ID:", id);
      return res.status(404).json({ message: "Gói tour không tồn tại" });
    }
    res.status(200).json({ message: "Gói tour đã được xóa thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa gói tour:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
  }
};

//Api edit tour
const editTour = async (req, res) => {
  const { id } = req.params;

  // Kiểm tra ID hợp lệ
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "ID không hợp lệ" });
  }

  try {
    // Kiểm tra và lấy dữ liệu hình ảnh nếu có
    const image =
      req.files && req.files["image"] ? req.files["image"][0].path : "";
    const groupImages =
      req.files && req.files["groupImages"]
        ? req.files["groupImages"].map((file) => file.path)
        : [];

    // Lấy dữ liệu từ req.body
    const {
      package_name,
      description,
      adult_price,
      pricechildren_price,
      durations,
      destinationId,
      // tourGuideId,
      userGuideId,
      locationId,
      incAndExc,
    } = req.body;

    // Kiểm tra và parse durations (phải là mảng ObjectId)
    let parsedDurations = [];
    if (durations) {
      try {
        parsedDurations =
          typeof durations === "string" ? JSON.parse(durations) : durations;
      } catch (parseError) {
        return res
          .status(400)
          .json({ message: "Durations phải là một mảng JSON hợp lệ." });
      }
    }

    if (!Array.isArray(parsedDurations)) {
      return res
        .status(400)
        .json({ message: "Durations phải là một mảng các ObjectId." });
    }

    const invalidDurations = parsedDurations.filter(
      (durId) => !mongoose.Types.ObjectId.isValid(durId)
    );

    if (invalidDurations.length > 0) {
      return res.status(400).json({
        message: `Các ID trong durations không hợp lệ: ${invalidDurations.join(
          ", "
        )}`,
      });
    }

    // Tìm tour cần cập nhật
    const tour = await TourPackage.findById(id);
    if (!tour) {
      return res.status(404).json({ message: "Gói tour không tồn tại" });
    }

    // Cập nhật các trường
    tour.package_name = package_name || tour.package_name;
    tour.description = description || tour.description;
    tour.adult_price = adult_price || tour.adult_price;
    tour.pricechildren_price = pricechildren_price || tour.pricechildren_price;
    tour.durations = parsedDurations.length > 0 ? parsedDurations : tour.durations;
    tour.destinationId = destinationId || tour.destinationId;
    // tour.tourGuideId = tourGuideId || tour.tourGuideId;
    tour.userGuideId = userGuideId || tour.userGuideId;
    tour.locationId = locationId || tour.locationId;
    tour.incAndExc = incAndExc || tour.incAndExc;

    // Cập nhật hình ảnh nếu có
    tour.image = image || tour.image;
    tour.groupImages =
      groupImages.length > 0 ? groupImages : tour.groupImages;

    // Lưu thay đổi
    await tour.save();

    // Cập nhật Duration nếu có durations mới
    if (parsedDurations.length > 0) {
      await Duration.updateMany(
        { _id: { $in: parsedDurations } },
        { $set: { tourPackageId: id } }
      );
    }

    return res
      .status(200)
      .json({ message: "Gói tour đã được cập nhật thành công", tour });
  } catch (error) {
    console.error("Lỗi khi cập nhật gói tour:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi trong quá trình cập nhật gói tour.",
      error: error.message,
    });
  }
};

// API get all tourPacket
const getAllTour = async (req, res) => {
  try {
    const tourpackages = await TourPackage.find({})
      .populate("destinationId", "DestinationName")
      // .populate("tourGuideId")
      .populate("userGuideId")
      .populate("locationId", "firstname")
      .populate({
        path: "durations",
        select: "itinerary start_date end_date durationText",
        options: { virtuals: true },
      })
      .exec();

    res.status(200).json(tourpackages);
  } catch (error) {
    console.error("Error fetching tour packages", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

// getbyid
const getAllTourById = async (req, res) => {
  try {
    const tourPackageId = req.params.id;

    const tourPackage = await TourPackage.findById(tourPackageId)
      .populate("destinationId", "DestinationName")
      // .populate("tourGuideId")
      .populate("userGuideId")
      .populate("locationId", "firstname")
      .populate({
        path: "durations",
        select: "itinerary start_date end_date durationText",
        options: { virtuals: true },
      })
      .exec();

    if (!tourPackage) {
      return res.status(404).json({ message: "Tour package not found." });
    }
    res.status(200).json(tourPackage);
  } catch (error) {
    console.error("Error fetching tour package by ID", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const countTourByDestination = async (req, res) => {
  const { destinationId } = req.params;
  // Validate if the provided destinationId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(destinationId)) {
    return res.status(400).json({ message: "destinationId không hợp lệ" });
  }

  try {
    // Count documents where destinationId matches the provided ID
    const count = await TourPackage.countDocuments({ destinationId });

    return res.status(200).json({ message: "Số lượng tour tìm thấy", count });
  } catch (error) {
    console.error("Error counting tours by destinationId:", error);
    return res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

const searchTour = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    // Modify the filter to use package_name
    const filter = searchQuery
      ? {
        package_name: { $regex: searchQuery, $options: "i" },
      }
      : {};

    // Lấy danh sách tour đã lọc và populate các trường liên quan
    const tourpackages = await TourPackage.find(filter)
      .populate("destinationId", "DestinationName")
      .populate("userGuideId")
      .populate("locationId", "firstname")
      .populate({
        path: "durations",
        select: "itinerary start_date end_date durationText",
        options: { virtuals: true },
      })
      .exec();

    // Trả về danh sách tour đã lọc
    res.status(200).json(tourpackages);
  } catch (error) {
    console.error("Error searching tours:", error);
    res.status(500).json({ message: "Error searching tours" });
  }
};

module.exports = {
  createTour,
  deleteTour,
  editTour,
  getAllTour,
  getAllTourById,
  countTourByDestination,
  searchTour
};
