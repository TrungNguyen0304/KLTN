import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PaymentList = ({ payments }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
      {payments.map((payment, index) => (
        <div
          key={index}
          style={{
            textAlign: 'center',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '10px',
          }}
        >
          {payment.packageId?.image && (
            <img
              src={payment.packageId.image}
              alt="Package Image"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          )}
          <p>Người Dùng: {payment.userId?.firstname || 'N/A'} {payment.userId?.lastname || 'N/A'}</p>
          <p>Gói Tour: {payment.packageId?.package_name || 'N/A'}</p>
          <p>Số Tiền: {payment.amount || 'N/A'}</p>
          {/* Add a link to the payment details page */}
          <Link to={`/IndexShowall/${payment._id}`} style={{ color: 'blue' }}>
            Xem Chi Tiết
          </Link>
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

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const url = `http://localhost:8001/api/user/userGuideId/${userId}`; // Fixed missing quotes

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch payments. Status: ${response.status}`); // Fixed string interpolation
        }

        const data = await response.json();
        console.log('Response data:', data);

        setPayments(data.payments || []); // Ensure payments exist
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError(err.message);
      } finally {
        setLoading(false); // Hide loading spinner after fetch
      }
    };

    fetchPayments();
  }, [userId]);

  return (
    <div>
      <h1>Danh sách thanh toán</h1>
      {loading ? (
        <p>Loading...</p> // Loading state
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p> // Error state
      ) : (
        <PaymentList payments={payments} />
      )}
    </div>
  );
};

export default App;
