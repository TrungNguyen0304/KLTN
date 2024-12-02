import React, { useEffect, useState, useCallback } from "react";

const CustomerReviews = ({ tourPackageId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(1);
    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDelete, setShowDelete] = useState({});
    const [editReview, setEditReview] = useState(null); // Track review being edited

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

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

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
                }),
            });

            const data = await response.json();

            if (response.status === 201) {
                setMessage("Đánh giá đã được tạo thành công!");
                setRating(1);
                setFeedback("");
                fetchReviews(); // Refresh reviews
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
                fetchReviews(); // Refresh reviews
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
        setEditReview(review); // Set review to edit
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
                setEditReview(null); // Clear edit state
                fetchReviews(); // Refresh reviews
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

    const handleCancelEdit = () => {
        setEditReview(null); // Cancel edit mode
        setRating(1);
        setFeedback("");
    };

    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    const averageRating = totalReviews > 0 ? (totalRating / totalReviews).toFixed(1) : 0;

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    return (
        <div className="recent-reviews mt-4">
            {/* Notification */}
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
                        {reviews.map((review) => (
                            <li key={review._id} className="review-item">
                                <div className="review-avatar">
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="review-content">
                                    <p className="review-name">
                                        {review.user?.firstname || "Anonymous"} {review.user?.lastname}
                                        <span className="review-date">
                                            {new Date(review.createdAt).toLocaleDateString("vi-VN")}
                                        </span>
                                    </p>
                                    <div className="review-rating">
                                        {editReview && editReview._id === review._id ? (
                                            <>
                                                {/* Inline edit for rating */}
                                                <input
                                                    type="number"
                                                    value={rating}
                                                    min="1"
                                                    max="10"
                                                    onChange={(e) => setRating(Number(e.target.value))}
                                                    className="form-control"
                                                />
                                            </>
                                        ) : (
                                            <span className="rating-box1">{review.rating || "N/A"}</span>
                                        )}
                                        <span className="rating-description">
                                            {review.ratingDescription || "No description"}
                                        </span>
                                    </div>

                                    {/* Feedback */}
                                    {editReview && editReview._id === review._id ? (
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            className="form-control"
                                            rows="4"
                                        ></textarea>
                                    ) : (
                                        <p className="review-comment">"{review.feedback || "No feedback provided"}</p>
                                    )}

                                    {/* Edit and Delete buttons */}
                                    <div className="more-options">
                                        {/* Edit or Update Review Button */}
                                        {editReview && editReview._id === review._id ? (
                                            <>
                                                <button
                                                    className="btn btn-sm btn-success"
                                                    onClick={() => handleUpdateReview(review._id)}
                                                >
                                                    Lưu
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Hủy
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                            </>
                                        )}

                                        {/* More options button */}
                                        <button
                                            className="more-button"
                                            onClick={() => toggleDeleteVisibility(review._id)}
                                        >
                                            ...
                                        </button>

                                        {/* Only show delete and edit buttons if the `showDelete` for this review is true and it's not being edited */}
                                        {showDelete[review._id] && !editReview && (
                                            <div className="action-buttonss">
                                                <button
                                                    className="btn btn-sm delete-button-review"
                                                    onClick={() => handleDeleteReview(review._id)}
                                                >
                                                    Xóa
                                                </button>
                                                <button
                                                    className="btn btn-sm edit-button-review"
                                                    onClick={() => handleEditReview(review)}
                                                >
                                                    Sửa
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* Create Review Form */}
            <div className="create-review mt-4">
                <h5 className="dgganday">Đánh Giá</h5>
                <form onSubmit={handleSubmitReview}>
                    <div className="form-group">
                        <label htmlFor="rating">Đánh giá (1-10):</label>
                        <input
                            type="number"
                            id="rating"
                            value={rating}
                            min="1"
                            max="10"
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="feedback">Phản hồi:</label>
                        <textarea
                            id="feedback"
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="form-control"
                            rows="4"
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
