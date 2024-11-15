import React from "react";
import { Card } from "react-bootstrap";
import "../Cards/card.css";
import { NavLink } from "react-router-dom";

const Cards = ({ destination }) => {
  return (
    <>
      <div className="img-box">
        <NavLink className="body-text text-dark text-decoration-none" to={`/tour-details/${destination._id}`}>
          <Card>
            <Card.Img
              variant="top"
              src={destination.Images }
              className="img-fluid destination-image"
              alt={destination.DestinationName}
            />
            <Card.Body>
              <Card.Title>{destination.DestinationName}</Card.Title>
              <span className="tours">{destination.tour || 'No tours available'}</span>
            </Card.Body>
          </Card>
        </NavLink>
      </div>
    </>
  );
};

export default Cards;
