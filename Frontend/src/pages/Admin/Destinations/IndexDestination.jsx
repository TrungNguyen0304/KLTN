import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { useLocation } from "react-router-dom";
import axios from 'axios'; // Import axios
import './Destination.css';

const IndexDestination = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const initialQuery = location.state?.searchQuery || "";

  const destinationsPerPage = 8;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/destination/search?searchQuery=${initialQuery}`
        );
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, [initialQuery]);

  const fetchDestinations = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/destination/search?searchQuery=${query || ""}`
      );
      setDestinations(response.data);
      setCurrentPage(1); // Reset to the first page on new search
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8001/api/destination/${id}`);
      if (response.status === 200) {
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchDestinations(searchQuery);
    }
  };

  const handleSearchClick = () => {
    fetchDestinations(searchQuery);
  };

  // Calculate the current page data
  const totalPages = Math.ceil(destinations.length / destinationsPerPage);
  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = destinations.slice(indexOfFirstDestination, indexOfLastDestination);

  return (
    <Container className="ContainerDestination">
      <Row className="align-items-center mb-3">
        <div className="Destination">Destination</div>
        <Col md={6} className="mt-3">
          <div className="input-container position-relative">
            <input
              type="text1"
              className="form-control11 pe-5"
              placeholder="Tìm kiếm điểm đến..."
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
          <div className="createDestination">
            <Link className="btn btn-primary" to="create">Thêm địa danh</Link>
          </div>
        </Col>
      </Row>

      <Row className="d-flex index-destination">
        {currentDestinations.map((destination) => (
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

      <div className="pagination">
        <button
          className="btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Sau
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
          Trước
        </button>
      </div>
    </Container>
  );
};

export default IndexDestination;
