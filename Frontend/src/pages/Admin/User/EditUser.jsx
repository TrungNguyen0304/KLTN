import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/user/user/${id}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8001/api/user/update/${id}`, userData);
      navigate("/user");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="parent-container">
      <div className="form-container">
        <h2>Cập nhật người dùng</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group-inline">
            <div className="form-group anh">
              <label htmlFor="firstname">Tên</label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Nhập tên"
                value={userData.firstname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group anh">
              <label htmlFor="lastname">Họ</label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Nhập họ"
                value={userData.lastname}
                onChange={handleChange}
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
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group anh">
            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Nhập Số điện thoại"
              value={userData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group anh">
            <label htmlFor="password">Mật Khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group anh">
            <label htmlFor="role" className="form-label">
              Vai trò
            </label>
            <select
              className="form-select"
              id="role"
              name="role"
              value={userData.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="buttonCreate" type="submit">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
