import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { Col, Container, Row } from 'react-bootstrap';
import Cards from '../../../components/Cards/Cards';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    document.title = "Destinations";
    window.scroll(0, 0);
    
    // Fetch destinations data from API
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/destination');
        const data = await response.json();
        setDestinations(data);
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
            {destinations.map((destination) => (
              <Col md="3" sm="6" key={destination._id} className="pb-4">
                <Cards destination={destination} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Destinations;
