import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUserAlt } from 'react-icons/fa'; // Import icons
import './Tour.css';

const IndexTour = () => {
  const tours = [
    {
      id: 1,
      title: "Discover Singapore",
      location: "Huế",
      destination: "Đại Nội",
    
      rating: 3,
      reviews: 5,
      originalPrice: 100,
      discountedPrice: 92,
      duration: "5 days - 4 nights",
      types: [""],
      guideName: "Nguyễn Văn A",  // Add guide's name
      imageUrl: "https://huesmiletravel.com.vn/images/dai_noi_ve_dem.jpg", // Replace with your image URL
    },
    // Add more tour objects as needed
  ];

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
          <Col md={4} key={tour.id} className="mb-4">
            <Card className="tour-card">
              <Card.Img variant="top" src={tour.imageUrl} className="tour-image" />
              <Card.Body>
                <div className="tour-location mb-2">
                  <FaMapMarkerAlt className="tour-location-icon" />
                  <small className="text-muted">{tour.location}</small>
                  <span className="tour-separator">|</span> 
                  <small className="text-muted ms-2">{tour.destination}</small>
                </div>
                
                <Card.Title className="tour-title">{tour.title}</Card.Title>
                <div className="tour-rating mb-2">
                  <span className="tour-rating-text">★ {tour.rating} ({tour.reviews} reviews)</span>
                </div>
                <div className="tour-types mb-2">
                  {tour.types.map((type, index) => (
                    <Badge key={index} bg={type === "Rail Tour" ? "warning" : "secondary"} className="me-1">
                      {type}
                    </Badge>
                  ))}
                       {tour.guideName && (
                  <div className="tour-guide mt-3">
                    <FaUserAlt className="tour-guide-icon" />
                    <span className="tour-guide-name">{tour.guideName}</span>
                  </div>
                )}
                </div>
                <div className="tour-price mb-2">
                  <span style={{ textDecoration: 'line-through', color: '#777' }}>${tour.originalPrice}</span>
                  <span className="text-primary ms-2" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    From ${tour.discountedPrice}
                  </span>
                </div>
                 {/* Displaying the tour guide's name */}
            
                <div className="tour-duration mt-2">
                  🕒 {tour.duration}
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
