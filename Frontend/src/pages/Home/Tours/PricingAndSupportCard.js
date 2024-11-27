import React, { useState, useEffect } from "react";
import { Col, Card, Button, Modal, Form, ListGroup } from "react-bootstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";

const PricingAndSupportCard = ({
  tourPackage,
  adults,
  setAdults,
  children,
  setChildren,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    specialRequest: "",
  });
  const [user, setUser] = useState(null); // Lưu thông tin người dùng

  const adultPrice = tourPackage?.adult_price || 0;
  const childrenPrice = tourPackage?.pricechildren_price || 0;
  const totalPrice = adultPrice * adults + childrenPrice * children;

  // Fetch user data khi mở modal
  const fetchUserData = async () => {
    const id = localStorage.getItem("userid");
    if (id) {
      try {
        const response = await axios.get(`http://localhost:8001/api/user/${id}`);
        setUser(response.data);
        // Cập nhật form với thông tin người dùng
        setFormData((prevFormData) => ({
          ...prevFormData,
          firstName: response.data.firstname || "",
          lastName: response.data.lastname || "",
          email: response.data.email || "",
          phone: response.data.phoneNumber || "",
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const bookingData = {
        userId: localStorage.getItem("userid"), // User ID from localStorage
        packageId: tourPackage._id, // Package ID from the `tourPackage` object
        booking_date: new Date(), // Set the current date as booking date
        travel_date: formData.checkInDate, // Use the check-in date from the form
        total: totalPrice, // Total price calculated above
        status: "pending", // Default status (you can change this as needed)
        special_requests: formData.specialRequest, // Special requests from the form
      };

      const response = await axios.post("http://localhost:8001/api/booking/create", bookingData);
      console.log("Booking created:", response.data);
      setShowModal(false); 
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
  };

  // Gọi fetchUserData mỗi khi modal mở
  useEffect(() => {
    if (showModal) {
      fetchUserData();
    }
  }, [showModal]);

  return (
    <Col md={4}>
      <aside>
        <Card className="price-card shadow-lg p-4 mb-4">
          <h1 className="text-center text-primary mb-4" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
            Lịch Trình và Giá Tour
          </h1>
          <Card.Body>
            {/* Date Selection */}
            <div className="mb-4">
              <div>
                <label htmlFor="tourDuration" style={{ fontSize: "1rem", fontWeight: "600" }}>
                  Chọn Lịch Trình và Xem Giá:
                </label>
                <select id="tourDuration" className="form-select mt-2" style={{ fontSize: "1rem", borderRadius: "8px", padding: "10px" }}>
                  {tourPackage.durations.map((duration, index) => (
                    <option key={index} value={index}>
                      {`${new Date(duration.start_date).toLocaleDateString("vi-VN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} `}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Participant Types */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-muted">
                  Người lớn (&gt;10 tuổi):
                  <h1 className="font-bold mb-0 h2">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tourPackage.adult_price)}
                  </h1>
                </span>
                <div className="d-flex align-items-center">
                  <Button variant="outline-secondary" onClick={() => setAdults(Math.max(adults - 1, 1))} disabled={adults === 1}>-</Button>
                  <span className="mx-2">{adults}</span>
                  <Button variant="outline-secondary" onClick={() => setAdults(adults + 1)}>+</Button>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-muted">
                  Trẻ em (2–10 tuổi):
                  <h1 className="font-bold mb-0 h2">
                    {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(tourPackage.pricechildren_price)}
                  </h1>
                </span>
                <div className="d-flex align-items-center">
                  <Button variant="outline-secondary" onClick={() => setChildren(Math.max(children - 1, 0))}>-</Button>
                  <span className="mx-2">{children}</span>
                  <Button variant="outline-secondary" onClick={() => setChildren(children + 1)}>+</Button>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="mt-4 text-center">
              <h5 className="text-muted mb-2" style={{ fontSize: "1rem" }}>Giá gốc</h5>
              <h1 className="text-primary mb-3" style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice)}
              </h1>
            </div>

            {/* Booking Button */}
            <Button className="primaryBtn w-100 d-flex justify-content-center fw-bold" onClick={() => setShowModal(true)}>
              Đặt ngay
            </Button>
          </Card.Body>
        </Card>
        {/* Modal for Form */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Thông Tin Của Bạn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Họ</Form.Label>
                <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Nhập họ" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Nhập tên" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Nhập email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Nhập số điện thoại" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Yêu cầu đặc biệt</Form.Label>
                <Form.Control as="textarea" rows={3} name="specialRequest" value={formData.specialRequest} onChange={handleInputChange} placeholder="VD: ăn chay, bị dị ứng..." />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
            <Button variant="primary" onClick={handleSubmit}>Xác nhận</Button>
          </Modal.Footer>
        </Modal>
      </aside>
    </Col>
  );
};

export default PricingAndSupportCard;
