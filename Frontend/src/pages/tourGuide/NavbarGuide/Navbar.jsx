import React, { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

import { FaBell, FaEnvelope, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { Nav, NavDropdown } from 'react-bootstrap';
import { UserContext } from "../../../context/UserContext";

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

     // Lấy thông tin user từ localStorage
     const user = JSON.parse(localStorage.getItem("user"));
     const userName = user?.firstname || "Người dùng"; // Dùng "Người dùng" nếu không có tên
 
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

    return (
        <nav className="navbaradmin">
            {/* Search Bar */}
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search-input" />
            </div>

            {/* Notification and User Section */}
            <div className="user-icons">
                <Link to="#" className="icon">
                    <FaBell />
                    <span className="badge">3</span>
                </Link>
                <Link to="#" className="icon">
                    <FaEnvelope />
                    <span className="badge">3</span>
                </Link>

                {/* User Profile Dropdown */}
                <Nav className="align-items-center">
                    {isLoggedIn && (
                        <NavDropdown
                            title={<FaUserCircle className="user-icon-header1" />}
                        >
                             <span style={{ marginLeft: "8px" }}>{userName}</span>
                            <NavDropdown.Item onClick={() => navigate("/profile")}>
                                <FaUserCircle className="user-icon" /> Hồ sơ của tôi
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>
                                <FaSignOutAlt className="user-icon" /> Đăng xuất
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Nav>
            </div>
        </nav>
    );
};

export default Navbar;
