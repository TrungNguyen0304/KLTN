import React, { useEffect, useState } from "react";
import { Accordion, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import "../Tours/tour.css";

const Filters = () => {
  const [locations, setLocations] = useState([]);
  const [destinations, setDestinations] = useState([]);
 
  const [tourType, setTourType] = useState(""); // State to manage the tour type filter (single-day or multi-day)
  const [priceRange, setPriceRange] = useState([1000000, 3000000]); // State for managing the price range filter (with default range 1M - 3M)

  useEffect(() => {
    document.title = "Tour Details";
    window.scroll(0, 0);

    // Fetch location data from API
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/location`);
        setLocations(response.data); // Set locations state with data from API
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    // Fetch destination data from API
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/destination`);
        setDestinations(response.data); // Set destinations state with data from API
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
    fetchLocations();
  }, []); // Runs only once when the component mounts


  // Handle the change for the tour type filter (single-day or multi-day)
  const handleTourTypeChange = (e) => {
    setTourType(e.target.value);
  };

  // Handle the change for the price range slider
  const handlePriceRangeChange = (e) => {
    const newPriceRange = e.target.value.split(",").map(Number);
    setPriceRange(newPriceRange);
  };

  // Ensure priceRange values are valid numbers before using toLocaleString
  const formatPrice = (price) => {
    return price && !isNaN(price) ? price.toLocaleString() : "0";
  };

  return (
    <div className="side_bar">
      <div className="filter_box shadow-sm rounded-2">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Quốc Gia</Accordion.Header>
            <Accordion.Body>
              {locations.map((location, index) => {
                return (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={location.id || location.firstname} // Ensure the key is unique
                    label={location.firstname || location} // Display the location name
                    value={location.firstname || location}
                  />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tỉnh/Thành Phố</Accordion.Header>
            <Accordion.Body>
              {destinations.map((destination, index) => {
                return (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={destination.id || destination.DestinationName} // Ensure the key is unique
                    label={destination.DestinationName || destination} // Display the destination name
                    value={destination.DestinationName || destination}
                  />
                );
              })}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Tour Type Filter */}
        <Accordion defaultActiveKey="2">
          <Accordion.Item eventKey="2">
            <Accordion.Header>Loại Tua</Accordion.Header>
            <Accordion.Body>
              <Form.Check
                type="checkbox"
                id="singleDay"
                label="Tua Trong Ngày"
                value="single-day"
                checked={tourType === "single-day"}
                onChange={handleTourTypeChange}
              />
              <Form.Check
                type="checkbox"
                id="multiDay"
                label="Tua Trọn Gói (Nhiều Ngày)"
                value="multi-day"
                checked={tourType === "multi-day"}
                onChange={handleTourTypeChange}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Price Range Filter using slider */}
        <Accordion defaultActiveKey="3">
          <Accordion.Item eventKey="3">
            <Accordion.Header>Giá Tiền</Accordion.Header>
            <Accordion.Body>
              <InputGroup>
                <Form.Label className="me-2">Giá: {formatPrice(priceRange[0])} VND </Form.Label>
                <Form.Range
                  min="1000000"
                  max="15000000"
                  step="100000"
                  value={priceRange.join(",")}
                  onChange={handlePriceRangeChange}
                />
              </InputGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Filters;
