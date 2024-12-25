import React, { useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Container, Row, Col, Card } from "react-bootstrap";
import aboutImg from "../../../assets/images/about/aboutimg.png";
import "./about.css";
import icons1 from "../../../assets/images/icons/destination.png";
import icons2 from "../../../assets/images/icons/best-price.png";
import icons3 from "../../../assets/images/icons/quick.png";

const About = () => {
  useEffect(() => {
    document.title = "Giới thiệu về chúng tôi";
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Breadcrumbs title="Giới thiệu" pagename="Giới thiệu" />
      <section className="py-5">
        <Container>
          <Row>
            <Col md="8">
              <div className="about-content">
                <div className="about-image position-relative">
                  <img
                    src={aboutImg}
                    alt="Giới thiệu"
                    className="img-fluid rounded-5"
                  />
                  <div className="about-image-content position-absolute top-50 end-0 p-md-4 p-3 rounded-5 shadow-sm">
                    <h3 className="h2 fw-bold text-white">
                      CHÚNG TÔI LÀ LỰA CHỌN TỐT NHẤT CHO DU LỊCH!
                    </h3>
                  </div>
                </div>
              </div>
              <h2 className="h2 font-bold pt-4 pb-2">
                CHÚNG TÔI LÀ LỰA CHỌN TỐT NHẤT CHO DU LỊCH!
              </h2>
              <p className="body-text mb-2">
                Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ.
                Lorem Ipsum đã trở thành văn bản chuẩn của ngành từ những năm 1500s,
                khi một thợ in ẩn danh xáo trộn một bộ sưu tập văn bản để tạo ra một
                cuốn sách mẫu.
              </p>
              <p className="body-text mb-2">
                Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ.
                Lorem Ipsum đã trở thành văn bản chuẩn của ngành từ những năm 1500s,
                khi một thợ in ẩn danh xáo trộn một bộ sưu tập văn bản để tạo ra một
                cuốn sách mẫu.
              </p>
              <p className="body-text mb-2">
                Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ.
                Lorem Ipsum đã trở thành văn bản chuẩn của ngành từ những năm 1500s,
                khi một thợ in ẩn danh xáo trộn một bộ sưu tập văn bản để tạo ra một
                cuốn sách mẫu.
              </p>
            </Col>
            <Col md="4">
              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2">
                      <img src={icons1} alt="icon" className="img-fluid" />
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Hơn 50 điểm đến</Card.Title>
                  <p className="mb-2 body-text">
                    Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2">
                      <img src={icons2} alt="icon" className="img-fluid" />
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Giá tốt nhất trong ngành</Card.Title>
                  <p className="mb-2 body-text">
                    Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ.
                  </p>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm rounded-3 mb-4">
                <Card.Body className="text-center">
                  <div className="d-flex justify-content-center align-item-search my-2">
                    <div className="rounded-circle bg-light shadow-sm bg-opacity-10 p-2">
                      <img src={icons3} alt="icon" className="img-fluid" />
                    </div>
                  </div>
                  <Card.Title className="fw-bold h5">Đặt chỗ siêu nhanh</Card.Title>
                  <p className="mb-2 body-text">
                    Lorem Ipsum chỉ đơn giản là văn bản giả của ngành in ấn và sắp chữ.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default About;
