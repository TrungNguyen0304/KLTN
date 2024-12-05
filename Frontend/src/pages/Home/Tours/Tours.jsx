import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import PopularCard from "../../../components/Cards/PopularCard";
import Filters from "./Filters";
import "../Tours/tour.css";

const Tours = () => {
  const [show, setShow] = useState(false); // For Offcanvas toggle
  const [tours, setTours] = useState([]); // Store tour data
  const [filters, setFilters] = useState({}); // Store active filter conditions
  const [loading, setLoading] = useState(false); // Loading state for API calls

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetch tours based on filters
  const fetchTours = async (filterData = {}) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8001/api/filter?${new URLSearchParams(filterData)}`
      );
      const data = await response.json();
      setTours(Array.isArray(data) ? data : []); // Ensure tours is always an array
    } catch (error) {
      console.error("Lỗi khi lấy tour:", error);
      setTours([]); // Fallback to empty array if error occurs
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const handleFilterChange = (filterData) => {
    setFilters(filterData); // Update filter state
    fetchTours(filterData); // Fetch filtered data
  };

  useEffect(() => {
    document.title = "Tours";
    window.scroll(0, 0);
    fetchTours(); // Initial fetch without filters
  }, []);

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
                {Array.isArray(tours) && tours.length === 0 && <p>Không tìm thấy tour nào.</p>}
                {Array.isArray(tours) && !loading && tours.map((tour, index) => (
                  <Col xl={4} lg={6} md={6} sm={6} className="mb-5" key={index}>
                    <PopularCard val={tour} />
                  </Col>
                ))}
              </Row>
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
