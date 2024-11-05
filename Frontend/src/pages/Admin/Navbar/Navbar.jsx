import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 
import Logo from "../../../assets/admin/imgs/logo.png";
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="navbaradmin">
            <div className="logo">
                <img src={Logo} alt="logo" />
                <span>
                    AD<span>MIN</span>
                </span>
            </div>
            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="user-icon1">
                <Link to="#">
                    <FaUserCircle />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
