import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import './Destination.css'; // Create a separate CSS file for custom styles
import { Link } from 'react-router-dom';

const destinations = [
  { name: "Bali", location: "Indonesia", image: "https://hotelnikkohanoi.com.vn/wp-content/uploads/2023/05/ho-thuy-tien-hue-dia-diem-chup-anh-dep-o-hue.jpg" },
  { name: "Tokyo", location: "Japan", image: "https://static.vinwonders.com/production/check-in-hue-1.jpg" },
  { name: "Bangkok", location: "Thailand", image: "https://baogiaothong.mediacdn.vn/files/thao.nt/2017/03/07/hue-1548.jpg" },
  { name: "Cancun", location: "Mexico", image: "https://file.baothuathienhue.vn/data2/image/fckeditor/upload/2016/20160424/images/hue.jpg" },
  { name: "Huế", location: "Vietnam", image: "https://file.baothuathienhue.vn/data2/image/fckeditor/upload/2016/20160424/images/hue.jpg" },
];

const IndexDestination = () => {
  return (
    <Container className="ContainerDestination">
      <Row className="align-items-center mb-3">
        <Col md={6}>
          <div className='Destination'>Destination</div>
        </Col>
        <Col md={6} className="text-end">
          <div className='createDestination'>
            <Link className="btn btn-primary" to="create">Thêm địa danh</Link>
          </div>
        </Col>
      </Row>
      <Row className="d-flex">
        {destinations.map((destination) => (
          <Col md={3} key={destination.id} className="mb-4">
            <Card className="destination-card">
              <Link to="update">
                <Card.Img src={destination.image} alt={destination.name} className="destination-image" />
                <Card.ImgOverlay className="destination-overlay">
                  <Card.Title className="destination-title">{destination.name}</Card.Title>
                </Card.ImgOverlay>
              </Link>
              <Card.Body className="destination-body">
                <div className="location-container">
                  <p>Location:</p>
                  <Card.Text className="destination-location ms-2">{destination.location}</Card.Text>
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
