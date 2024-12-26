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
                      KHÁM PHÁ THẾ GIỚI CÙNG CHÚNG TÔI!
                    </h3>
                  </div>
                </div>
              </div>
              <h2 className="h2 font-bold pt-4 pb-2">
                KHÁM PHÁ THẾ GIỚI CÙNG CHÚNG TÔI!
              </h2>
              <p className="body-text mb-2">
                Chúng tôi là một công ty du lịch với sứ mệnh mang đến những trải nghiệm đáng nhớ nhất cho mọi khách hàng. Từ các tour tham quan địa phương cho đến hành trình vòng quanh thế giới, chúng tôi cam kết đem lại dịch vụ tốt nhất.
              </p>
              <p className="body-text mb-2">
                Được thành lập bởi những người đam mê du lịch, chúng tôi hiểu rõ rằng mỗi chuyến đi không chỉ là di chuyển mà còn là hành trình khám phá văn hóa, kết nối và tận hưởng từng khoảnh khắc.
              </p>
              <p className="body-text mb-2">
                Hãy để chúng tôi đồng hành cùng bạn trên hành trình tìm kiếm những trải nghiệm mới mẻ, đầy cảm hứng và trọn vẹn.
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
                    Từ các bãi biển nhiệt đới đến những thành phố sôi động, chúng tôi cung cấp hơn 50 điểm đến hấp dẫn trên toàn thế giới để bạn lựa chọn.
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
                    Với mối quan hệ đối tác lâu năm và mạng lưới rộng khắp, chúng tôi đảm bảo mang lại mức giá cạnh tranh nhất.
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
                    Hệ thống đặt chỗ của chúng tôi được thiết kế để tiết kiệm thời gian, giúp bạn hoàn tất chỉ trong vài bước đơn giản.
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