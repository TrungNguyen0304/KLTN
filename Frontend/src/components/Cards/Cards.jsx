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
          to={`/destinations/${destination._id}`}  // Route đến các tour của destination
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
                {destination.tourCount ? `${destination.tourCount} tours` : 'No tours available'}
              </span>
            </Card.Body>
          </Card>
        </NavLink>
      </div>
    </>
  );
};

export default Cards;
