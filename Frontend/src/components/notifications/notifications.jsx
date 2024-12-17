import React, { useEffect, useState } from "react";
import { Container, ListGroup, Button, Dropdown } from "react-bootstrap";
// import { FaEllipsisV } from "react-icons/fa"; // Import dấu ba chấm
import { FaBell } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
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
        // console.log("API Response:", response.data);
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
      setNotifications([]); // Xóa toàn bộ state thông báo
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
        variant="link"
        className="delete-all-btn "
        onClick={handleDeleteAllNotifications}
      >
        <i className="bi bi-trash delete-all-icon"></i>
      </Button>

      <ListGroup>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <ListGroup.Item
              key={notification._id}
              className="notification-item"
            >
              <div className="notification-content">
                <div className="notification-message">
                  {notification.message}
                </div>
                <div className="notification-date">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Dropdown dấu ba chấm */}
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  className="options-btn"
                  id={`dropdown-${notification._id}`}
                >
                  {/* <FaEllipsisV /> */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      navigate(`/notifications/${notification._id}`)
                    }
                  >
                    Xem
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDeleteNotification(notification._id)}
                  >
                    Xóa
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
