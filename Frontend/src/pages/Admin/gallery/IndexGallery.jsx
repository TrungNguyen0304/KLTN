import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import './Gallery.css';

const IndexGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const galleriesPerPage = 8;

  // Fetch all gallery data from the API
  const fetchGalleries = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/gallery');
      setGalleries(response.data.galleries); // Make sure the response matches the structure
      setCurrentPage(1); // Reset to the first page on new fetch
    } catch (error) {
      console.error("Error fetching galleries:", error);
    }
  };

  useEffect(() => {
    fetchGalleries(); // Fetch gallery data when the component mounts
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(galleries.length / galleriesPerPage);
  const indexOfLastGallery = currentPage * galleriesPerPage;
  const indexOfFirstGallery = indexOfLastGallery - galleriesPerPage;
  const currentGalleries = galleries.slice(indexOfFirstGallery, indexOfLastGallery);

  // Delete handler
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8001/api/gallery/delete/${id}`);
      if (response.status === 200) {
        alert('Xóa ảnh thảnh công ');
        fetchGalleries(); // Re-fetch galleries after deletion to update the list
      }
    } catch (error) {
      console.error("Error deleting gallery:", error);
      alert("Error deleting gallery");
    }
  };

  return (
    <Container className="ContainerDestination">
      <Row className="align-items-center mb-3">
        <div className="Destination">Gallery</div>
        <Col md={12} className="text-end">
          <div className="createGallery">
            <Link className="btn btn-primary" to="create">Thêm thư viện ảnh</Link>
          </div>
        </Col>
      </Row>

      <Row className="d-flex index-destination">
        {currentGalleries.map((gallery) => (
          <Col md={3} key={gallery._id} className="mb-4">
            <Card className="destination-card">
              <div className="delete-icon" onClick={() => handleDelete(gallery._id)}>
                <FaTrash />
              </div>
              {/* Display only the first image in the gallery */}
           <Card.Img src={gallery.Images}  className="destination-image" />
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
      </div>
    </Container>
  );
};

export default IndexGallery;
