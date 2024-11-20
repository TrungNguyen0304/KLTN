import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserAlt, FaTrash } from 'react-icons/fa';
import './Tour.css';
import axios from 'axios';

const IndexTour = () => {
  const [tours, setTours] = useState([]); // State to store tours data

  // Fetch tours data from API
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/tourPackage');
        setTours(response.data); // Set the fetched data to the state
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

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

  return (
    <Container className="ContainerTour">
      <Row className="align-items-center mb-3">
        <Col md={6}>
          <div className="Tour">Tour</div>
        </Col>
        <Col md={6} className="text-end">
          <Link className="btn btn-primary" to="create">Thêm Tour Du lịch</Link>
        </Col>
      </Row>

      <Row className="d-flex">
        {tours.map((tour) => (
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
                <div className="tour-rating mb-2">
                  <span className="tour-rating-text">★ {tour.rating || 0} ({tour.reviews || 0} reviews)</span>
                </div>
                <div className="tour-types mb-2">
                  {tour.types?.map((type, index) => (
                    <Badge key={index} bg={type === "Rail Tour" ? "warning" : "secondary"} className="me-1">
                      {type}
                    </Badge>
                  ))}
                  {tour.tourGuideId && (
                    <div className="tour-guide mt-3">
                    <FaUserAlt className="tour-guide-icon" />
                    <span className="tour-guide-name">
                      Hướng dẫn viên:{" "}
                      <span className="first_name">
                        {`${tour.tourGuideId.first_name || ""} ${
                          tour.tourGuideId.last_name || ""
                        }`}
                      </span>
                    </span>
                  </div>
                  )}
                  {/* Displaying duration as "X days Y nights" */}
                  <div className="tour-duration mt-2">
                  🕒 { (tour.durations && tour.durations[0]?.durationText) || 'N/A' }
                    
                  </div>
                </div>
                <div className="tour-price mb-2">
                  <span className="original-price">{(tour.originalPrice || 0).toLocaleString('vi-VN')}₫</span>
                  <span>{(tour.price || 0).toLocaleString('vi-VN')}₫</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default IndexTour;
