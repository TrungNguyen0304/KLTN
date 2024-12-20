import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PaymentDetail = () => {
  const { paymentId } = useParams();  
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/booking/payment/${paymentId}`);
        if (!response.ok) {
          throw new Error('Không thể lấy chi tiết thanh toán');
        }
        const data = await response.json();
        setPayment(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPaymentDetail();
  }, [paymentId]);

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!payment) {
    return <p>Đang tải...</p>;
  }

  return (
    <div>
      <h1>Chi Tiết Thanh Toán</h1>
      <p><strong>Tên Gói Tour:</strong> {payment.packageId?.package_name || 'N/A'}</p>
      <p><strong>Số Tiền:</strong> {payment.amount || 'N/A'}</p>
      <p><strong>Người Dùng:</strong> {payment.userId?.firstname || 'N/A'} {payment.userId?.lastname || 'N/A'}</p>
      <p><strong>ID Thanh Toán:</strong> {payment._id}</p>
      {/* Bạn có thể thêm các trường khác nếu cần */}
    </div>
  );
};

export default PaymentDetail;
