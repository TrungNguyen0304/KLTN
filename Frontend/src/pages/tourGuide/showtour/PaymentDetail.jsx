import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PaymentDetail.css"; // Import style of your choice

const PaymentDetail = () => {
  const { paymentId, packageId } = useParams(); // Ensure packageId is passed in URL
  const [payments, setPayments] = useState(null);
  const [error, setError] = useState(null);
  const [zoomImage, setZoomImage] = useState(null); // State for zoomed image
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/api/user/userGuideId/${userId}/${packageId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await response.json();
        setPayments(data.payments); // Assuming the response contains payments array
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPaymentDetail();
  }, [paymentId, packageId, userId]);

  const handleImageClick = (image) => {
    setZoomImage(image); // Set the image to zoom in
  };

  const closeModal = () => {
    setZoomImage(null); // Close the zoom modal
  };

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!payments) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="payment-detail-container">
      <h1 className="payment-title">Chi tiết chuyến tham quan</h1>

      {payments.map((payment) => (
        <div key={payment._id} className="payment-section">
          <p>
            <strong>Tour :</strong> {payment.packageId?.package_name || "N/A"}
          </p>
          <p>
            <strong>Tổng tiền:</strong> {payment.totalAmount || "N/A"} VND
          </p>
          <p>
            <strong>Tổng số người:</strong> {payment.totalPeople || "N/A"}
          </p>

          <p>
            <strong>Khách Hàng:</strong>{" "}
            {payment.users
              .map((user) => `${user.firstname} ${user.lastname}`)
              .join(", ")}
          </p>
          <p>
            <strong>Thành phố:</strong>{" "}
            {payment.packageId?.locationId?.firstname || "N/A"}
          </p>
          <p>
            <strong>Điểm đến:</strong>{" "}
            {payment.packageId?.destinationId?.DestinationName || "N/A"}
          </p>
          <p>
            <strong>Yêu cầu đặt biệt:</strong> {payment.totalspecials || "N/A"}
          </p>
          {/* Display itinerary details */}
          {payment.packageId?.durations?.length > 0 ? (
            <div className="duration-section">
              <h2 className="section-title">Hành trình</h2>
              <ul>
                {payment.packageId.durations.map((duration, index) => (
                  <li key={index} className="duration-item">
                    <p>
                      <strong>Bắt đầu :</strong>{" "}
                      {new Date(duration.start_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Kết thúc :</strong>{" "}
                      {new Date(duration.end_date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Khoảng thời gian:</strong>{" "}
                      {duration.durationText || "N/A"}
                    </p>
                    <h3>Hành trình:</h3>
                    <ul className="itinerary-list">
                      {duration.itinerary?.map((item, idx) => (
                        <li key={idx} className="itinerary-item">
                          <p>
                            <strong>{item.day}</strong>: {item.activity}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="no-data">No itinerary details available</p>
          )}

          {/* Display images */}
          <h2 className="section-title">Ảnh </h2>
          {Array.isArray(payment.packageId?.groupImages) &&
          payment.packageId.groupImages.length > 0 ? (
            <div className="image-section">
              {payment.packageId.groupImages.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`Group Image ${idx + 1}`}
                  className="payment-detail-image"
                  onClick={() => handleImageClick(image)} // Trigger image zoom
                />
              ))}
            </div>
          ) : (
            <p className="no-data">No group images available</p>
          )}
        </div>
      ))}

      {/* Modal for zooming image */}
      {zoomImage && (
        <div className="modal" onClick={closeModal}>
          <img src={zoomImage} alt="Zoomed" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default PaymentDetail;
