import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./IndexTour.css";

const IndexTourGuide = () => {
  const [tourGuides, setTourGuides] = useState([]);

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/tourGuide/getAll"
        );
        setTourGuides(response.data);
      } catch (error) {
        console.error("Error fetching tour guides:", error);
      }
    };

    fetchTourGuides();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/tourGuide/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setTourGuides(tourGuides.filter((tourGuide) => tourGuide._id !== id));
        alert("Đã xóa thành công hướng dẫn viên!");
      } else {
        alert("Không thể xóa hướng dẫn viên. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa hướng dẫn viên:", error);
      alert("Lỗi khi xóa hướng dẫn viên.");
    }
  };
  return (
    <Container className="ContainerTour">
      <Row className="align-items-center mb-3">
        <Col md={6}>
          <div className="Tour">Hướng dẫn viên du lịch</div>
        </Col>
        <Col md={6} className="text-end">
          <Link className="btn btn-primary" to="create">
            Thêm Hướng dẫn viên
          </Link>
        </Col>
      </Row>

      <Row className="d-flex">
        {tourGuides.map((tourGuide) => (
          <Col md={3} key={tourGuide._id} className="mb-4">
            <Card className="tour-card">
              <div
                className="delete-icon"
                onClick={() => handleDelete(tourGuide._id)}
              >
                <FaTrash />
              </div>
              <Link to={`update/${tourGuide._id}`}>
                <Card.Img
                  variant="top"
                  src={tourGuide.images}
                  className="tour-image"
                />
              </Link>

              <Card.Body>
                <Card.Title className="tour-title">
                  {tourGuide.first_name} {tourGuide.last_name}
                </Card.Title>

                <div className="tour-phone mb-2">
                  <strong>Phone:</strong> {tourGuide.phone_number}
                </div>
                <div className="tour-email mb-2">
                  <strong>Email:</strong> {tourGuide.email}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default IndexTourGuide;
