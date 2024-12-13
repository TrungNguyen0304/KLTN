import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Col, Container, Row } from "react-bootstrap";
import Cards from "../../../components/Cards/Cards";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; 
import { useLocation } from "react-router-dom"; 
import "./Destination.css";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const location = useLocation();
  const initialQuery = location.state?.searchQuery || ""; 

  useEffect(() => {
    document.title = "Destinations";
    window.scroll(0, 0);
    fetchDestinations(initialQuery); 
  }, [initialQuery]);

  const fetchDestinations = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/searchdestination/search?searchQuery=${query || ""}` 
      );
      setDestinations(response.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
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

  return (
    <>
      <Breadcrumbs title="Điếm đến" pagename="Điếm đến" />

      <section className="py-5">
        <Container>
          <div className="search-destination">
            <Col md="6" className="mb-3">
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
          </div>
          <Row>
            {destinations.map((destination, index) => {
              return (
                <Col md="3" sm="6" key={index} className="pb-4">
                  <Cards destination={destination} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Destinations;
