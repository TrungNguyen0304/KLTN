import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
      
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8001/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        localStorage.setItem("userid", data.userid);

        // console.log("Id người dùng mới sau khi đăng nhập:", data.userid);
        // console.log(
        //   "Id người dùng được lưu trữ trong localStorage:",
        //   localStorage.getItem("userid")
        // );

        showCustomAlert(data.message, "success");
        setTimeout(() => {
          navigate("/"); 
          window.location.reload(); 

        }, 2000);
      } else {
        showCustomAlert(data.message, "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showCustomAlert("Có lỗi xảy ra.", "error");
    }
  };

  // Hàm hiển thị thông báo tùy chỉnh
  const showCustomAlert = (message, type) => {
    const alertBox = document.getElementById("customAlert");
    const alertMessage = document.getElementById("alertMessage");

    alertMessage.textContent = message;
    alertBox.style.display = "block";

    // Thay đổi màu sắc dựa trên loại thông báo
    if (type === "success") {
      alertBox.style.backgroundColor = "#28a745"; // màu xanh cho thành công
    } else {
      alertBox.style.backgroundColor = "#dc3545"; // màu đỏ cho lỗi
    }

    // Tự động ẩn sau 3 giây
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 2000);
  };

  return (
    <div className="login-container">
      <div
        id="customAlert"
        className="custom-alert"
        style={{ display: "none" }}
      >
        <span id="alertMessage"></span>
        <button
          onClick={() =>
            (document.getElementById("customAlert").style.display = "none")
          }
        >
          Đóng
        </button>
      </div>

      <h1 className="login-title">Đăng nhập</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-input-group">
          <label>Email / Số điện thoại di động</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
        </div>
        <div className="login-input-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />
        </div>
        <div className="login-links">
          <a href="/" className="login-link">
            Quên mật khẩu?
          </a>
          <Link to="/register" className="login-link">
            Đăng Ký
          </Link>
        </div>
        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
      <div className="login-divider">Hoặc</div>
      <div className="login-social-buttons">
        <button className="social-button facebook">Facebook</button>
        <button className="social-button google">Google</button>
      </div>
    </div>
  );
}

export default Login;
