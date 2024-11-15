const Duration = require("../models/duration");

const createDuration = async (req, res) => {
  try {
    const { itinerary = [], start_date, end_date } = req.body; // Mặc định itinerary là mảng rỗng

    // Kiểm tra nếu thiếu start_date hoặc end_date
    if (!start_date || !end_date) {
      return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin!" });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({ message: "Ngày bắt đầu hoặc ngày kết thúc không hợp lệ!" });
    }

    if (startDate >= endDate) {
      return res.status(400).json({ message: "Ngày kết thúc phải sau ngày bắt đầu!" });
    }

    // Xử lý itinerary, nếu không hợp lệ thì thay bằng mảng rỗng
    const validItinerary = Array.isArray(itinerary) ? itinerary.filter(item => item.day && item.activity) : [];

    const newDuration = new Duration({
      itinerary: validItinerary,
      start_date: startDate,
      end_date: endDate,
    });

    await newDuration.save();

    res.status(201).json({
      message: "Đã thêm Duration thành công!",
      duration: newDuration,
    });
  } catch (error) {
    console.error("Lỗi khi thêm Duration:", error.message);
    res.status(500).json({ message: "Lỗi khi thêm Duration", error: error.message });
  }
};


const deleteDuration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const duration = await Duration.findById(id);
    if (!duration) {
      return res.status(404).json({ message: "Duration không tìm thấy!" });
    }

    // Thay vì duration.remove(), dùng deleteOne
    await Duration.deleteOne({ _id: id });

    res.status(200).json({ message: "Đã xóa Duration thành công!" });
  } catch (error) {
    console.error("Lỗi khi xóa:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi khi xóa Duration", error: error.message });
  }
};

const getAllDurations = async (req, res) => {
  try {
    const durations = await Duration.find().populate('tourPackageId', 'package_name');
    res.status(200).json(durations);
    // console.log(durations)  
  } catch (error) {
    console.error("Lỗi khi lấy tất cả Duration:", error.message);
    res.status(500).json({ message: "Lỗi khi lấy tất cả Duration", error: error.message });
  }
};

const updateDuration = async (req, res) => {
  try {
    const { id } = req.params;
    const { itinerary, start_date, end_date } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID không hợp lệ!" });
    }

    const duration = await Duration.findById(id);
    if (!duration) {
      return res.status(404).json({ message: "Duration không tìm thấy!" });
    }

    // Kiểm tra và cập nhật các trường dữ liệu
    if (itinerary) {
      duration.itinerary = itinerary;
    }

    if (start_date) {
      const startDate = new Date(start_date);
      if (isNaN(startDate)) {
        return res.status(400).json({ message: "Ngày bắt đầu không hợp lệ!" });
      }
      duration.start_date = startDate;
    }

    if (end_date) {
      const endDate = new Date(end_date);
      if (isNaN(endDate)) {
        return res.status(400).json({ message: "Ngày kết thúc không hợp lệ!" });
      }
      if (duration.start_date && duration.start_date >= endDate) {
        return res
          .status(400)
          .json({ message: "Ngày kết thúc phải sau ngày bắt đầu!" });
      }
      duration.end_date = endDate;
    }

    // Lưu lại bản ghi đã cập nhật
    await duration.save();

    res.status(200).json({
      message: "Cập nhật Duration thành công!",
      duration: duration,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật Duration:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật Duration", error: error.message });
  }
};

const getDurationById = async (req, res) => {
  try {
    const duration = await Duration.findById(req.params.id);
    if (!duration) {
      return res.status(404).json({ message: "Không tìm thấy Duration." });
    }
    res.status(200).json(duration);
  } catch (error) {
    console.error("Lỗi khi lấy Duration:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

module.exports = {
  createDuration,
  getAllDurations,
  deleteDuration,
  updateDuration,
  getDurationById,
};
