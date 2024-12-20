import React, { useEffect, useState } from 'react';
import './showall.css'; // Import file CSS
import { Link } from 'react-router-dom';

const App = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userid');

  // Fetch payments when component loads
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const url = `http://localhost:8001/api/user/userGuideId/${userId}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch payments. Status: ${response.status}`);
        }

        const data = await response.json();
        setPayments(data.payments || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  // Handle delete payment
  const handleDelete = async (paymentId) => {
    try {
      const response = await fetch(`http://localhost:8001/api/booking/payment/${paymentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete payment');
      }

      // Update state to remove the deleted payment
      setPayments(payments.filter(payment => payment._id !== paymentId));

      alert('Thanh toán đã xóa thành công!');
    } catch (err) {
      alert('Lỗi khi xóa thanh toán: ' + err.message);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Lịch trình hướng dẫn du lịch</h1>
      {loading ? (
        <p className="app-message">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="app-message app-error">{error}</p>
      ) : (
        <div className="payment-list">
          {payments.map((payment, index) => (
            <div className="payment-card" key={index}>
              {console.log(payment)}  {/* Log để kiểm tra cấu trúc dữ liệu */}
              {payment.packageId?.image && (
                <img
                  src={payment.packageId.image}
                  alt="Package Image"
                  className="payment-card-image"
                />
              )}
              <div className="payment-card-content">
                <h3 className="payment-card-title">
                  {payment.packageId?.package_name || 'Gói Tour: N/A'}
                </h3>
                <p className="payment-card-user">
                  Khách hàng: <strong>{payment.userId?.firstname || 'N/A'} {payment.userId?.lastname || 'N/A'}</strong>
                </p>
                <p className="payment-card-amount">
                  Số Tiền: <strong>{payment.amount?.toLocaleString() || 'N/A'} VND</strong>
                </p>
                <div className="payment-card-actions">
                  <button
                    onClick={() => handleDelete(payment._id)} // Delete handler
                    className="payment-card-delete"
                  >
                    Xóa
                  </button>
                  <Link
                    to={`/IndexShowall/${payment._id}`} // Correct template literal usage
                    className="payment-card-link"
                  >
                    Xem Chi Tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
