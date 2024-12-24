import React from "react";
import "./card.css";
import { Card, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const PopularCard = ({ val }) => {
  // Hàm an toàn để định dạng số hoặc trả về "N/A"
  const formatPrice = (price) => {
    if (typeof price === "number") {
      // Format price as VND (Vietnamese Đồng)
      return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }
    return "N/A";
  };

  // Hàm lưu tour đã xem vào localStorage
  const handleViewTour = (tour) => {
    const recentTours = JSON.parse(localStorage.getItem("recentTours")) || [];

    // Kiểm tra xem tour đã tồn tại trong danh sách chưa
    const isTourAlreadyViewed = recentTours.some((existingTour) => existingTour._id === tour._id);

    // Nếu chưa, thêm tour vào danh sách
    if (!isTourAlreadyViewed) {
      recentTours.push(tour);

      // Giới hạn số lượng tour lưu trữ (tối đa 5 tour đã xem)
      if (recentTours.length > 5) {
        recentTours.shift();  // Xóa tour cũ nhất nếu danh sách đã đầy
      }

      // Lưu lại vào localStorage
      localStorage.setItem("recentTours", JSON.stringify(recentTours));
    }
  };

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
            <span>{val.locationId?.firstname || "Unknown Location"}</span>
            <span>/</span>
            <span>{val.destinationId?.DestinationName || "Unknown Location"}</span>
          </span>
        </Card.Text>

        {/* Tour Title */}
        <Card.Title
          className="text-truncate line-clamp-2"
        
        >
          <NavLink
            className="body-text text-dark text-decoration-none"
            to={`/tour-details/${val._id}`}
            onClick={() => handleViewTour(val)}
          >
            {val.package_name || "Unnamed Package"}
          </NavLink>
        </Card.Title>

        {/* Rating and Reviews */}
        {val.averageRating ? (
          <p className="reviwe">
            <span>
              <i className="bi bi-star-fill me-1"></i>
            </span>
            <span>{val.averageRating || "N/A"}</span>
            <span>( {val.totalReviews || 0} đánh giá )</span>
          </p>
        ) : (
          <>
          <br></br>
            <br></br>
          </>
        )}
        <span className="tour-guide-name">
          Hướng dẫn viên:{" "}
          <span className="first_name">
            {`${val.userGuideId?.firstname || ""} ${val.userGuideId?.lastname || ""}`}
          </span>
        </span>

        {/* Categories */}
        {val.category &&
          val.category.map((cat, index) => (
            <span key={index} className={cat.replace(/ .*/, "") + " badge"}>
              {cat}
            </span>
          ))}
        {/* Duration of Tour */}
        <p className="mb-2 mt-2">
          <i className="bi bi-clock"></i>{" "}
          {(val.durations && val.durations[0]?.durationText) || "N/A"}
        </p>
      </Card.Body>

      <Card.Footer className="">
        {/* Stack to rearrange Duration and Price */}
        <Stack direction="vertical" className="mt-3">


          {/* Displaying Price aligned to the right */}
          <p className="text-end">

            <b>
              {val.afterDiscount
                ? formatPrice(val.afterDiscount)
                : formatPrice(val.adult_price)}
            </b>
          </p>
        </Stack>
      </Card.Footer>
    </Card>
  );
};

export default PopularCard;
