const Review = require('../../models/review');
const User = require('../../models/user');

// 1. Tạo mới review (tự động lấy userid từ session)
const createReview = async (req, res) => {
    try {
        const { rating, feedback, bookingid } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!rating || !bookingid) {
            return res.status(400).json({ message: 'Rating và Booking ID là bắt buộc' });
        }

        // Lấy thông tin người dùng từ req.user
        const userid = req.user._id;

        // Xử lý đánh giá (rating) và feedback
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

        // Tạo review mới
        const newReview = new Review({ rating, feedback, bookingid, userid, ratingDescription });
        await newReview.save();

        // Trả về kết quả cùng với mô tả rating
        res.status(201).json({
            review: newReview,
            message: `Đánh giá của bạn: ${ratingDescription} (${rating} điểm)`
        });
    } catch (error) {
        console.error('Lỗi khi tạo review:', error);
        res.status(400).json({ message: 'Tạo review không thành công', error: error.message });
    }
};

// 2. Lấy danh sách review (hiển thị tên người dùng từ User)
const getAllReviews = async (req, res) => {
    try {
        // Fetch all reviews and populate user data (only firstname)
        const reviews = await Review.find()
            .populate('bookingid')  // Populate booking details if necessary
            .populate('userid', 'firstname'); // Only populate 'firstname' of the user

        // Add rating descriptions to each review based on rating value
        const reviewsWithDescription = reviews.map(review => {
            let ratingDescription = '';

            // Determine rating description based on the rating value
            if (review.rating < 3) {
                ratingDescription = 'Rất tệ';
            } else if (review.rating >= 3 && review.rating < 5) {
                ratingDescription = 'Tệ';
            } else if (review.rating >= 5 && review.rating < 7) {
                ratingDescription = 'Bình thường';
            } else if (review.rating >= 7 && review.rating < 8) {
                ratingDescription = 'Tuyệt';
            } else if (review.rating >= 8 && review.rating <= 10) {
                ratingDescription = 'Rất tuyệt';
            }

            // Return review with added rating description and user name
            return { 
                ...review.toObject(), 
                ratingDescription, 
                name: review.userid ? review.userid.firstname : 'Unknown' // Use `firstname` of the user
            };
        });

        // Send back the reviews with descriptions and names
        res.status(200).json(reviewsWithDescription);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Không thể lấy danh sách reviews', error: error.message });
    }
};

// 3. Lấy chi tiết một review (hiển thị tên người dùng)
const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;

        // Tìm review theo ID và populate Booking, User
        const review = await Review.findById(id)
            .populate('bookingid')
            .populate('userid', 'firstname'); // Chỉ lấy firstname của người dùng

        if (!review) {
            return res.status(404).json({ message: 'Review không tồn tại' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Lỗi khi lấy review:', error);
        res.status(500).json({ message: 'Không thể lấy review', error: error.message });
    }
};

// 4. Cập nhật review (chỉ người dùng đã tạo mới được sửa)
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { rating, feedback } = req.body;

        // Kiểm tra quyền chỉnh sửa (chỉ người tạo mới được cập nhật)
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review không tồn tại' });
        }
        if (review.userid.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền cập nhật review này' });
        }

        // Cập nhật review
        review.rating = rating ?? review.rating;
        review.feedback = feedback ?? review.feedback;
        await review.save();

        res.status(200).json(review);
    } catch (error) {
        console.error('Lỗi khi cập nhật review:', error);
        res.status(400).json({ message: 'Cập nhật review không thành công', error: error.message });
    }
};

// 5. Xóa review (chỉ người dùng đã tạo mới được xóa)
const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra quyền xóa (chỉ người tạo mới được xóa)
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: 'Review không tồn tại' });
        }
        if (review.userid.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Bạn không có quyền xóa review này' });
        }

        await review.deleteOne();
        res.status(200).json({ message: 'Xóa review thành công' });
    } catch (error) {
        console.error('Lỗi khi xóa review:', error);
        res.status(500).json({ message: 'Không thể xóa review', error: error.message });
    }
};



module.exports = {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,
  
};
