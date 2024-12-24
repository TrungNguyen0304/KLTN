import React, { useEffect, useState } from "react";
import "./showall.css"; // Import file CSS
import { Link } from "react-router-dom";

const PaymentList = ({ payments, onDelete }) => {
  const userId = localStorage.getItem('userid'); 
  return (
    <div className="grid-container">
      {payments.map((tour, index) => (
        <div className="payment-card" key={index}>
          {tour.packageId?.image && (
            <img
              src={tour.packageId.image}
              alt="Package Image"
              className="payment-card-image"
            />
          )}
          <div className="payment-card-content">
            <h3 className="payment-card-title">
              {tour.packageId?.package_name || "Gói Tour: N/A"}
            </h3>
            {/* <p className="payment-card-info">
              Tổng Số Tiền:{" "}
              <strong>{tour.totalAmount?.toLocaleString()} VND</strong>
            </p> */}
            <p className="payment-card-info">
              Tổng Số Người: <strong>{tour.totalPeople}</strong>
            </p>
            <p className="payment-card-users">
              Người Dùng:{" "}
              {tour.users.map((user, idx) => (
                <span key={idx}>
                  {user.firstname} {user.lastname}
                  {idx < tour.users.length - 1 && ", "}
                </span>
              ))}
            </p>
            <div className="payment-card-actions">
              <Link
                to={`/IndexShowall/${userId}/${tour.packageId._id}`}
                className="payment-card-link"
              >
                Xem Chi Tiết
              </Link>
              <button
                onClick={() => onDelete(tour._id)}
                className="payment-card-delete"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [payments, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userid");

  // Fetch tours when component loads
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const url = `http://localhost:8001/api/user/userGuideId/${userId}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch tours. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response data:", data);
        setTours(data.payments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [userId]);

  // Handle delete tour
  const handleDelete = async (tourId) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/booking/payment/${tourId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete payment");
      }

      // Update state to remove the deleted tour
      setTours(payments.filter((tour) => tour._id !== tourId));

      alert("Thanh toán đã xóa thành công!");
    } catch (err) {
      alert("Lỗi khi xóa thanh toán: " + err.message);
    }
  };

  return (
    <div className="app-container1">
      <h1 className="app-title">Lịch trình hướng dẫn du lịch</h1>
      {loading ? (
        <p className="app-message">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="app-message app-error">{error}</p>
      ) : (
        <PaymentList payments={payments} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default App;
