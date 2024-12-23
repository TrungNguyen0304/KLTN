import React, { useEffect, useState } from "react";
import { Accordion, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../Tours/tour.css";

const Filters = ({ onFilterChange }) => {
  const [locations, setLocations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [tourType, setTourType] = useState("");
  const [adultPriceMin, setAdultPriceMin] = useState("");
  const [adultPriceMax, setAdultPriceMax] = useState("");
  const [sortByPrice, setSortByPrice] = useState("asc"); // New state to manage sorting

  useEffect(() => {
    document.title = "Tour Details";
    window.scroll(0, 0);

    // Fetch location data from API
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/location`);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    // Fetch destination data from API
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/destination`);
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
    fetchLocations();
  }, []);

  // Handle location change (toggle selection)
  const handleLocationChange = (e) => {
    const selected = e.target.value;
    setSelectedLocation((prev) => (prev === selected ? "" : selected)); // Toggle selection
  };

  // Handle destination checkbox changes
  const handleDestinationChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDestinations((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Handle tour type change (toggle selection)
  const handleTourTypeChange = (e) => {
    const selected = e.target.value;
    setTourType((prev) => (prev === selected ? "" : selected)); // Toggle selection
  };

  // Format the price to VND with commas
  const formatPrice = (price) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Handle adult price min change
  const handleAdultPriceMinChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setAdultPriceMin(formatPrice(value));
  };

  // Handle adult price max change
  const handleAdultPriceMaxChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setAdultPriceMax(formatPrice(value));
  };

  // Handle sorting order change
  const handleSortByPriceChange = (e) => {
    setSortByPrice(e.target.value); // Toggle between ascending or descending
  };

  // Submit filters to the parent component
  const applyFilters = () => {
    const filterData = {
      locationId: selectedLocation, // Send single location ID
      destinationId: selectedDestinations.join(","), // Join selected destinations
      tourType,
      adultPriceMin: adultPriceMin.replace(/[^0-9]/g, ""), // Send numeric value
      adultPriceMax: adultPriceMax.replace(/[^0-9]/g, ""), // Send numeric value
      sortByPrice, // Include sort option
    };
    onFilterChange(filterData); // Pass data to parent
  };

  return (
    <div className="side_bar">
      <div className="filter_box shadow-sm rounded-2">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Quốc Gia</Accordion.Header>
            <Accordion.Body>
              {locations.map((location, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  id={location.id || location.firstname}
                  label={location.firstname || location}
                  value={location._id} // Use location ID for API
                  checked={selectedLocation === location._id}
                  onChange={handleLocationChange} // Toggle on click
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tỉnh/Thành Phố</Accordion.Header>
            <Accordion.Body>
              {destinations.map((destination, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  id={destination.id || destination.DestinationName}
                  label={destination.DestinationName || destination}
                  value={destination._id}
                  onChange={handleDestinationChange}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Tour Type Filter */}
        {/* Adult Price Range Filter */}
        <Accordion defaultActiveKey="4">
          <Accordion.Item eventKey="4">
            <Accordion.Header>Giá</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Label>Từ giá</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Từ giá"
                      value={adultPriceMin}
                      onChange={handleAdultPriceMinChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Đến giá</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Đến giá"
                      value={adultPriceMax}
                      onChange={handleAdultPriceMaxChange}
                    />
                  </Col>
                </Row>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Sorting Order Filter */}
        <Accordion defaultActiveKey="5">
          <Accordion.Item eventKey="5">
            <Accordion.Header>Sắp Xếp Giá</Accordion.Header>
            <Accordion.Body>
              <Form.Check
                type="radio"
                id="sortAsc"
                label="Giá Tăng Dần"
                value="asc"
                checked={sortByPrice === "asc"}
                onChange={handleSortByPriceChange}
              />
              <Form.Check
                type="radio"
                id="sortDesc"
                label="Giá Giảm Dần"
                value="desc"
                checked={sortByPrice === "desc"}
                onChange={handleSortByPriceChange}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Button variant="primary" className="mt-3 w-100" onClick={applyFilters}>
          Áp Dụng Bộ Lọc
        </Button>
      </div>
    </div>
  );
};

export default Filters;
