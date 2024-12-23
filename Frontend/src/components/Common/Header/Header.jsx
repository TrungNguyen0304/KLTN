import React, { useEffect, useContext, useState } from "react";
import {
  Container,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaHistory, FaBell } from "react-icons/fa";
import { UserContext } from "../../../context/UserContext";

import "../Header/header.css";
import axios from "axios";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const userId = localStorage.getItem("userid");

  const navigate = useNavigate();

  const toggleMenu = () => setOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userid");

    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => caches.delete(cacheName));
      });
    }

    setIsLoggedIn(false);
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const isSticky = () => {
    const header = document.querySelector(".header-section");
    if (header) {
      window.scrollY >= 120
        ? header.classList.add("is-sticky")
        : header.classList.remove("is-sticky");
    }
  };
  useEffect(() => {
    // Kiểm tra nếu userId có trong localStorage
    if (!userId) {
      console.error(
        "Người dùng chưa đăng nhập. Không tìm thấy userId trong localStorage."
      );
      return;
    }

    // Hàm lấy thông báo từ API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/notifications/${userId}`
        );
        const fetchedNotifications = response.data.notifications;
        setNotifications(fetchedNotifications);

        const unreadNotifications = fetchedNotifications.filter(
          (notification) => !notification.read
        );
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/destination");
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("scroll", isSticky);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("scroll", isSticky);
    };
  }, [setIsLoggedIn]);

  return (
    <header className="header-section">
      <Container>
        <Navbar expand="lg" className="p-0">
          <Navbar.Brand>
            <NavLink to="/">TRAVEL</NavLink>
          </Navbar.Brand>

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            placement="start"
            show={open}
          >
            <Offcanvas.Header>
              <h1 className="logo"></h1>
              <span className="navbar-toggler ms-auto" onClick={toggleMenu}>
                <i className="bi bi-x-lg"></i>
              </span>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <NavLink className="nav-link" to="/">
                  TRang chủ
                </NavLink>
                <NavLink className="nav-link" to="/about-us">
                  GIỚI THIỆU
                </NavLink>
                <NavLink className="nav-link" to="/tours">
                  DU LỊCH
                </NavLink>

                {/* Destination Dropdown */}
                <NavDropdown
                  title={
                    <NavLink
                      to="/destinations"
                      style={{ textDecoration: "none" }}
                    >
                      ĐIỂM ĐẾN
                    </NavLink>
                  }
                >
                  {destinations.length > 0 ? (
                    destinations.map((destination) => (
                      <div key={destination._id}>
                        <NavLink
                          key={destination._id}
                          className="nav-link text-dark"
                          to={`/destination/${destination._id}`}
                        >
                          {destination.DestinationName}
                        </NavLink>
                        {destination.tours && destination.tours.length > 0 && (
                          <div className="tour-links">
                            {destination.tours.map((tour) => (
                              <NavLink
                                key={tour._id}
                                className="nav-link text-dark"
                                to={`/destinationDetails/${destination._id}/tour/${tour._id}`}
                              >
                                {tour.package_name}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>Đang tải điểm đến...</p>
                  )}
                </NavDropdown>

                <NavLink className="nav-link" to="/gallery">
                  PHÒNG TRƯNG BÀY
                </NavLink>
                <NavLink className="nav-link" to="/contact-us">
                  LIÊN HỆ
                </NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          {/* Menu toggle for mobile */}
          <div className="ms-md-4 ms-2">
            <li className="d-inline-block d-lg-none ms-3 toggle_btn">
              <i
                className={open ? "bi bi-x-lg" : "bi bi-list"}
                onClick={toggleMenu}
              ></i>
            </li>
          </div>

          {/* User section with login/logout */}
          <Nav className="align-items-center">
            <li className="nav-item">
              <FaBell
                className="notification-icon"
                onClick={() => navigate("/notifications")}
              />
              {unreadCount > 0 && (
                <span className="notification-count">{unreadCount}</span>
              )}
            </li>

            {isLoggedIn ? (
              <NavDropdown
                title={<FaUserCircle className="user-icon-header" />}
              >
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  <FaUserCircle className="user-icon" /> Hồ sơ của tôi
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/OrderStatus")}>
                  <FaHistory className="user-icon" /> Đặt chỗ của tôi
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="user-icon" /> Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <button onClick={handleLogin} className="btn btn-primary">
                Đăng nhập
              </button>
            )}
          </Nav>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
