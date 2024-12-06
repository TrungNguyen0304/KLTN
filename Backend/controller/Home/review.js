const Review = require("../../models/review");
const tourPackage = require("../../models/tourPackage");
const User = require("../../models/user");

// 1. Tạo mới review (tự động lấy userid từ session)
const createReview = async (req, res) => {
    try {
      const {
        rating,
        feedback,
        tourPackageId,
        totalReviews,
        totalRating,
        averageRating,
      } = req.body;

      // Kiểm tra đầu vào
      if (!rating || !tourPackageId) {
        return res
          .status(400)
          .json({ message: "Rating và Tour Package ID là bắt buộc" });
      }

      // Kiểm tra giá trị rating
      if (rating < 1 || rating > 10) {
        return res
          .status(400)
          .json({ message: "Rating phải nằm trong khoảng từ 1 đến 10" });
      }

      if (feedback && feedback.length < 5) {
        return res
          .status(400)
          .json({ message: "Feedback phải có ít nhất 5 ký tự nếu có" });
      }

      // Lấy ID người dùng từ middleware xác thực
      const userid = req.user?._id;
      if (!userid) {
        return res
          .status(401)
          .json({ message: "Bạn cần đăng nhập để thực hiện hành động này" });
      }

      // Xác định mô tả rating
      let ratingDescription = "";
      if (rating < 3) {
        ratingDescription = "Rất tệ (Dưới 3)";
      } else if (rating >= 3 && rating < 5) {
        ratingDescription = "Tệ (3 - 5)";
      } else if (rating >= 5 && rating < 7) {
        ratingDescription = "Bình thường (5 - 7)";
      } else if (rating >= 7 && rating < 8) {
        ratingDescription = "Tuyệt (7 - 8)";
      } else if (rating >= 8 && rating <= 10) {
        ratingDescription = "Rất tuyệt (8 - 10)";
      }

      // Tạo đánh giá mới
      const newReview = new Review({
        rating,
        feedback,
        tourPackageId,
        userid,
        ratingDescription,
      });

      await newReview.save();

      // Cập nhật tổng điểm, số lượng đánh giá cho tourPackageId
      const updatedAverageRating = ((totalRating + rating) / (totalReviews + 1)).toFixed(1); // Làm tròn đến 2 chữ số thập phân

      await tourPackage.findByIdAndUpdate(tourPackageId, {
        $inc: { totalReviews: 1, totalRating: rating },
        $set: { averageRating: updatedAverageRating },
      });

      // Trả về review vừa tạo
      res.status(201).json({
        message: "Đánh giá đã được tạo thành công!",
        review: newReview,
      });
    } catch (error) {
      console.error("Lỗi khi tạo review:", error);
      res.status(500).json({
        message: "Tạo review không thành công",
        error: error.message,
      });
    }
};


// 2. Lấy danh sách review (hiển thị tên người dùng từ User)
const getAllReviews = async (req, res) => {
  try {
    const { tourPackageId } = req.params; // Lấy tourPackageId từ params

    if (!tourPackageId) {
      return res.status(400).json({ message: "Tour package ID is required" });
    }

    const reviews = await Review.find({ tourPackageId })
      .sort({ createdAt: -1 })
      .populate("userid", "firstname lastname email"); // Populate thông tin người dùng

    const reviewsWithDescription = reviews.map((review) => {
      let ratingDescription = "";

      if (review.rating < 3) {
        ratingDescription = "Rất tệ";
      } else if (review.rating >= 3 && review.rating < 5) {
        ratingDescription = "Tệ";
      } else if (review.rating >= 5 && review.rating < 7) {
        ratingDescription = "Bình thường";
      } else if (review.rating >= 7 && review.rating < 8) {
        ratingDescription = "Tuyệt";
      } else if (review.rating >= 8 && review.rating <= 10) {
        ratingDescription = "Rất tuyệt";
      }

      return {
        ...review.toObject(),
        ratingDescription,
        user: review.userid
          ? {
              firstname: review.userid.firstname,
              lastname: review.userid.lastname,
              email: review.userid.email,
            }
          : { firstname: "Unknown", lastname: "", email: "" },
      };
    });

    res.status(200).json(reviewsWithDescription);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({
        message: "Không thể lấy danh sách reviews",
        error: error.message,
      });
  }
};
// 3. Lấy chi tiết một review (hiển thị tên người dùng)
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm review theo ID và populate Booking, User
    const review = await Review.findById(id)
      .populate("tourPackageId")
      .populate("userid", "firstname"); // Chỉ lấy firstname của người dùng

    if (!review) {
      return res.status(404).json({ message: "Review không tồn tại" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Lỗi khi lấy review:", error);
    res
      .status(500)
      .json({ message: "Không thể lấy review", error: error.message });
  }
};

// 4. Cập nhật review (chỉ người dùng đã tạo mới được sửa)
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, feedback } = req.body;

    // Kiểm tra review có tồn tại không
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review không tồn tại" });
    }

    // Kiểm tra quyền chỉnh sửa (chỉ người tạo mới được cập nhật)
    if (review.userid.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền cập nhật review này" });
    }

    // Kiểm tra rating có hợp lệ không
    if (rating) {
      if (rating < 1 || rating > 10) {
        return res
          .status(400)
          .json({ message: "Rating phải nằm trong khoảng từ 1 đến 10" });
      }

      // Cập nhật rating description dựa trên rating
      let ratingDescription = "";
      if (rating < 3) {
        ratingDescription = "Rất tệ (Dưới 3)";
      } else if (rating >= 3 && rating < 5) {
        ratingDescription = "Tệ (3 - 5)";
      } else if (rating >= 5 && rating < 7) {
        ratingDescription = "Bình thường (5 - 7)";
      } else if (rating >= 7 && rating < 8) {
        ratingDescription = "Tuyệt (7 - 8)";
      } else if (rating >= 8 && rating <= 10) {
        ratingDescription = "Rất tuyệt (8 - 10)";
      }

      review.rating = rating;
      review.ratingDescription = ratingDescription;
    }

    // Cập nhật feedback nếu có
    if (feedback) {
      review.feedback = feedback;
    }

    // Lưu lại review đã cập nhật
    await review.save();

    res.status(200).json({
      message: "Review đã được cập nhật thành công",
      review,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật review:", error);
    res
      .status(500)
      .json({
        message: "Cập nhật review không thành công",
        error: error.message,
      });
  }
};

// 5. Xóa review (chỉ người dùng đã tạo mới được xóa)
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm review theo ID
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review không tồn tại" });
    }

    // Kiểm tra quyền xóa (chỉ người tạo mới được xóa)
    if (!req.user || review.userid.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Bạn không có quyền xóa đánh giá này" }); // Thông báo lỗi tùy chỉnh
    }

    // Xóa review
    await review.deleteOne();
    res.status(200).json({ message: "Xóa review thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa review:", error);
    res
      .status(500)
      .json({ message: "Không thể xóa review", error: error.message });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
