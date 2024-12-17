import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaSearch, FaTrash } from "react-icons/fa";
import "./IndexTour.css";
import { useLocation } from "react-router-dom";

const IndexTourGuide = () => {
  const [tourGuides, setTourGuides] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tourGuide = useLocation();

  const initialQuery = tourGuide.state?.searchQuery || "";
  const TourGuidesPerPage = 8;

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/tourGuide/search?searchQuery=${initialQuery}`
        );
        setTourGuides(response.data);
      } catch (error) {
        console.error("Error fetching tourGuides:", error);
      }
    };

    fetchTourGuides();
  }, [initialQuery]);

  const fetchTourGuides = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/tourGuide/search?searchQuery=${query}`
      );
      setTourGuides(response.data);
      setCurrentPage(1); // Reset to the first page on new search
    } catch (error) {
      console.error("Error fetching tourGuides:", error);
    }
  };


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


  // Event handlers
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchTourGuides(searchQuery);
    }
  };

  const handleSearchClick = () => {
    fetchTourGuides(searchQuery);
  };

  // Pagination logic
  const totalPages = Math.ceil(tourGuides.length / TourGuidesPerPage);
  const indexOfLastTourGuide = currentPage * TourGuidesPerPage;
  const indexOfFirstTourGuide = indexOfLastTourGuide - TourGuidesPerPage;
  const currentTourGuides = tourGuides.slice(indexOfFirstTourGuide, indexOfLastTourGuide);

  return (
    <Container className="ContainerTour">
      <Row className="align-items-center mb-3">
        <div className="Destination">Hướng dẫn viên</div>
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
            Thêm người dùng
          </Link>
        </Col>
      </Row>

      <Row className="d-flex">
        {currentTourGuides.map((tourGuide) => (
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
      <div className="pagination">
        {tourGuides.length > TourGuidesPerPage && (
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

export default IndexTourGuide;
