const AdminTourGuide = require('../../models/TourGuide/adminTourGuide');

// Lấy thông tin AdminTourGuide của người dùng đã đăng nhập
const getAdminTourGuideDetails = async (req, res) => {
  try {
    const userId = req.user._id; // ID của người dùng từ middleware xác thực

    // Tìm AdminTourGuide dựa trên userId và populate các trường liên kết
    const adminTourGuide = await AdminTourGuide.find({ userId: userId })
      .populate({
        path: 'durationsId',
        select: 'start_date end_date itinerary',
      })
      .populate({
        path: 'tourPackageId',
        select: 'package_name',
      })
      .populate({
        path: 'userId',
        select: 'first_name last_name',
      })
      .populate({
        path: 'destinationId',
        select: 'DestinationName',
      })
      .populate({
        path: 'locationId',
        select: 'first_name',
      });

    // Kiểm tra nếu không có dữ liệu
    if (!adminTourGuide || adminTourGuide.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy thông tin Tour Guide!' });
    }

    // Trả về kết quả
    res.status(200).json({
      success: true,
      data: adminTourGuide,
    });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin AdminTourGuide:', error.message);
    res.status(500).json({ message: 'Lỗi máy chủ nội bộ.' });
  }
};

module.exports = { getAdminTourGuideDetails };
