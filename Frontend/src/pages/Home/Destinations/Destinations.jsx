import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Col, Container, Row } from "react-bootstrap";
import Cards from "../../../components/Cards/Cards";
import axios from "axios";
  
const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    document.title = "Destinations";
    window.scroll(0, 0);

    const fetchDestinations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/destination"
        );
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <>
      <Breadcrumbs title="Destinations" pagename="Destinations" />

      <section className="py-5">
        <Container>
        <Row>
            {destinations.map((destination, index) => {
              return (
                <Col md="3" sm="6" key={index} className="pb-4">
                  <Cards destination={destination} key={index} />
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
