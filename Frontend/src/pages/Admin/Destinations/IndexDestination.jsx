import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './Destination.css';

const IndexDestination = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch("http://localhost:8001/api/destination");
        const data = await response.json();
        setDestinations(data);
      } catch (error) {
        console.error("Lỗi khi lấy địa danh:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8001/api/destination/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDestinations(destinations.filter(destination => destination._id !== id));
        alert("Địa danh đã được xóa thành công!");
      } else {
        alert("Không thể xóa địa danh. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa địa danh:", error);
      alert("Lỗi khi xóa địa danh.");
    }
  };

  return (
    <Container className="ContainerDestination">
      <Row className="align-items-center mb-3">
        <Col md={6}>
          <div className="Destination">Destination</div>
        </Col>
        <Col md={6} className="text-end">
          <div className="createDestination">
            <Link className="btn btn-primary" to="create">Thêm địa danh</Link>
          </div>
        </Col>
      </Row>

      <Row className="d-flex">
        {destinations.map((destination) => (
          <Col md={3} key={destination._id} className="mb-4">
            <Card className="destination-card">
              <div className="delete-icon" onClick={() => handleDelete(destination._id)}>
                <FaTrash />
              </div>
              <Link to={`update/${destination._id}`}>
                <Card.Img src={destination.Images} alt={destination.DestinationName} className="destination-image" />
                <Card.ImgOverlay className="destination-overlay">
                  <Card.Title className="destination-title">{destination.DestinationName}</Card.Title>
                </Card.ImgOverlay>
              </Link>
              <Card.Body className="destination-body">
                <div className="location-container">
                  <p>Location:</p>
                  <Card.Text className="destination-location ms-2">
                    {destination.locationId ? destination.locationId.firstname : "Unknown"}
                  </Card.Text>
                </div>
                <div className="tour-count-container">
                  <p>Tours:</p>
                  <Card.Text className="tour-count ms-2">
                    {destination.tourCount || 0} tours
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default IndexDestination;
