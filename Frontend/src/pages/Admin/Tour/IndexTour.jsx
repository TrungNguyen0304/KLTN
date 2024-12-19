import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserAlt, FaTrash, FaSearch } from 'react-icons/fa';
import './Tour.css';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const IndexTour = () => {
  const [tours, setTours] = useState([]); // State to store tours data
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tour = useLocation();
  const initialQuery = tour.state?.searchQuery || "";

  const toursPerPage = 8;


  // Fetch tours data from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/tourPackage/search?searchQuery=${initialQuery}`
        );
        setTours(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchTours();
  }, [initialQuery]);

  const fetchTours = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/tourPackage/search?searchQuery=${query || ""}`
      );
      setTours(response.data);
      setCurrentPage(1); // Reset to the first page on new search
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  // Delete tour function
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8001/api/tourPackage/delete/${id}`);
      if (response.status === 200) {
        // Filter out the deleted tour from the tours state
        setTours(tours.filter((tour) => tour._id !== id));
        alert('Tour đã được xóa thành công');
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
      alert('Có lỗi xảy ra khi xóa tour');
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchTours(searchQuery);
    }
  };

  const handleSearchClick = () => {
    fetchTours(searchQuery);
  };

  const totalPages = Math.ceil(tours.length / toursPerPage);
  const indexOfLasttour = currentPage * toursPerPage;
  const indexOfFirsttour = indexOfLasttour - toursPerPage;
  const currenttours = tours.slice(indexOfFirsttour, indexOfLasttour);

  return (
    <Container className="ContainerTour">
      <Row className="align-items-center mb-3">
        <div className="Destination">Tour du lịch</div>
        <Col md={6} className="mt-3">
          <div className="input-container position-relative">
            <input
              type="text1"
              className="form-control11"
              placeholder="Tìm kiếm người dùng..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyPress}
            />
            <FaSearch
              className="search-icon position-absolute top-50 end-0 translate-middle-y me-3"
              onClick={handleSearchClick}
            />
          </div>
        </Col>
        <Col md={6} className="text-end">
          <Link className="btn btn-primary" to="create">
            Thêm quốc gia
          </Link>
        </Col>
      </Row>

      <Row className="d-flex">
        {currenttours.map((tour) => (
          <Col md={4} key={tour._id} className="mb-4">
            <Card className="tour-card">
              <div className="delete-icon" onClick={() => handleDelete(tour._id)}>
                <FaTrash />
              </div>

              {/* Wrap the image with a Link to navigate to the edit page */}
              <Link to={`update/${tour._id}`} className="tour-image-container position-relative">
                <Card.Img variant="top" src={tour.image} className="tour-image" />
              </Link>

              <Card.Body>
                <div className="tour-location mb-2">
                  <FaMapMarkerAlt className="tour-location-icon" />
                  <small className="text-muted">{tour.locationId?.firstname}</small>
                  <span className="tour-separator">|</span>
                  <small className="text-muted ms-2">{tour.destinationId?.DestinationName}</small>
                </div>

                <Card.Title className="tour-title">{tour.package_name}</Card.Title>

                <div className="tour-types mb-2">
                  {tour.types?.map((type, index) => (
                    <Badge key={index} bg={type === "Rail Tour" ? "warning" : "secondary"} className="me-1">
                      {type}
                    </Badge>
                  ))}
                  {tour.userGuideId && (
                    <div className="tour-guide mt-3">
                      <FaUserAlt className="tour-guide-icon" />
                      <span className="tour-guide-name">
                        Hướng dẫn viên:{" "}
                        <span className="first_name">
                          {`${tour.userGuideId.firstname || ""} ${tour.userGuideId.lastname || ""
                            }`}
                        </span>
                      </span>
                    </div>
                  )}
                  {/* Displaying duration as "X days Y nights" */}
                  <div className="tour-duration mt-2">
                    🕒 {(tour.durations && tour.durations[0]?.durationText) || 'N/A'}

                  </div>
                </div>
                <div className="tour-price mb-2">
                  <span className="original-price"></span>
                  <span>{(tour.adult_price || 0).toLocaleString('vi-VN')}₫</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pagination">
        {tours.length > toursPerPage && (
          <>
            <button
              className="btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Trước
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`btn ${page === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Sau
            </button>
          </>
        )}
      </div>
    </Container>
  );
};

export default IndexTour;
