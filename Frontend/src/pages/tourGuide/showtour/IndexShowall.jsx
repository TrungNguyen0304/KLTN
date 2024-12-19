import React, { useEffect, useState } from 'react';

const PaymentList = ({ payments }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
    {payments.map((payment, index) => (
      <div key={index} style={{ textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '10px' }}>
        {payment.packageId?.image && <img src={payment.packageId?.image} alt="Package Image" style={{ maxWidth: '100%', borderRadius: '8px' }} />}
        <p>User: {payment.userId?.firstname|| 'N/A'} {payment.userId?.lastname || 'N/A'}</p>
        <p>Package: {payment.packageId?.package_name || 'N/A'}</p>
        <p>Amount: {payment.amount || 'N/A'}</p>
      </div>
    ))}
  </div>
  
  );
};

const App = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const url = `http://localhost:8001/api/user/userGuideId/${userId}`;
        // console.log("Fetching payments from URL:", url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch payments. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Response data:", data);

        setPayments(data.payments || []);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setError(err.message);
      }
    };

    fetchPayments();
  }, [userId]);

  return (
    <div>
      <h1>Danh sách thanh toán</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <PaymentList payments={payments} />
      )}
    </div>
  );
};

export default App;
