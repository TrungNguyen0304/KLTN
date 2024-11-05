import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu tất cả các trường đều được điền
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.password
    ) {
      showCustomAlert("Vui lòng nhập đầy đủ thông tin.", 'error');
      return;
    }

    // Kiểm tra định dạng email
    if (!formData.email.endsWith("@gmail.com")) {
      showCustomAlert("Email phải kết thúc bằng @gmail.com.", 'error');
      return;
    }

    // Kiểm tra mật khẩu
    if (formData.password.length < 8 || !/[A-Z]/.test(formData.password)) {
      showCustomAlert(
        "Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái viết hoa.",
        'error'
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        showCustomAlert(data.message, 'success');
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        showCustomAlert(data.message, 'error');
      }
    } catch (error) {
      console.error("Registration error:", error);
      showCustomAlert("Có lỗi xảy ra.", 'error');
    }
  };

  // Hàm hiển thị thông báo tùy chỉnh
  const showCustomAlert = (message, type) => {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");

    alertMessage.textContent = message;
    alertBox.style.display = "block";

    // Thay đổi màu sắc dựa trên loại thông báo
    if (type === 'success') {
      alertBox.style.backgroundColor = "#28a745"; // màu xanh cho thành công
    } else {
      alertBox.style.backgroundColor = "#dc3545"; // màu đỏ cho lỗi
    }

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 3000);
  };

  return (
    <div className="register-container">
      <div id="customAlert" className="custom-alert" style={{ display: "none" }}>
        <span id="alertMessage"></span>
        <button onClick={() => document.getElementById('customAlert').style.display = 'none'}>
          Đóng
        </button>
      </div>

      <h1 className="register-title">Đăng Ký</h1>
      <form onSubmit={handleSubmit}>
        <div className="register-input-group">
          <div className="register-input-field">
            <label>Tên</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>
          <div className="register-input-field">
            <label>Họ</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="register-input"
              required
            />
          </div>
        </div>
        <div className="register-input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
            required
          />
        </div>
        <div className="register-input-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="register-input"
            required
          />
        </div>
        <div className="register-input-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
            required
          />
        </div>
        <div className="register-links">
          <a href="/" className="register-link">
            Quên mật khẩu?
          </a>
          <Link to="/login" className="register-link">
            Login
          </Link>
        </div>
        <button type="submit" className="register-button">
          Đăng Ký
        </button>
      </form>
      <div className="register-divider">Hoặc</div>
      <div className="register-social-buttons">
        <button className="social-button facebook">Facebook</button>
        <button className="social-button google">Google</button>
      </div>
    </div>
  );
};

export default Register;
