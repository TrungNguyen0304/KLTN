import React from "react";
import { Card } from "react-bootstrap";
import "../Cards/card.css";
import { NavLink } from "react-router-dom";

const Cards = ({ destination }) => {
  return (
    <>
      <div className="img-box">
        {/* Khi nhấn vào ảnh, chuyển đến trang các tour của destination */}
        <NavLink
          className="body-text text-dark text-decoration-none"
          to={`/destination/${destination._id}`} 
        >
          <Card>
            <Card.Img
              variant="top"
              src={destination.Images}
              className="img-fluid destination-image"
              alt={destination.DestinationName}
            />
            <Card.Body>
              <Card.Title>{destination.DestinationName}</Card.Title>
              {/* Hiển thị số lượng tour nếu có */}
              <span className="tours">
                {destination.tourCount ? `${destination.tourCount} tours` : 'Không có tour'}
              </span>
            </Card.Body>
          </Card>
        </NavLink>
      </div>
    </>
  );
};

export default Cards;