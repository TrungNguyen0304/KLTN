import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PaymentDetail.css'; // Import file CSS

const PaymentDetail = () => {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState(null);
  const [zoomImage, setZoomImage] = useState(null); // Trạng thái hình ảnh phóng to

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/booking/payment/${paymentId}`);
        if (!response.ok) {
          throw new Error('Không thể lấy chi tiết thanh toán');
        }
        const data = await response.json();
        console.log(data); // In toàn bộ dữ liệu để kiểm tra
        setPayment(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPaymentDetail();
  }, [paymentId]);

  const handleImageClick = (image) => {
    setZoomImage(image); // Cập nhật trạng thái hình ảnh phóng to
  };

  const closeModal = () => {
    setZoomImage(null); // Đóng modal
  };

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!payment) {
    return <p className="loading">Đang tải...</p>;
  }

  return (
    <div className="payment-detail-container">
      <h1 className="payment-title">Chi tiết về thông tin chuyến du lịch</h1>

      <div className="payment-section">
        <p><strong>Tên Gói Tour:</strong> {payment.packageId?.package_name || 'N/A'}</p>
        <p><strong>Số Tiền:</strong> {payment.amount || 'N/A'} VND</p>
        <p><strong>Số người:</strong> {payment.totalPeople || 'N/A'}</p>
        <p><strong>Khách hàng:</strong> {payment.userId?.firstname || 'N/A'} {payment.userId?.lastname || 'N/A'}</p>
        <p><strong>Quốc gia:</strong> {payment.packageId?.locationId?.firstname || 'N/A'}</p>
        <p><strong>Điểm đến:</strong> {payment.packageId?.destinationId?.DestinationName || 'N/A'}</p>
      </div>

      {payment.packageId?.durations && payment.packageId.durations.length > 0 ? (
        <div className="duration-section">
          <h2 className="section-title">Lịch Trình</h2>
          <ul>
            {payment.packageId.durations.map((duration, index) => (
              <li key={index} className="duration-item">
                <p><strong>Bắt đầu:</strong> {new Date(duration.start_date).toLocaleDateString()}</p>
                <p><strong>Kết thúc:</strong> {new Date(duration.end_date).toLocaleDateString()}</p>
                <p><strong>Thời lượng:</strong> {duration.durationText || 'N/A'}</p>
                <h3>Hành trình:</h3>
                <ul className="itinerary-list">
                  {duration.itinerary.map((item, idx) => (
                    <li key={idx} className="itinerary-item">
                      <p><strong>{item.day}</strong>: {item.activity}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="no-data">Không có thông tin lịch trình</p>
      )}

      <h2 className="section-title">Hình ảnh</h2>
      {payment.packageId?.groupImages && Array.isArray(payment.packageId.groupImages) ? (
        <div className="image-section">
          {payment.packageId.groupImages.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`Group Image ${idx + 1}`}
              className="payment-detail-image"
              onClick={() => handleImageClick(image)} // Bắt sự kiện click
            />
          ))}
        </div>
      ) : (
        <p className="no-data">Không có hình ảnh nhóm</p>
      )}

      {zoomImage && (
        <div className="modal1" onClick={closeModal}>
          <img src={zoomImage} alt="Zoomed" className="modal-image1" />
        </div>
      )}
    </div>
  );
};

export default PaymentDetail;
