import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userid");
  // console.log("UserId in Notifications component:", userId);

  useEffect(() => {
    if (!userId) {
      console.error(
        "Người dùng chưa đăng nhập. Không tìm thấy userId trong localStorage."
      );
      return;
    }

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/notifications/${userId}`
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Lỗi tìm nạp thông báo:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleNotificationClick = (id) => {
    navigate(`/notifications/${id}`);
  };
  const handleDeleteNotification = async (notificationId) => {
    try {
      await axios.delete(
        `http://localhost:8001/api/notifications/${notificationId}`
      );
      setNotifications(
        notifications.filter(
          (notification) => notification._id !== notificationId
        )
      );
    } catch (error) {
      console.error("Lỗi xóa thông báo:", error);
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      await axios.delete(
        `http://localhost:8001/api/notifications/${userId}/all`
      );
      setNotifications([]); // Clear all notifications from the state
    } catch (error) {
      console.error("Lỗi xóa tất cả thông báo:", error);
    }
  };
  return (
    <Container className="notifications-page">
      <h2 className="page-title">
        <FaBell /> Notifications
      </h2>
      <Button
        variant="danger"
        className="delete-all-btn"
        onClick={handleDeleteAllNotifications}
      >
        Xóa tất cả thông báo
      </Button>

      <ListGroup>
  {notifications.length > 0 ? (
    notifications.map((notification) => (
      <ListGroup.Item
        key={notification._id}
        className="notification-item"
        onClick={() => handleNotificationClick(notification._id)}
      >
        <div className="notification-message">{notification.message}</div>
        <div className="notification-date">
          {new Date(notification.createdAt).toLocaleDateString()}
        </div>
        <Button
          variant="danger"
          size="sm"
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation(); 
            handleDeleteNotification(notification._id);
          }}
        >
          Xóa
        </Button>
      </ListGroup.Item>
    ))
  ) : (
    <p className="no-notifications">Hiện tại không có thông báo nào.</p>
  )}
</ListGroup>

    </Container>
  );
};

export default Notifications;
