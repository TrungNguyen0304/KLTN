import React, { useEffect, useState, useCallback } from "react";

const CustomerReviews = ({ tourPackageId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDelete, setShowDelete] = useState({});
    const [editReview, setEditReview] = useState(null);

    const [currentPage, setCurrentPage] = useState(1); // Phân trang
    const reviewsPerPage = 5; // Số đánh giá trên mỗi trang
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    // Function to calculate total and average ratings
    const calculateRatings = (reviews) => {
        const totalReviews = reviews.length;
        const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
        const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;
        return { totalReviews, totalRating, averageRating };
    };

    // Fetch reviews
    const fetchReviews = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8001/api/review/${tourPackageId}`);
            const data = await response.json();

            if (Array.isArray(data)) {
                setReviews(data);
            } else {
                console.error("API did not return an array:", data);
                setReviews([]);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            setReviews([]);
        } finally {
            setLoading(false);
        }
    }, [tourPackageId]);

    useEffect(() => {
        if (tourPackageId) {
            fetchReviews();
        }
    }, [tourPackageId, fetchReviews]);

    useEffect(() => {
        setCurrentPage(1);
    }, [reviews]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");
    
        const { totalReviews, totalRating, averageRating } = calculateRatings(reviews);
    
        try {
            const response = await fetch(`http://localhost:8001/api/review/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    rating,
                    feedback,
                    tourPackageId,
                    totalReviews, 
                    totalRating, 
                    averageRating,
                }),
            });
    
            const data = await response.json(); 
    
            if (response.status === 201 && data.review) {
                setReviews((prevReviews) => [data.review, ...prevReviews]); 
                setMessage("Đánh giá đã được tạo thành công!");
                setRating(1);
                setFeedback("");
                fetchReviews();
            } else {
                setMessage(data.message || "Đã xảy ra lỗi");
            }
    
        } catch (error) {
            console.error("Error submitting review:", error);
            setMessage("Đã xảy ra lỗi khi tạo đánh giá.");
        } finally {
            setIsSubmitting(false);
        }
    };
    
  
  

    const handleDeleteReview = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa đánh giá này không?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8001/api/review/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                setMessage("Xóa đánh giá thành công!");
                fetchReviews();
            } else {
                const data = await response.json();
                setMessage(data.message || "Đã xảy ra lỗi khi xóa đánh giá.");
            }
        } catch (error) {
            console.error("Error deleting review:", error);
            setMessage("Đã xảy ra lỗi khi xóa đánh giá.");
        }
    };

    const toggleDeleteVisibility = (reviewId) => {
        setShowDelete((prevState) => ({
            ...prevState,
            [reviewId]: !prevState[reviewId],
        }));
    };

    const handleEditReview = (review) => {
        setEditReview(review);
        setRating(review.rating);
        setFeedback(review.feedback);
    };

    const handleUpdateReview = async (reviewId) => {
        setIsSubmitting(true);
        setMessage("");

        try {
            const response = await fetch(`http://localhost:8001/api/review/${reviewId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    rating,
                    feedback,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setMessage("Cập nhật đánh giá thành công!");
                setEditReview(null);
                fetchReviews();
            } else {
                setMessage(data.message || "Đã xảy ra lỗi khi cập nhật đánh giá.");
            }
        } catch (error) {
            console.error("Error updating review:", error);
            setMessage("Đã xảy ra lỗi khi cập nhật đánh giá.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBlurEdit = (e) => {
        const relatedTarget = e.relatedTarget;
        const isEditingField =
            relatedTarget &&
            (relatedTarget.id === "edit-rating" || relatedTarget.id === "edit-feedback");

        if (!isEditingField) {
            setEditReview(null);
            setRating(1);
            setFeedback("");
        }
    };

    const handleKeyDown = (e, reviewId) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleUpdateReview(reviewId);
        }
    };

    const { totalReviews, averageRating } = calculateRatings(reviews);

    // Tính toán dữ liệu dựa trên phân trang
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    return (
        <div className="recent-reviews mt-4">
            {message && <p className="message">{message}</p>}

            <h5 className="dgganday">Đánh giá gần đây</h5>
            {totalReviews === 0 ? (
                <p>Chưa có đánh giá nào cho gói tour này.</p>
            ) : (
                <>
                    <div className="review-summary">
                        <div className="rating-box">
                            <span className="rating-value">{averageRating}</span>
                            <span className="rating-out-of">/ 10</span>
                        </div>
                        <span className="rating-description">{averageRating >= 8 ? "Rất tốt" : "Tốt"}</span>
                        <span className="total-reviews">| {totalReviews} đánh giá</span>
                    </div>
                    <ul className="review-list">
                        {currentReviews.map((review) => (
                            <li key={review._id} className="review-item">
                                <div className="review-content">
                                    <p className="review-name">
                                        {review.user?.firstname || "Anonymous"} {review.user?.lastname}
                                        <span className="review-date">
                                            {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                                        </span>
                                    </p>
                                    <div className="review-rating">
                                        {editReview && editReview._id === review._id ? (
                                            <input
                                                type="number"
                                                id="edit-rating"
                                                value={rating}
                                                min="1"
                                                max="10"
                                                onChange={(e) => setRating(Number(e.target.value))}
                                                className="form-control"
                                                onBlur={handleBlurEdit}
                                                onKeyDown={(e) => handleKeyDown(e, review._id)}
                                            />
                                        ) : (
                                            <span className="rating-box1">{review.rating || "N/A"}</span>
                                        )}
                                    </div>
                                    {editReview && editReview._id === review._id ? (
                                        <textarea
                                            id="edit-feedback"
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            className="form-control"
                                            rows="4"
                                            onBlur={handleBlurEdit}
                                            onKeyDown={(e) => handleKeyDown(e, review._id)}
                                        ></textarea>
                                    ) : (
                                        <p className="review-comment">"{review.feedback || "No feedback provided"}"</p>
                                    )}
                                    <div className="more-options">
                                        <button
                                            className="more-button"
                                            onClick={() => toggleDeleteVisibility(review._id)}
                                        >
                                            ...
                                        </button>
                                        {showDelete[review._id] && !editReview && (
                                            <div className="action-buttonss">
                                                <div className="dropdown-menu1">
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => handleDeleteReview(review._id)}
                                                    >
                                                        Xóa
                                                    </button>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => handleEditReview(review)}
                                                    >
                                                        Sửa
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="btn"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, index) => index + 1)
                                .filter(
                                    (page) =>
                                        page === 1 || // Hiển thị trang đầu
                                        page === totalPages || // Hiển thị trang cuối
                                        (page >= currentPage - 1 && page <= currentPage + 1) // Hiển thị các trang xung quanh trang hiện tại
                                )
                                .map((page, index, array) => (
                                    <>
                                        {index > 0 && page !== array[index - 1] + 1 && (
                                            <span key={`dots-${index}`} className="dots">
                                                ...
                                            </span>
                                        )}
                                        <button
                                            key={page}
                                            className={`btn ${page === currentPage ? "active" : ""}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    </>
                                ))}

                            <button
                                className="btn"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            <div className="create-review mt-4">
                <h5 className="dgganday">Đánh Giá</h5>
                <form onSubmit={handleSubmitReview}>
                    <div className="form-group">
                        <label htmlFor="rating">Đánh giá (1-10):</label>
                        <input
                            type="number"
                            id="rating"
                            min="1"
                            max="10"
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="feedback">Nhận xét:</label>
                        <textarea
                            id="feedback"
                            onChange={(e) => setFeedback(e.target.value)}
                            className="form-control"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomerReviews;