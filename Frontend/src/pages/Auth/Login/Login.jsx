import React from 'react';
import './login.css';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <h1 className="login-title">Đăng nhập</h1>
      <form>
        <div className="login-input-group">
          <label>Email / Số điện thoại di động</label>
          <input
            type="text"
            className="login-input"
          />
        </div>
        <div className="login-input-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            className="login-input"
          />
        </div>
        <div className="login-links">
          <a href="/" className="login-link">Quên mật khẩu?</a>
          <Link to="/register" className="login-link">Đăng Ký</Link>
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
