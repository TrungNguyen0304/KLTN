import React, { useState, useEffect } from "react";
import "./OrderStatus.css";

function TourCard({
  imageSrc,
  title,
  guide,
  days,
  price,
  location,
  onDelete,
  destination,
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="tour-card">
    {/* Nút Xóa */}
    <button className="delete-button" onClick={onDelete}>
      <i className="delete-icon1"></i> {/* Sử dụng biểu tượng */}
    </button>
    {/* Hình ảnh */}
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
        📍{" "}
        <strong>{`${location || "Unknown"}/${destination || "Unknown"}`}</strong>
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

  const deletePayment = async (paymentId) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/booking/${paymentId}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (data.success) {
        setPayments((prevPayments) =>
          prevPayments.filter((payment) => payment._id !== paymentId)
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

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
              imageSrc={payment.packageId?.image || "default-image.jpg"} // Provide a fallback image if none exists
              title={payment.packageId?.package_name || "No title available"}
              guide={
                `${payment.packageId?.userGuideId?.firstname || ""} ${
                  payment.packageId?.userGuideId?.lastname || ""
                }`.trim() || "No guide available"
              }
              days={
                payment.packageId?.durations
                  ?.map((duration) => `${duration.durationText || ""}`)
                  .join(", ") || "No duration available"
              }
              price={payment.amount || "Not available"}
              location={
                payment.packageId?.locationId?.firstname ||
                "No location available"
              }
              destination={
                payment.packageId?.destinationId?.DestinationName ||
                "No Destination available"
              }
              onDelete={() => deletePayment(payment._id)}
            />
          ))
        ) : (
          <p>No payment history available</p>
        )}
      </div>
    </div>
  );
}
