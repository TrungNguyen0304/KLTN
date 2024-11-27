import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Col, Container, Form, Row, Card, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import axios from "axios";
import "../Booking/booking.css";

const Booking = () => {
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tourPackage, setTourPackage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adults, setAdults] = useState(1);  // Initial value
  const [children, setChildren] = useState(0);  // Initial value
  
  useEffect(() => {
    const savedStartDate = localStorage.getItem('startDate');
    const savedEndDate = localStorage.getItem('endDate');

    if (savedStartDate && savedEndDate) {
      setStartDate(new Date(savedStartDate));
      setEndDate(new Date(savedEndDate));     
    }

    const fetchTourPackage = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8001/api/tourPackage/${id}`);
          if (response.data?.adult_price) {
            setTourPackage(response.data);

            if (!savedStartDate || !savedEndDate) {
              if (response.data.startDate && response.data.endDate) {
                setStartDate(new Date(response.data.startDate));
                setEndDate(new Date(response.data.endDate));
              }
            }
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching tour package:', error);
          setLoading(false);
        }
      }
    };

    const fetchUserData = async () => {
      const id = localStorage.getItem("userid");  
      if (id) {
        try {
          const response = await axios.get(`http://localhost:8001/api/user/${id}`);
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchTourPackage();
    fetchUserData();
  }, [id]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    localStorage.setItem('startDate', date); 
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    localStorage.setItem('endDate', date); 
  };

  if (loading) {
    return <p>Đang tải...</p>;
  }

  const basePrice = tourPackage?.totalPrice || 0; 
  const discount = 0.1;
  const discountAmount = basePrice * discount;
  const totalPrice = basePrice - discountAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const adultPrice = tourPackage?.adult_price || 0;
    const childrenPrice = tourPackage?.pricechildren_price || 0;
  
    const totalPrice = adultPrice * adults + childrenPrice * children;
  
    // Handle form submission, sending the booking data to the backend
    console.log('Booking submitted with data:', {
      startDate,
      endDate,
      user,
      tourPackage,
      totalPrice, // Pass the total price here
    });
  };
  

  return (
    <>
      <Breadcrumbs title="Đặt Chỗ" pagename="Đặt Chỗ" />
      <section className="booking-section py-5">
        <Container>
          <Row>
            <Col md="8" lg="8">
              <div className="booking-form-warp border rounded-3">
                <div className="form-title px-4 border-bottom py-3">
                  <h3 className="h4 font-bold m-0">Thông Tin Của Bạn</h3>
                </div>

                <Form className="p-4" onSubmit={handleSubmit}>
                  <Row>
                    <Form.Group as={Col} md="6" controlId="firstname" className="mb-4">
                      <Form.Label>Họ</Form.Label>
                      <Form.Control required type="text" placeholder="Họ" value={user?.firstname || ''} />
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="lastname" className="mb-4">
                      <Form.Label>Tên</Form.Label>
                      <Form.Control required type="text" placeholder="Tên" value={user?.lastname || ''} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="email.ControlInput1" as={Col} md="6">
                      <Form.Label>Địa chỉ email</Form.Label>
                      <Form.Control type="email" placeholder="name@example.com" value={user?.email || ''} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="phone" as={Col} md="6">
                      <Form.Label>Số điện thoại</Form.Label>
                      <Form.Control type="text" placeholder="Số điện thoại" value={user?.phoneNumber || ''} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="checkin" as={Col} md="6">
                      <Form.Label className="d-block">Ngày nhận phòng</Form.Label>
                      <DatePicker selected={startDate} onChange={handleStartDateChange} className="form-control" dateFormat="dd/MM/yyyy" />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="checkout" as={Col} md="6">
                      <Form.Label className="d-block">Ngày trả phòng</Form.Label>
                      <DatePicker selected={endDate} onChange={handleEndDateChange} className="form-control" dateFormat="dd/MM/yyyy" />
                    </Form.Group>

                    <Form.Group as={Col} md="6" controlId="special_requests" className="mb-4">
                      <Form.Label>Yêu cầu đặc biệt</Form.Label>
                      <Form.Control required type="text" placeholder="VD: ăn chay, bị dị ứng, người lớn tuổi..." />
                    </Form.Group>

                    <Col md="12">
                      <button className="primaryBtn"> Gửi Ngay</button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>

            <Col md="4" lg="4">
              <Card className="card-info p-0 shadow-sm bg-white">
                <Card.Header>
                  <h1 className="font-bold h4 mt-2">Tóm Tắt Giá</h1>
                </Card.Header>
                <Card.Body className="pb-0">
                  <ListGroup>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span> Giá Cơ Bản</span>
                      <strong>{basePrice}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span>Giảm Giá Tổng Cộng <span className="badge bg-danger">10%</span></span>
                      <strong>-{discountAmount}</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span>Thuế & Phí</span>
                      <strong>{basePrice * 0.1}</strong>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between py-4">
                  <span className="font-bold h5">Thanh Toán Ngay</span>
                  <strong className="font-bold h5">{totalPrice}</strong>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Booking;
