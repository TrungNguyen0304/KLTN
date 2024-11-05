import React  from 'react';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {

  return (
    <div className="register-container">
      <h1 className="register-title">Đăng Ký</h1>

      <form >
        <div className="register-input-group">
          <div className="register-input-field">
            <label>Tên</label>
            <input
              type="text"
              className="register-input"

            />

          </div>
          <div className="register-input-field">
            <label>Họ</label>
            <input
              type="text"
              className="register-input"

            />

          </div>
        </div>
        <div className="register-input-group">
          <label>Email</label>
          <input
            type="email"
            className="register-input"

          />

        </div>
        <div className="register-input-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            className="register-input"

          />

        </div>
        <div className="register-input-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            className="register-input"

          />

        </div>
        <div className="register-links">
          <a href="/" className="register-link">Quên mật khẩu?</a>
          <Link to="/login" className="register-link">Login</Link>
        </div>
        <button type="submit" className="register-button">Đăng Ký</button>
      </form>
      <div className="register-divider">Hoặc</div>
      <div className="register-social-buttons">
        <button className="social-button facebook">Facebook</button>
        <button className="social-button google">Google</button>
      </div>
    </div>
  );
}

export default Register;
