  const TourPackage = require("../models/tourPackage");

  const mongoose = require('mongoose');  // Make sure mongoose is imported

  const createTour = async (req, res) => {
    try {
      const image = req.files && req.files['image'] ? req.files['image'][0].path : "";
      const groupImages = req.files && req.files["groupImages"] ? req.files["groupImages"].map((file) => file.path) : [];

      const { package_name, description, price, durations, destinationId, tourGuideId, locationId, incAndExc } = req.body;

      let parsedDurations = durations;
      if (typeof durations === 'string') {
        parsedDurations = JSON.parse(durations);
      }

      // Validate durations
      if (!Array.isArray(parsedDurations) || parsedDurations.length === 0) {
        return res.status(400).json({ message: "Durations phải là một mảng các ObjectId hợp lệ và không được rỗng." });
      }

      // Ensure all IDs are valid ObjectIds
      const invalidDurations = parsedDurations.filter(id => !mongoose.Types.ObjectId.isValid(id));
      if (invalidDurations.length > 0) {
        return res.status(400).json({ message: `Các ID trong durations không hợp lệ: ${invalidDurations.join(', ')}` });
      }

      // Create new TourPackage object
      const newTour = new TourPackage({
        package_name,
        description,
        price,
        image,
        durations: parsedDurations, // Use the parsed durations here
        destinationId,
        tourGuideId,
        locationId,
        incAndExc, // Includes the 'incAndExc' field
        groupImages
      });

      // Save the new tour package to the database
      await newTour.save();
      console.log("Tour package saved successfully:", newTour);

      // Return success response
      return res.status(201).json({ message: "Tour package created successfully!", tour: newTour });

    } catch (error) {
      // Log the error message for debugging
      console.error("Error creating tour:", error);
      return res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình tạo tour.", error: error.message });
    }
  };



  // Api Delete tourPacket
  const deleteTour = async (req, res) => {
    const { id } = req.params;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" }); // Invalid ID
    }

    try {
      // Find the tour package by ID and delete it
      const deleteTour = await TourPackage.findByIdAndDelete(id);

      if (!deleteTour) {
        console.log("Tour not found with ID:", id); // Add logging
        return res.status(404).json({ message: "Gói tour không tồn tại" });
      }

      // Success response
      res.status(200).json({ message: "Gói tour đã được xóa thành công" });
    } catch (error) {
      // Log the error for debugging purposes
      console.error("Lỗi khi xóa gói tour:", error);
      res.status(500).json({ message: "Lỗi máy chủ nội bộ" });
    }
  };

  //Api edit tour
  const editTour = async (req, res) => {
    const { id } = req.params;
  
    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" }); // Invalid ID
    }
  
    try {
      const image = req.files && req.files['image'] ? req.files['image'][0].path : "";
      const groupImages = req.files && req.files["groupImages"] ? req.files["groupImages"].map((file) => file.path) : [];
  
      const { package_name, description, price, durations, destinationId, tourGuideId, locationId, incAndExc } = req.body;
  
      // Parse durations if it's a string and validate it
      let parsedDurations = durations;
      if (typeof durations === 'string') {
        parsedDurations = JSON.parse(durations);
      }
  
      // Validate durations
      if (!Array.isArray(parsedDurations) || parsedDurations.length === 0) {
        return res.status(400).json({ message: "Durations phải là một mảng các ObjectId hợp lệ và không được rỗng." });
      }
  
      // Ensure all IDs are valid ObjectIds
      const invalidDurations = parsedDurations.filter(id => !mongoose.Types.ObjectId.isValid(id));
      if (invalidDurations.length > 0) {
        return res.status(400).json({ message: `Các ID trong durations không hợp lệ: ${invalidDurations.join(', ')}` });
      }
  
      // Find the existing tour package by ID
      const tour = await TourPackage.findById(id);
      if (!tour) {
        return res.status(404).json({ message: "Gói tour không tồn tại" });
      }
  
      // Update fields with new values (only if provided)
      tour.package_name = package_name || tour.package_name;
      tour.description = description || tour.description;
      tour.price = price || tour.price;
      tour.durations = parsedDurations || tour.durations;
      tour.destinationId = destinationId || tour.destinationId;
      tour.tourGuideId = tourGuideId || tour.tourGuideId;
      tour.locationId = locationId || tour.locationId;
      tour.incAndExc = incAndExc || tour.incAndExc;
      tour.image = image || tour.image;  // If no new image, keep the old one
      tour.groupImages = groupImages.length > 0 ? groupImages : tour.groupImages;  // Only update if new images are provided
  
      // Save the updated tour package
      await tour.save();
  
      // Return success response with the updated tour
      return res.status(200).json({ message: "Gói tour đã được cập nhật thành công", tour });
  
    } catch (error) {
      console.error("Lỗi khi cập nhật gói tour:", error);
      return res.status(500).json({ message: "Đã xảy ra lỗi trong quá trình cập nhật gói tour", error: error.message });
    }
  };

  // API get all tourPacket
  const getAllTour = async (req, res) => {
    try {

      const tourpackages = await TourPackage.find({})
        .populate("destinationId", "DestinationName")
        .populate("tourGuideId", "first_name")
        .populate("locationId", "firstname")
        .populate({
          path: "durations",
          select: "itinerary start_date end_date durationText", // Include durationText virtual
          options: { virtuals: true }
        })
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
