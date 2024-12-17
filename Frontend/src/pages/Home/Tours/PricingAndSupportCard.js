import React, { useState, useEffect } from "react";
import { Col, Card, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import momoImage from "../../../assets/images/icons/momo.png";
import { toast } from "react-toastify";

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
    specialRequest: "",
  });
  const [user, setUser] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const adultPrice = tourPackage?.adult_price || 0;
  const childrenPrice = tourPackage?.pricechildren_price || 0;
  const totalPrice = adultPrice * adults + childrenPrice * children;
  const totalPeople = adults + children;

  const fetchUserData = async () => {
    const id = localStorage.getItem("userid");
    if (id) {
      try {
        const response = await axios.post(
          `http://localhost:8001/api/user/${id}`
        );  
        setUser(response.data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          firstName: response.data.firstname || "",
          lastName: response.data.lastname || "",
          email: response.data.email || "",
          phone: response.data.phoneNumber || "",
        }));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkPaymentStatus = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/check-payment-status/${id}`
      );

      if (response.data.success) {
        return response.data.status;
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
      return false;
    }
  };

  const handlePayment = async (id, total) => {
    const userId = localStorage.getItem("userid");
    try {
      const response = await axios.post(
        `http://localhost:8001/api/booking/payment/${id}`,
        { total, 
          userId: userId, 
        },
        
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.resultCode === 0) {
        const shortLink = response.data.payUrl;
        window.location.href = shortLink;
      } else {
        console.error("Payment failed:", response.data);
        toast.error("Payment initiation failed.");
      }
    } catch (error) {
      console.error("Error making payment:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
        toast.error(
          `Có lỗi xảy ra khi thực hiện thanh toán: ${
            error.response.data.error || error.message
          }`
        );
      } else {
        console.error("No response received:", error.message);
        toast.error(`Có lỗi xảy ra khi thực hiện thanh toán: ${error.message}`);
      }
    }
  };
 

  useEffect(() => {
    if (showModal) {
      fetchUserData();
    }
  }, [showModal]);

  return (
    <Col md={4}>
      <aside>
        <Card className="price-card shadow-lg p-4 mb-4">
          <h1
            className="text-center text-primary mb-4"
            style={{ fontSize: "1.8rem", fontWeight: "bold" }}
          >
            Lịch Trình và Giá Tour
          </h1>
          <Card.Body>
            {/* Date Selection */}
            <div className="mb-4">
              <div>
                <label
                  htmlFor="tourDuration"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Chọn Lịch Trình và Xem Giá:
                </label>
                <select
                  id="tourDuration"
                  className="form-select mt-2"
                  style={{
                    fontSize: "1rem",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                  onChange={(e) =>
                    setSelectedDuration(tourPackage.durations[e.target.value])
                  }
                >
                  <option value="">-- Chọn lịch trình --</option>
                  {tourPackage.durations.map((duration, index) => (
                    <option key={index} value={index}>
                      {`${new Date(duration.start_date).toLocaleDateString(
                        "vi-VN",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}`}
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
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(tourPackage.adult_price)}
                  </h1>
                </span>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => setAdults(Math.max(adults - 1, 1))}
                    disabled={adults === 1}
                  >
                    -
                  </Button>
                  <span className="mx-2">{adults}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setAdults(adults + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-muted">
                  Trẻ em (2–10 tuổi):
                  <h1 className="font-bold mb-0 h2">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(tourPackage.pricechildren_price)}
                  </h1>
                </span>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => setChildren(Math.max(children - 1, 0))}
                  >
                    -
                  </Button>
                  <span className="mx-2">{children}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => setChildren(children + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Total Price */}
            <div className="mt-4 text-center">
              <h5 className="text-muted mb-2" style={{ fontSize: "1rem" }}>
                Giá gốc
              </h5>
              <h1
                className="text-primary mb-3"
                style={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(totalPrice)}
              </h1>
            </div>

            {/* Total Number of People */}
            <div className="mt-4 text-center">
              <h5 className="text-muted mb-2" style={{ fontSize: "1rem" }}>
                Tổng số người tham gia
              </h5>
              <h1
                className="text-primary mb-3"
                style={{ fontSize: "2rem", fontWeight: "bold" }}
              >
                {totalPeople} Người
              </h1>
            </div>

            {/* Booking Button */}
            <Button
              className="primaryBtn w-100 d-flex justify-content-center fw-bold"
              onClick={() => setShowModal(true)}
            >
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
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Yêu cầu đặc biệt</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="specialRequest"
                  value={formData.specialRequest}
                  onChange={handleInputChange}
                />
              </Form.Group>

              {/* Momo Payment */}
            </Form>
            <div
              onClick={() => handlePayment(tourPackage._id, totalPrice)}
              className="w-100 d-flex justify-content-center align-items-center mt-3 custom-button"
              style={{
                cursor: "pointer",
                border: "1px solid #28a745",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <img
                src={momoImage}
                alt="Momo Payment"
                style={{ width: "30px", marginRight: "10px" }}
              />
              Thanh toán qua Momo
            </div>
          </Modal.Body>
        </Modal>
      </aside>
    </Col>
  );
};

export default PricingAndSupportCard;
