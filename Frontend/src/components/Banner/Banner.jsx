import React from "react";
import { Carousel } from "react-bootstrap";
import sliderImg from "../../assets/images/slider/1.png";
import sliderImg1 from "../../assets/images/slider/2.png";
import "../Banner/banner.css";

const Banner = () => {
  return (
    <>
      <section className="slider">
        <Carousel variant="dark">
          <Carousel.Item>
            <img src={sliderImg} className="d-block w-100" alt="First slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading">
                  HÀNH TRÌNH KHÁM PHÁ <span>THẾ GIỚI</span>
                </h5>
                <p className="sub_text">
                  Lorem Ipsum là văn bản giả được sử dụng trong ngành in ấn và tạo kiểu chữ. Lorem Ipsum đã trở thành văn bản giả chuẩn của ngành kể từ những năm 1500.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img src={sliderImg1} className="d-block w-100" alt="First slide" />
            <Carousel.Caption>
              <div className="slider_des">
                <h5 className="heading">
                  ĐỊA ĐIỂM XINH ĐẸP <span>ĐỂ THAM QUAN</span>
                </h5>
                <p className="sub_text">
                  Lorem Ipsum là văn bản giả được sử dụng trong ngành in ấn và tạo kiểu chữ. Lorem Ipsum đã trở thành văn bản giả chuẩn của ngành kể từ những năm 1500.
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </>
  );
};

export default Banner;
