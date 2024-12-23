import React, { useState, useEffect } from "react";
import Slider from "react-slick"; // Import slider
import Banner from "../../../components/Banner/Banner";
import AdvanceSearch from "../../../components/AdvanceSearch/AdvanceSearch";
import Features from "../../../components/Features/Features";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./index.css";
import Cards from "../../../components/Cards/Cards";
import PopularCard from "../../../components/Cards/PopularCard";
import RecentTours from "./RecentTours";
import { Link, useNavigate } from "react-router-dom";
import Gallery from "../../../components/Gallery/Gallery";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [tourPackages, setTourPackages] = useState([]);
  const [visiblePackages] = useState(8); // Số lượng hiển thị ban đầu
  const navigate = useNavigate(); // Điều hướng qua các trang

  useEffect(() => {
    document.title = "Destinations";
    window.scroll(0, 0);

    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/destination"
        );
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    const fetchTourPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/tourPackage"
        );
        setTourPackages(response.data);
      } catch (error) {
        console.error("Error fetching tour packages:", error);
      }
    };

    fetchDestinations();
    fetchTourPackages();
  }, []);

  // Cấu hình slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Banner />
      {/* <AdvanceSearch /> */}
      <Features />

      <RecentTours />

      {/* Tour section with slider */}
      <section className="tours_section slick_slider">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <h1> Điểm đến hàng đầu cho kỳ nghỉ tiếp theo của bạn </h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Slider {...sliderSettings}>
                {destinations.map((destination, index) => (
                  <div key={index} className="p-3">
                    <Cards destination={destination} />
                  </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="popular py-5">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <h1> Tour du lịch phổ biến </h1>
              </div>
            </Col>
          </Row>
          <Row>
            {tourPackages.slice(0, visiblePackages).map((val, inx) => {
              return (
                <Col md={3} sm={6} xs={12} className="mb-5" key={inx}>
                  <PopularCard val={val} />
                </Col>
              );
            })}
          </Row>
          {tourPackages.length > visiblePackages && (
            <Row>
            <Col md="12" className="text-center">
              <button
                className="primary_btn"
                onClick={() => navigate("/tours")}
              >
                Xem thêm
              </button>
            </Col>
          </Row>
          )}
        </Container>
      </section>

      <section className="call_us">
        <Container>
          <Row className="align-items-center">
            <Col md="8">
              <h5 className="title">KÊU GỌI HÀNH ĐỘNG</h5>
              <h2 className="heading">
                SẴN SÀNG CHO CHUYẾN DU LỊCH KHÔNG THỂ QUÊN. HÃY NHỚ CHÚNG TÔI!
              </h2>
              <p className="text">
                Lorem Ipsum là văn bản giả được sử dụng trong ngành in ấn và tạo
                kiểu chữ. Lorem Ipsum đã trở thành văn bản giả chuẩn của ngành
                kể từ những năm 1500.
              </p>
            </Col>
            <Col md="4" className="text-center mt-3 mt-md-0">
              <Link
                href="tel:0787601735"
                className="secondary_btn bounce"
                rel="no"
              >
                Liên hệ với chúng tôi!
              </Link>
            </Col>
          </Row>
        </Container>
        <div className="overlay"></div>
      </section>

      <section className="gallery">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <h1>Thư viện ảnh</h1>{" "}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Gallery />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
