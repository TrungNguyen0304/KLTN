import React from "react";
import "./card.css";
import { Card, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PopularCard = ({ val }) => {
  return (
    <Card className="rounded-2 shadow-sm popular">
      <Card.Img
        variant="top"
        src={val.image || "/default-image.jpg"}
        className="img-fluid destination-image"
        alt={val.title || "Tour image"}
      />
      <Card.Body>
        {/* Location */}
        <Card.Text>
          <i className="bi bi-geo-alt"></i>
          <span className="text">
            {/* Accessing location data */}
            <span>{val.locationId?.firstname || "Unknown Location"}</span>
            <span>/</span>
            <span>
              {val.destinationId?.DestinationName || "Unknown Location"}
            </span>
          </span>
        </Card.Text>

        {/* Tour Title */}
        <Card.Title
          className="text-truncate line-clamp-2"
          style={{ maxWidth: "230px" }}
        >
          <NavLink
            className="body-text text-dark text-decoration-none"
            to={`/tour-details/${val._id}`}
          >
            {val.package_name}
          </NavLink>
        </Card.Title>

        {/* Rating and Reviews */}
        <p className="reviwe">
          <span>
            <i className="bi bi-star-fill me-1"></i>
          </span>
          <span>{val.rating || "N/A"}</span>
          <span>( {val.reviews || 0} reviews )</span>
        </p>
        <span className="tour-guide-name">
          Hướng dẫn viên:{" "}
          <span className="first_name">
            {`${val.tourGuideId.first_name || ""} ${
              val.tourGuideId.last_name || ""
            }`}
          </span>
        </span>

        {/* Categories */}
        {val.category &&
          val.category.map((cat, index) => (
            <span key={index} className={cat.replace(/ .*/, "") + " badge"}>
              {cat}
            </span>
          ))}
      </Card.Body>

      <Card.Footer className="py-4">
        {/* Price & Discount */}
        {val.price ? (
          <p className="text-decoration-line-through">
            ${val.price.toFixed(2)}
          </p>
        ) : null}

        <Stack direction="horizontal" className="justify-content-between mt-3">
          {/* Displaying Price */}
          <p>
            From{" "}
            <b>
              {val.afterDiscount
                ? val.afterDiscount.toFixed(2)
                : val.price.toFixed(2)}
            </b>
          </p>

          {/* Duration of Tour */}
          <p>
            <i className="bi bi-clock"></i>{" "}
            {(val.durations && val.durations[0]?.durationText) || "N/A"}
          </p>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default PopularCard;
