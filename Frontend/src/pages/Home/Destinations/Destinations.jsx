import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Col, Container, Row } from "react-bootstrap";
import PopularCard from "../../../components/Cards/PopularCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Destinations = () => {
  const [tourPackages, setTourPackages] = useState([]);

  useEffect(() => {
    document.title = "Destinations";
    window.scroll(0, 0);

    const fetchTourPackages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8001/api/tourPackage"
        );
        setTourPackages(response.data);
      } catch (error) {
        console.error("Error fetching tour packages:", error);
      }
    };
    fetchTourPackages();
  }, []);

  return (
    <>
      <Breadcrumbs title="Destinations" pagename="Destinations" />

      <section className="py-5">
        <Container>
          <Row>
            {tourPackages.map((val, inx) => {
              return (
                <Col md={3} sm={6} xs={12} className="mb-5" key={inx}>
                    <PopularCard val={val} />
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
