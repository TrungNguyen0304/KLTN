import React, { useEffect, useState } from 'react';

const CustomerReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/review'); 
                const data = await response.json();

                // Ensure the data is an array before setting state
                if (Array.isArray(data)) {
                    setReviews(data);
                } else {
                    console.error("Received data is not an array", data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    // Format the createdAt date
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    return (
        <div className="tour_details">
            <p className="h5 danhgia">Đánh giá khách hàng về tour</p>

            {/* Rating Section */}
            <div className="rating-section d-flex align-items-center">
                <div className="rating-box text-white d-flex align-items-center justify-content-center">
                    <span>9.1</span>
                    <span className="small">/10</span>
                </div>
                <div className="rating-text ms-3">
                    <p className="text-success1 m-0">Tuyệt vời</p>
                    <p className="m-0">{reviews.length} đánh giá</p>
                </div>
            </div>

            {/* Recent Reviews Section */}
            <div className="recent-reviews mt-4">
                <h5 className="dgganday">Đánh giá gần đây</h5>
                <ul className="review-list">
                    {reviews.map((review, index) => (
                        <li key={index} className="review-item1 d-flex align-items-start">
                            <div className="review-avatar">
                                <i className="fa fa-user"></i>
                            </div>
                            <div className="review-content">
                                <p className="review-name">
                                    {review.name || 'Anonymous'} {/* Handle missing name */}
                                    <span className="review-date">{formatDate(review.createdAt)}</span>
                                </p>
                                <div className="review-rating">
                                    <span className="rating-box1">{review.rating || 'N/A'}</span> {/* Handle missing rating */}
                                    <span className="rating-text text-success">{review.ratingDescription || 'No description'}</span>
                                </div>
                                <p className="review-comment">"{review.feedback || 'No feedback provided'}"</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CustomerReviews;
