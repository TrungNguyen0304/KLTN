import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import axios from "axios";
import { Card, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const DestinationDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  // Hàm fetch data từ API
  const fetchDestinationDetails = async (destinationId) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/destination/${destinationId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching destination details:", error);
      return null;
    }
  };

  // Tính toán số ngày giữa start_date và end_date
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Chuyển đổi thành số ngày
    const nights = diffDays - 1; // Số đêm sẽ ít hơn số ngày đúng 1
    return `${diffDays} ngày ${nights > 0 ? nights + " đêm" : ""}`;
  };
  

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchDestinationDetails(id);
      setDestination(data);
    };
    fetchDetails();
  }, [id]);

  if (!destination) return <p>Loading...</p>;

  return (
    <>
      <Breadcrumbs title="Destinations" pagename="DestinationDetails" />

      <div className="py-5">
        <Container>
          {destination.tourPackages && destination.tourPackages.length > 0 ? (
            <Row>
              {destination.tourPackages.map((val, idx) => (
                <Col md={4} key={idx}>
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
                          <span>
                            {destination.locationId?.firstname ||
                              "Unknown Location"}
                          </span>
                          <span>/</span>
                          <span>
                            {destination.DestinationName ||
                              "Unknown Location"}
                          </span>
                        </span>
                      </Card.Text>

                      {/* Tour Title */}
                      <Card.Title
                        className="text-truncate"
                        style={{ maxWidth: "270px" }}
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
                          {`${val.tourGuideId?.first_name || ""} ${
                            val.tourGuideId?.last_name || ""
                          }`}
                        </span>
                      </span>

                      {/* Categories */}
                      {val.category &&
                        val.category.map((cat, index) => (
                          <span
                            key={index}
                            className={cat.replace(/ .*/, "") + " badge"}
                          >
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

                      <Stack
                        direction="horizontal"
                        className="justify-content-between mt-3"
                      >
                        {/* Displaying Price */}
                        <p>
                          From{" "}
                          <b>
                            {val.afterDiscount
                              ? val.afterDiscount.toFixed(2)
                              : val.price?.toFixed(2)}
                          </b>
                        </p>

                        {/* Duration of Tour */}
                        <p>
                          <i className="bi bi-clock"></i>{" "}
                          {val.durations && val.durations[0]
                            ? calculateDuration(
                                val.durations[0].start_date,
                                val.durations[0].end_date
                              )
                            : "N/A"}
                        </p>
                      </Stack>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>Không tìm thấy tour nào.</p>
          )}
        </Container>
      </div>
    </>
  );
};

export default DestinationDetails;
