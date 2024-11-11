import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CreateUser.css'; 

const CreateUser = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
      firstname: formData.get('firstName'),
      lastname: formData.get('lastName'),
      phoneNumber: formData.get('phone'),
      role: formData.get('role'),
    };

    try {
      const response = await fetch('http://localhost:8001/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setMessage(result.message);

      if (response.status === 201) {
        navigate('/user'); 
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className='parent-container'>
      <div className="form-container">
        <h2>Thêm người dùng</h2>
        {message && <div className="message">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group-inline ">
            <div className="form-group anh">
              <label htmlFor="firstName">Tên</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Nhập tên"
                required
              />
            </div>
            <div className="form-group anh">
              <label htmlFor="lastName">Họ</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Nhập họ"
                required
              />
            </div>
          </div>
          <div className="form-group anh">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Nhập Email"
              required
            />
          </div>
          <div className="form-group anh">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Nhập Số điện thoại"
              required
            />
          </div>
          <div className="form-group anh">
            <label htmlFor="password">Mật Khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <div className="form-group anh">
            <label htmlFor="role" className="form-label">Vai trò</label>
            <select
              className="form-select"
              id="role"
              name="role"
              required
            >
              <option value="admin">Admin</option>
              <option value="user">Người dùng</option>
            </select>
          </div>
          <button className='buttonCreate' type="submit">Đăng Ký</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
