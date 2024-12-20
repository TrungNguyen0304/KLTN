import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './showall.css'; // Import file CSS

const PaymentList = ({ payments }) => {
  return (
    <div className="grid-container">
      {payments.map((payment, index) => (
        <div className="payment-card" key={index}>
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
            <p className="payment-card-info">
              Người Dùng: <strong>{payment.userId?.firstname || 'N/A'} {payment.userId?.lastname || 'N/A'}</strong>
            </p>
            <p className="payment-card-info">
              Số Tiền: <strong>{payment.amount?.toLocaleString() || 'N/A'} VND</strong>
            </p>
            <Link to={`/IndexShowall/${payment._id}`} className="payment-card-link">
              Xem Chi Tiết
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userid');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userid');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const url = `http://localhost:8001/api/user/userGuideId/${userId}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch payments. Status: ${response.status}`); // Fixed string interpolation
        }


        const data = await response.json();
        console.log('Response data:', data);
        console.log('Response data:', data);

        setPayments(data.payments || []); // Ensure payments exist
      } catch (err) {
        console.error('Error fetching payments:', err);
        console.error('Error fetching payments:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  return (
    <div className="app-container">
      <h1 className="app-title">Danh sách thanh toán</h1>
      {loading ? (
        <p className="app-message">Đang tải dữ liệu...</p>
      ) : error ? (
        <p className="app-message app-error">{error}</p>
      ) : (
        <PaymentList payments={payments} />
      )}
    </div>
  );
};

export default App;
