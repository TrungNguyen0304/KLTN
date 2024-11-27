import React, { useState, useEffect } from "react";
import "../Footer/footer.css";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", toggleVisible);
      // Dọn dẹp sự kiện khi component bị gỡ bỏ
      return () => window.removeEventListener("scroll", toggleVisible);
    }
  }, []);

  return (
    <>
      <footer className="pt-5">
        <Container>
          <Row>
            <Col md="3" sm="12" className="quick_link mt-3 mt-md-0 ">
              <h4 className="mt-lg-0 mt-sm-3">Công Ty</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <NavLink to="/">Về Chúng Tôi</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Tin Tức</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Câu Hỏi Thường Gặp</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md="3" sm="12" className="quick_link mt-3 mt-md-0 ">
              <h4 className="mt-lg-0 mt-sm-3">Khám Phá</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <NavLink to="/">Câu Hỏi Thường Gặp</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Danh Sách Tour</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Điểm Đến</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md="3" sm="12" className="quick_link mt-3 mt-md-0 ">
              <h4 className="mt-lg-0 mt-sm-3">Liên Kết Nhanh</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <NavLink to="/">Trang Chủ</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Về Chúng Tôi</NavLink>
                </ListGroup.Item>
                <ListGroup.Item>
                  <NavLink to="/">Liên Hệ</NavLink>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md="3" sm="12" className="location mt-3 mt-md-0 ">
              <h4 className="mt-lg-0 mt-sm-3">Thông Tin Liên Hệ</h4>

              <div className="d-flex align-items-center">
                <p className="pb-2"> Thừa Thiên Huế, Viêt Nam</p>
              </div>

              <div className="d-flex align-items-top my-2">
                <i className="bi bi-geo-alt me-3"></i>
                <a target="_blank" rel="noopener noreferrer" href="mailto:Build@gmail.com" className="d-block">
                  Build@gmail.com
                </a>
              </div>
              <div className="d-flex align-items-top ">
                <i className="bi bi-telephone me-3"></i>
                <a target="_blank" rel="noopener noreferrer" href="tel:9876543210" className="d-block">
                  9876543210
                </a>
              </div>
            </Col>
          </Row>
          <Row className="py-2 bdr mt-3">
            <Col className="col copyright">
              <p className="text-light">@ 2024. Travel Tất cả quyền được bảo vệ</p>
            </Col>
          </Row>
        </Container>
      </footer>

      <div
        id="back-top"
        onClick={scrollTop}
        className={visible ? "active" : ""}
      >
        <i className="bi bi-arrow-up"></i>
      </div>
    </>
  );
};

export default Footer;
