import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { SidebarData } from "../Data/Data";
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/admin/imgs/logo.png';
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(null); // State để theo dõi mục được chọn
  const navigate = useNavigate();

  // Kiểm tra localStorage khi trang tải lại
  useEffect(() => {
    const storedActiveItem = localStorage.getItem("activeItem");
    if (storedActiveItem) {
      setActiveItem(storedActiveItem);
    }
  }, []);

  const handleMenuItemClick = (item) => {
    setActiveItem(item.heading); // Cập nhật mục đang được chọn
    localStorage.setItem("activeItem", item.heading); // Lưu mục được chọn vào localStorage
    navigate(item.Link); // Điều hướng đến trang tương ứng
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        {/* Logo */}
        <div className="logo1">
          <img src={Logo} alt="logo" />
          <span>
            AD<span>MIN</span>
          </span>
        </div>
        <div className="menu">
          {SidebarData.map((item, index) => (
            <div
              className={`menuItem ${activeItem === item.heading ? "active" : ""}`} // Thêm class active khi mục được chọn
              key={index}
              onClick={() => handleMenuItemClick(item)} // Cập nhật activeItem khi click
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Nội dung chính */}
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        {/* <h1>Chào mứng đến với  Trang chủủ</h1> */}
        {/* Nội dung chính ở đây */}
      </div>
    </div>
  );
};

export default Sidebar;
