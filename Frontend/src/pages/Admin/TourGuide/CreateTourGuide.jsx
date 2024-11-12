import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  
import axios from 'axios'; 
import './IndexTour.css';

const CreateTourGuide = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl); 
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('first_name', formData.first_name);
    data.append('last_name', formData.last_name);
    data.append('phone_number', formData.phone_number);
    data.append('email', formData.email);
    data.append('image', formData.image);
  
    try {
      const response = await fetch("http://localhost:8001/api/tourGuide/create", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({
          first_name: '',
          last_name: '',
          phone_number: '',
          email: '',
          image: null,
        });
        setPreview(null);
        navigate("/tourGuide"); 
      } else {
        alert(result.message || "Đã xảy ra lỗi khi thêm hướng dẫn viên.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi biểu mẫu:", error);
      alert("Đã xảy ra lỗi khi gửi mẫu.");
    }
  };
  
  return (
    <div className="ContainerTour">
      <div className="tour-card">
        <Form className="p-4" onSubmit={handleSubmit}>
          <h2 className="tour-title">Thông Tin Hướng Dẫn Viên</h2>

          <Form.Group controlId="first_name" className="mb-3">
            <Form.Label>Họ</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="Nhập Họ"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="last_name" className="mb-3">
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Nhập Tên"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="image" className="mb-3">
            <Form.Label>Tải lên Hình Ảnh</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {preview && <img src={preview} alt="Xem Trước Hình Ảnh" className="preview-image" />}
          </Form.Group>

          <Form.Group controlId="phone_number" className="mb-3">
            <Form.Label>Số Điện Thoại</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              placeholder="Nhập Số Điện Thoại"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Nhập Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button className="buttonCreate" type="submit">
            Gửi
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateTourGuide;
