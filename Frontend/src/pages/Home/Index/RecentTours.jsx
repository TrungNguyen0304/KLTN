import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";
import { NavLink } from "react-router-dom";

const RecentTours = () => {
  const [recentTours, setRecentTours] = useState([]);

  useEffect(() => {
    const storedTours = JSON.parse(localStorage.getItem("recentTours")) || [];

    if (storedTours.length > 0) {
      setRecentTours(storedTours);
    }
  }, []);

  const handleRemoveTour = (tourId) => {
    const updatedTours = recentTours.filter((tour) => tour._id !== tourId);

    localStorage.setItem("recentTours", JSON.stringify(updatedTours));
    setRecentTours(updatedTours);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <section className="recent_tours py-5">
      <Container>
        {recentTours.length > 0 ? (
          <>
            <Row>
              <Col md="12">
                <div className="main_heading">
                  <h1> Tours du lịch bạn đã xem gần đây </h1>
                </div>
              </Col>
            </Row>
            <Row>
              {recentTours.map((tour, index) => (
                <Col md="4" sm="6" xs="12" key={index} className="mb-4">
                  <div className="tour_card">
                    <div className="close_button" onClick={() => handleRemoveTour(tour._id)}>×</div>
                    <div className="tour_image">
                      <img
                        src={tour.image}
                        alt={tour.package_name}
                        className="img-fluid"
                        style={{ width: "120px", height: "120px" }}
                      />
                    </div>
                    <div className="tour_content">
                      <NavLink
                        className="body-text text-dark text-decoration-none"
                        to={`/tour-details/${tour._id}`}
                      >
                        <h5 className="tour_title">
                          {tour.package_name || "Unnamed Package"}
                        </h5>
                      </NavLink>
                      <p className="tour_price">{tour.adult_price ? formatPrice(tour.adult_price) : "N/A"}</p>
                      {tour.rating && (
                        <p className="tour_rating">
                          {tour.rating} : Rất tốt ({tour.reviews} đánh giá)
                        </p>
                      )}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Row>

          </Row>
        )}
      </Container>
    </section>
  );
};

export default RecentTours;
