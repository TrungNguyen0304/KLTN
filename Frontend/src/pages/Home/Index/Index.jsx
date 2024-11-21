import React, { useState, useEffect } from "react";
import Banner from "../../../components/Banner/Banner";
import AdvanceSearch from "../../../components/AdvanceSearch/AdvanceSearch";
import Features from "../../../components/Features/Features";
import { Container, Row, Col } from "react-bootstrap";

import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./index.css";

import Gallery from "../../../components/Gallery/Gallery";
import Cards from "../../../components/Cards/Cards";
import PopularCard from "../../../components/Cards/PopularCard";

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [tourPackages, setTourPackages] = useState([]);
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
    const fetchTourPackages = async () => {
      try {
          const response = await axios.get('http://localhost:8001/api/tourPackage'); 
          setTourPackages(response.data); 
      } catch (error) {
          console.error("Error fetching tour packages:", error);
      }
  };

    fetchDestinations();
    fetchTourPackages();
  }, []);

 

  return (
    <>
      <Banner />
      <AdvanceSearch />
      <Features />

      {/* tour seciton start */}

      <section className="tours_section slick_slider">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <h1> Top Destination For Your Next Vacation </h1>
              </div>
            </Col>
          </Row>

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

      {/* tour seciton start */}

      <section className="popular py-5">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <h1> Popular Activities </h1>
              </div>
            </Col>
          </Row>
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

      <section className="call_us">
        <Container>
          <Row className="align-items-center">
            <Col md="8">
              <h5 className="title">CALL TO ACTION</h5>
              <h2 className="heading">
                READY FOR UNFORGATABLE TRAVEL. REMEMBER US!
              </h2>
              <p className="text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s,{" "}
              </p>
            </Col>
            <Col md="4" className="text-center mt-3 mt-md-0">
              <a
                href="tel:0787601735"
                className="secondary_btn bounce"
                rel="no"
              >
                Contact Us !
              </a>
            </Col>
          </Row>
        </Container>
        <div className="overlay"></div>
      </section>

      <section className="gallery">
        <Container>
          <Row>
            <Col md="12">
              <div className="main_heading">
                <h1>Photo Gallery </h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Gallery />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;