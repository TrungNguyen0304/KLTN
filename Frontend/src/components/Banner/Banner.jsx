import React from "react";
import { Carousel } from "react-bootstrap";
import sliderImg from "../../assets/images/slider/1.png";
import sliderImg1 from "../../assets/images/slider/2.png";
import "@fontsource/roboto/900.css";
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
                Đây là hình ảnh đẹp về một quốc gia được giới thiệu trong hành trình khám phá thế giới. Hãy cùng tìm hiểu thêm về nét đẹp văn hóa và phong cảnh tuyệt vời này.
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
                Đây là hình ảnh đẹp về một quốc gia được giới thiệu trong hành trình khám phá thế giới. Hãy cùng tìm hiểu thêm về nét đẹp văn hóa và phong cảnh tuyệt vời này.
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
