import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; // Import useSearchParams
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import PopularCard from "../../../components/Cards/PopularCard";
import Filters from "./Filters";
import "../Tours/tour.css";

const Tours = () => {
  const [show, setShow] = useState(false); 
  const [tours, setTours] = useState([]); 
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false); 
  const [searchParams, setSearchParams] = useSearchParams(); 

  const toursPerPage = 9; 
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const fetchTours = async (filterData = {}) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8001/api/filter?${new URLSearchParams(filterData)}`
      );
      const data = await response.json();
      setTours(Array.isArray(data) ? data : []); 
    } catch (error) {
      console.error("Lỗi khi lấy tour:", error);
      setTours([]); 
    } finally {
      setLoading(false);
    }
  };

  
  const handleFilterChange = (filterData) => {
    setFilters(filterData); 
    setSearchParams({ page: 1 }); 
    fetchTours(filterData); 
  };

  useEffect(() => {
    document.title = "Tours";
    window.scroll(0, 0);
    fetchTours(); 
  }, []);

  
  const indexOfLastTour = currentPage * toursPerPage;
  const indexOfFirstTour = indexOfLastTour - toursPerPage;
  const currentTours = tours.slice(indexOfFirstTour, indexOfLastTour);

  
  const totalPages = Math.ceil(tours.length / toursPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page });
      window.scrollTo(0, 0); 
    }
  };

  return (
    <>
      <Breadcrumbs title="Tours" pagename="Tours" />
      <section className="py-5 tour_list">
        <Container>
          <Row>
            {/* Sidebar Filters */}
            <Col xl="3" lg="4" md="12" sm="12">
              <div className="d-lg-none d-block">
                <button className="primaryBtn mb-4" onClick={handleShow}>
                  <i className="bi bi-funnel"></i> Filters
                </button>
              </div>
              <div className="filters d-lg-block d-none">
                <Filters onFilterChange={handleFilterChange} />
              </div>
            </Col>

            {/* Tour Cards */}
            <Col xl="9" lg="8" md="12" sm="12">
              <Row>
                {loading && <p>Loading...</p>}
                {currentTours.length === 0 && !loading && <p>Không tìm thấy tour nào.</p>}
                {currentTours.map((tour, index) => (
                  <Col xl={4} lg={6} md={6} sm={6} className="mb-5" key={index}>
                    <PopularCard val={tour} />
                  </Col>
                ))}
              </Row>
              {/* Pagination */}
              <div className="pagination-container mt-4 d-flex justify-content-center align-items-center">
                <button
                  className={`pagination-btn ${currentPage === 1 ? "disabled" : ""}`}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`pagination-number ${currentPage === index + 1 ? "active" : ""
                      }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  className={`pagination-btn ${currentPage === totalPages ? "disabled" : ""}`}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Offcanvas Filters */}
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Filters onFilterChange={handleFilterChange} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Tours;
