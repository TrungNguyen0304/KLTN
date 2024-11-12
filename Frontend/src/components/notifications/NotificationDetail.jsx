import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./notifications.css";

const NotificationDetail = () => {
  const { id } = useParams();
  const [notificationDetail, setNotificationDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/notifications/detail/${id}`);
        if (response.data.success) {
          setNotificationDetail(response.data.notification);
        } else {
          console.error("Không tìm thấy thông báo.");
        }
      } catch (error) {
        console.error("Lỗi tìm nạp chi tiết thông báo:", error);
      }
    };

    fetchNotificationDetail();
  }, [id]);

  if (!notificationDetail) {
    return <p>Đang tải chi tiết thông báo...</p>;
  }

  const { bookingid: booking, userid: user, packageid: tourPackage } = notificationDetail;
  const itinerary = Array.isArray(booking?.itinerary) ? booking.itinerary : [];

  return (
    <div className="notification-detail-container">
      <h2>Thông báo đặt tour của bạn đã được xác nhận - Sẵn sàng cho cuộc phiêu lưu!</h2>
      <p className="greeting-message">Chào bạn, {user?.firstname || "Người dùng"}!</p>
      <p>
        Cảm ơn bạn đã đặt tour cùng với Travel. Email này xác nhận việc đặt tour của bạn cho chuyến phiêu lưu{' '}
        {tourPackage?.package_name || "Chuyến đi đặc biệt"}, bắt đầu vào ngày {booking?.travel_date || "Ngày chưa xác định"}.
      </p>
      <ul>
        <li><strong>Điểm đến:</strong> {tourPackage?.package_name || "Chưa có thông tin"}</li>
        <li><strong>Ngày khởi hành:</strong> {booking?.travel_date || "Ngày chưa xác định"}</li>
        <li><strong>Thời gian tour:</strong> {tourPackage?.durations?.start_date || "Không xác định"}</li>
        <li><strong>Số lượng khách:</strong> {booking?.numberOfTravelers || "Không xác định"}</li>
        <li><strong>Địa điểm lưu trú:</strong> {tourPackage?.locationId?.firstname || "Chưa có thông tin"}</li>
      </ul>
      <p>Chúng tôi đã đính kèm một lịch trình chi tiết với tất cả thông tin bạn cần để chuẩn bị cho chuyến đi của mình:</p>
      <div className="itinerary">
        {itinerary.length > 0 ? (
          itinerary.map((item, index) => (
            <div key={index} className="itinerary-item">
              <h4>{item.day}</h4>
              <p>{item.activity}</p>
            </div>
          ))  
        ) : (
          <p>Không có lịch trình cho tour này.</p>
        )}
      </div>
      <p>Giá tour: {tourPackage?.price || "Chưa xác định"} VND</p>
      <button className="back-btn" onClick={() => navigate("/notifications")}>
        Quay lại
      </button>
    </div>
  );
};

export default NotificationDetail;
