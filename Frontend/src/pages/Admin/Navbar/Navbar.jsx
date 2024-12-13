import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import Logo from '../../../assets/admin/imgs/logo.png';
import { FaBell, FaEnvelope, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="navbaradmin">
            {/* Logo Section */}
            <div className="logo">
                <img src={Logo} alt="logo" />
                <span>
                    AD<span>MIN</span>
                </span>
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
                <div className="profile" onClick={toggleDropdown}>
                    <img src="https://via.placeholder.com/40" alt="User" className="profile-pic" />
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="#" className="dropdown-item">
                                <FaCog /> Setting
                            </Link>
                            <Link to="#" className="dropdown-item">
                                <FaUser /> Profile
                            </Link>
                            <Link to="#" className="dropdown-item">
                                <FaEnvelope /> Messages
                            </Link>
                            <Link to="#" className="dropdown-item">
                                <FaSignOutAlt /> Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
