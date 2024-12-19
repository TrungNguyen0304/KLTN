import React, { useState, useEffect } from "react";
import "./OrderStatus.css";

function TourCard({ imageSrc, title, guide, days, price, location }) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="tour-card">
      {/* Image */}
      <div className={`tour-image ${imageError ? "image-error" : ""}`}>
        {!imageError ? (
          <img src={imageSrc} alt="Tour" onError={() => setImageError(true)} />
        ) : (
          <span>No Image Available</span>
        )}
      </div>

      {/* Tour Information */}
      <div className="tour-info">
        <p className="tour-location">
          📍 <strong>{location}</strong>
        </p>
        <h3 className="tour-title">{title}</h3>
        <p className="tour-guide">
          <strong>Hướng dẫn viên:</strong> {guide}
        </p>
        <p className="tour-days">📅 {days}</p>
        <p className="tour-price">{price} ₫</p>
      </div>
    </div>
  );
}

export default function TourGrid() {
  const [payments, setPayments] = useState([]);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/api/booking/${userId}`
        );
        const data = await response.json();
        if (data.success) {
          setPayments(data.payments);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [userId]);

  return (
    <div>
      {/* Tour History Section */}
      <section className="tour-history">
        <h2>Lịch sử đặt</h2>
        <p>
          Khám phá các chuyến du lịch đã từng tổ chức với những kỷ niệm đáng nhớ
          và hành trình thú vị.
        </p>
      </section>

      <div className="tour-grid">
        {payments.length ? (
          payments.map((payment, index) => (
            <TourCard
              key={index}
              imageSrc={payment.packageId?.image}
              title={payment.packageId?.package_name}
              guide={`${payment.packageId?.tourGuideId?.first_name} ${payment.packageId?.tourGuideId?.last_name}`}
              days={payment.packageId?.durations?.map((duration) => (
                <div key={duration._id}>
                  <p>{duration.durationText}</p>
                  <p>{duration.itinerary}</p>
                </div>
              ))}
              price={payment.amount}
              location={payment.packageId?.locationId?.firstname}
            />
          ))
        ) : (
          <p>No payment history available</p>
        )}
      </div>
    </div>
  );
}
