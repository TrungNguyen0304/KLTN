import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import "../Tours/tour.css";
import { NavLink, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import {
  Container,
  Row,
  Nav,
  Col,
  Tab,
  ListGroup,
  Accordion,
  Card,
  Stack,
} from "react-bootstrap";
import axios from "axios";

const TourDetails = () => {
  const { id } = useParams();
  const [tourPackage, setTourPackage] = useState(null);

  useEffect(() => {
    document.title = "Tour Details";
    window.scroll(0, 0);

    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/tourPackage/${id}`
        );
        setTourPackage(response.data);
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    fetchTourDetails();
  }, [id]);

  if (!tourPackage) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Breadcrumbs
        title={tourPackage.package_name}
        pagename={<NavLink to="/tours">Tours</NavLink>}
        childpagename={tourPackage.package_name}
      />
      <section className="tour_details py-5">
        <Container>
          <Row>
            <h1 className="fs-2 font-bold mb-4">{tourPackage.package_name}</h1>

            {tourPackage?.groupImages?.length > 0 && (
              <ImageGallery
                items={tourPackage.groupImages.map((img) => ({
                  original: img,
                  thumbnail: img,
                }))}
                showNav={false}
                showBullets={false}
                showPlayButton={false}
                renderItem={(item) => (
                  <div className="image-gallery-item">
                    <img
                      src={item.original}
                      alt=""
                      className="img-fluid rounded-3 gallery-image"
                    />
                  </div>
                )}
              />
            )}

            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
              <Row className="py-5">
                <Col md={8} className="mb-3 mb-md-0">
                  <Col md={12}>
                    <Nav
                      variant="pills"
                      className="flex-row nav_bars rounded-2"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="1">Tổng quan</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2">Hành trình</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="3">Bao gồm & Loại trừ</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="4">Vị trí</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Tab.Content className="mt-4">
                    {/* Overview Tab */}
                    <Tab.Pane eventKey="1">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Tổng quan
                        </h1>
                        <p className="body-text">{tourPackage.description}</p>

                        <h5 className="font-bold mb-2 h5 mt-3">
                          Thông tin tour du lịch
                        </h5>
                        <ListGroup>
                          {/* Check if durations is an array and has items */}
                          {tourPackage?.durations &&
                          Array.isArray(tourPackage.durations) &&
                          tourPackage.durations.length > 0 ? (
                            tourPackage.durations.map((duration, index) => (
                              <div key={index} className="itinerary-item">
                                <h4>Lịch trình cho ngày:</h4>
                                {duration.itinerary &&
                                Array.isArray(duration.itinerary) &&
                                duration.itinerary.length > 0 ? (
                                  duration.itinerary.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                      {/* Convert item.day and item.activity to strings if needed */}
                                      <h5>{String(item.day)}</h5>
                                      <p>
                                        {String(item.activity) ||
                                          "Không có hoạt động cho ngày này."}
                                      </p>
                                    </div>
                                  ))
                                ) : (
                                  <p>Không có lịch trình cho ngày này.</p>
                                )}
                              </div>
                            ))
                          ) : (
                            <p>Không có lịch trình cho tour này.</p>
                          )}
                        </ListGroup>

                        <h5 className="font-bold mb-2 h5 mt-3">
                          Điểm nổi bật của Tour
                        </h5>
                        {tourPackage?.highlights?.map((val, index) => (
                          <ListGroup.Item
                            className="border-0 pt-0 body-text"
                            key={index}
                          >
                            {val}
                          </ListGroup.Item>
                        ))}
                      </div>
                    </Tab.Pane>

                    {/* Itinerary Tab */}
                    <Tab.Pane eventKey="2">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Hành trình
                        </h1>
                        <Accordion defaultActiveKey="0" className="mt-4">
                          {tourPackage?.durations?.map((val, index) => (
                            <Accordion.Item
                              eventKey={index}
                              key={index}
                              className="mb-4"
                            >
                              <Accordion.Header>
                                <h1
                                  dangerouslySetInnerHTML={{
                                    __html: val.title,
                                  }}
                                ></h1>
                              </Accordion.Header>
                              <Accordion.Body className="body-text">
                                {Array.isArray(val.itinerary) ? (
                                  val.itinerary.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                      <h5>{String(item.day)}</h5>
                                      <p>
                                        {String(item.activity) ||
                                          "No activity for this day."}
                                      </p>
                                    </div>
                                  ))
                                ) : (
                                  <p>
                                    {val.itinerary || "No itinerary available."}
                                  </p>
                                )}
                              </Accordion.Body>
                            </Accordion.Item>
                          ))}
                        </Accordion>
                      </div>
                    </Tab.Pane>

                    {/* Inclusions & Exclusions Tab */}
                    <Tab.Pane eventKey="3">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Bao gồm và loại trừ
                        </h1>

                        {/* Extract Inclusions and Exclusions */}
                        {(() => {
                          const inclusionSection = tourPackage?.incAndExc
                            ?.match(/BAO GỒM:(.*?)(LOẠI TRỪ:|$)/s)?.[1]
                            ?.trim();
                          const exclusionSection = tourPackage?.incAndExc
                            ?.match(/LOẠI TRỪ:(.*)/s)?.[1]
                            ?.trim();

                          return (
                            <>
                              {/* Inclusions */}
                              <h5 className="font-bold mb-3 h5 mt-3">
                                Bao gồm
                              </h5>
                              {inclusionSection ? (
                                inclusionSection
                                  .split("\n")
                                  .map((line, index) => (
                                    <ListGroup.Item
                                      className="border-0 pt-0 body-text d-flex align-items-center"
                                      key={index}
                                    >
                                      <i className="bi  me-2 text-success h4 m-0"></i>
                                      {line.trim()}
                                    </ListGroup.Item>
                                  ))
                              ) : (
                                <p>No inclusions available</p>
                              )}

                              {/* Exclusions */}
                              <h5 className="font-bold mb-3 h5 mt-3">
                                Loại trừ
                              </h5>
                              {exclusionSection ? (
                                exclusionSection
                                  .split("\n")
                                  .map((line, index) => (
                                    <ListGroup.Item
                                      className="border-0 pt-0 body-text d-flex align-items-center"
                                      key={index}
                                    >
                                      <i className="bi bi-x-lg me-2 text-danger h5 m-0"></i>
                                      {line.trim()}
                                    </ListGroup.Item>
                                  ))
                              ) : (
                                <p>No exclusions available</p>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </Tab.Pane>

                    {/* Location Tab */}
                    <Tab.Pane eventKey="4">
                      <div className="tour_details">
                        <h1 className="font-bold mb-4 h3 border-bottom pb-2">
                          Vị trí
                        </h1>
                        <iframe
                          src={`https://www.google.com/maps/embed/v1/place?q=${tourPackage?.locationId?.firstname}`}
                          title="Location of the tour"
                          width="100%"
                          height="400px"
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>

                {/* Price & Booking Info */}
                <Col md={4}>
                  <aside>
                    <Card className="rounded-3 p-2 shadow-sm mb-4 price-info">
                      <Card.Body>
                        <Stack gap={2} direction="horizontal">
                          <h1 className="font-bold mb-0 h2">
                            ${tourPackage.price}
                          </h1>
                          <span className="fs-4">/người</span>
                        </Stack>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <ListGroup horizontal>
                            <ListGroup.Item className="border-0 me-2 fw-bold">
                              {tourPackage.rating}
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-half"></i>
                            </ListGroup.Item>
                          </ListGroup>
                          <h5 className="h6"> {tourPackage.reviews}</h5>
                        </div>

                        <NavLink
                          to="/booking"
                          className="primaryBtn w-100 d-flex justify-content-center fw-bold"
                        >
                          Đặt ngay
                        </NavLink>
                      </Card.Body>
                    </Card>

                    <Card className="card-info p-2 shadow-sm">
                      <Card.Body>
                        <h1 className="font-bold mb-2 h3">Cần trợ giúp?</h1>
                        <ListGroup>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-telephone me-1"></i> Gọi cho
                            chúng tôi <strong>+84 19001514</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                            <i className="bi bi-envelope me-1"></i> Gửi email
                            cho chúng tôi tại{" "}
                            <strong>support@tourcompany.com</strong>
                          </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </aside>
                </Col>
              </Row>
            </Tab.Container>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
