import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import {
  Col,
  Container,
  Row,
  Card,
  ListGroup,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import image from "../../../assets/images/new/contact-us.png";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    message: "", // Thêm trường message vào formData
  });

  const [message, setMessage] = useState(""); // State for success or error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if the form is being submitted

  const userId = localStorage.getItem("userid");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axios.post(`http://localhost:8001/api/user/${userId}`);
          setFormData({
            firstname: response.data.firstname || "",
            lastname: response.data.lastname || "",
            email: response.data.email || "",
            phoneNumber: response.data.phoneNumber || "",
            message: "",  // Đảm bảo message trống khi tải dữ liệu
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    document.title = "Contact us";
    window.scroll(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);  // Thêm state để điều khiển quá trình gửi dữ liệu
    setMessage("");  // Xóa thông báo trước khi gửi

    const { firstname, lastname, email, phoneNumber, message } = formData;

    try {
      const response = await fetch("http://localhost:8001/api/message/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,  // Lấy token từ localStorage
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phoneNumber,
          message,  // Gửi thông tin tin nhắn
        }),
      });

      const data = await response.json();

      if (response.status === 201 && data.message) {
        setMessage("Tin nhắn đã được gửi thành công!");  // Hiển thị thông báo khi gửi thành công
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phoneNumber: "",
          message: "",
        });  // Reset form sau khi gửi
      } else {
        setMessage(data.message || "Đã xảy ra lỗi khi gửi tin nhắn.");  // Hiển thị lỗi nếu có
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      setMessage("Đã xảy ra lỗi khi gửi tin nhắn.");  // Hiển thị lỗi khi có sự cố trong quá trình gửi
    } finally {
      setIsSubmitting(false);  // Kết thúc quá trình gửi
    }
  };

  return (
    <>
      <Breadcrumbs title="Liên hệ với chúng tôi" pagename="Liên hệ" />
      <section className="contact pt-5">
        <Container>
          <Row>
            <Col md="12">
              <h1 className="mb-2 h1 font-bold">Hãy kết nối và tìm hiểu nhau nhé</h1>
            </Col>
          </Row>
          <Row className="py-5">
          <Col lg="4" md="6" className="mb-4 mb-lg-0">
              <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="bg-info rounded-circle text-info shadow-sm bg-opacity-10 p-3 mb-2">
                      <i className="bi bi-headset h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Gọi cho chúng tôi</Card.Title>
                  <p className="mb-3 body-text">
                    Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Đừng ngần ngại liên hệ với chúng tôi bất kỳ lúc nào để được giải đáp và tư vấn tốt nhất.
                  </p>
                  <div className="d-block justify-content-between">
                    <a href="tel:+123456789" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-phone me-1"></i>
                      +12 3456 789
                    </a>
                    <a href="tel:+123456789" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-telephone me-1"></i>
                      +12 3456 789
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4" md="6" className="mb-4 mb-lg-0">
            <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="bg-danger rounded-circle text-danger shadow-sm bg-opacity-10 p-3 mb-2">
                      <i className="bi bi-envelope h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Email của chúng tôi</Card.Title>
                  <p className="mb-3 body-text">
                    Hãy gửi email cho chúng tôi để nhận được hỗ trợ nhanh chóng và tận tình nhất. Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn.
                  </p>
                  <div className="d-block justify-content-between">
                    <a href="mailto:demo@gmail.com" className="btn btn-light me-2 btn-sm">
                      <i className="bi bi-envelope me-2"></i>
                      TrungNguyen15989@gmail.com
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4" md="6" className="mb-4 mb-lg-0">
            <Card className="border-0 shadow rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="bg-warning rounded-circle text-warning shadow-sm bg-opacity-10 p-3 mb-2">
                      <i className="bi bi-globe h3"></i>
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Truyền thông xã hội</Card.Title>
                  <p className="mb-3 body-text">
                    Kết nối với chúng tôi trên các nền tảng mạng xã hội để cập nhật những thông tin mới nhất và cùng chia sẻ những khoảnh khắc ý nghĩa.
                  </p>
                  <div className="d-block justify-content-center">
                    <ListGroup horizontal className="justify-content-center">
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-youtube"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-instagram"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-twitter"></i>
                      </ListGroup.Item>
                      <ListGroup.Item className="border-0">
                        <i className="bi bi-youtube"></i>
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4" md="12" className="mb-4 mb-lg-0">
              {/* Mạng xã hội */}
            </Col>
          </Row>

          <Row className="py-5 align-items-center">
            <Col xl="6" md="6" className="d-none d-md-block">
              <img src={image} alt="" className="img-fluid me-3" />
            </Col>
            <Col xl="6" md="6">
              <Card className="bg-light p-4 border-0 shadow-sm">
                <div className="form-box">
                  <h1 className="h3 font-bold mb-4">Gửi tin nhắn cho chúng tôi</h1>
                  <Form onSubmit={handleSubmitMessage}>
                    <Row>
                      <Col md="6">
                        <FloatingLabel controlId="firstname" label="Tên" className="mb-4">
                          <Form.Control
                            type="text"
                            placeholder="Firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md="6">
                        <FloatingLabel controlId="lastname" label="Họ" className="mb-4">
                          <Form.Control
                            type="text"
                            placeholder="Lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md="6">
                        <FloatingLabel controlId="email" label="Địa chỉ email" className="mb-4">
                          <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md="6">
                        <FloatingLabel controlId="phoneNumber" label="Số điện thoại" className="mb-4">
                          <Form.Control
                            type="text"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                      </Col>
                      <Col md="12">
                        <FloatingLabel controlId="message" label="Tin nhắn">
                          <Form.Control
                            as="textarea"
                            placeholder="Message"
                            style={{ height: "126px" }}
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                          />
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <button className="primaryBtn mt-3" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                    </button>
                  </Form>
                  {message && <p className="mt-3">{message}</p>} {/* Display success or error message */}
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Contact;
