import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import "./tour.css";
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
  Button,
} from "react-bootstrap";
import axios from "axios";

const TourDetails = () => {
  const { id } = useParams();
  const [tourPackage, setTourPackage] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const pricePerAdult = 5590000;
  const totalPrice = adults * pricePerAdult + 590000;
  useEffect(() => {
    document.title = "Tour Details";
    window.scroll(0, 0);

    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/tourPackage/${id}`
        );
        console.log(tourPackage);

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

            {tourPackage?.image && tourPackage?.groupImages?.length > 0 && (
              <ImageGallery
                items={[
                  // Thêm ảnh mặc định vào trước các ảnh nhóm
                  { original: tourPackage.image, thumbnail: tourPackage.image },
                  ...tourPackage.groupImages.map((img) => ({
                    original: img,
                    thumbnail: img,
                  })),
                ]}
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
                {/*  thông tin tour*/}
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
                        {tourPackage?.highlights?.map((val, index) => (
                          <ListGroup.Item
                            className="border-0 pt-0 body-text"
                            key={index}
                          >
                            {val}
                          </ListGroup.Item>
                        ))}
                      </div>

                      <div className="tour_details">
                        <h5 className="font-bold mb-2 h5 mt-3">
                          Lịch khởi hành
                        </h5>
                        <p className="body-text">
                          {tourPackage?.durations &&
                          Array.isArray(tourPackage.durations) &&
                          tourPackage.durations.length > 0 ? (
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Ngày bắt đầu</th>
                                  <th>Ngày kết thúc</th>
                                  <th>Đặt ngày</th>
                                </tr>
                              </thead>
                              <tbody>
                                {tourPackage.durations.map(
                                  (duration, index) => (
                                    <tr key={index}>
                                      <td>
                                        {new Date(
                                          duration.start_date
                                        ).toLocaleDateString("vi-VN", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </td>
                                      <td>
                                        {new Date(
                                          duration.end_date
                                        ).toLocaleDateString("vi-VN", {
                                          weekday: "long",
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </td>
                                      <td>
                                        <NavLink
                                          to="/booking"
                                          className="primaryBtn w-100 d-flex justify-content-center fw-bold"
                                        >
                                          Đặt ngay
                                        </NavLink>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          ) : (
                            "Không có lịch trình cho tour này."
                          )}
                        </p>
                      </div>
                    </Tab.Pane>

                    {/* Itinerary Tab */}
                    <Tab.Pane eventKey="2">
                      <div className="tour_details">
                        <h1 className="font-bold mb-4 h3 border-bottom pb-3 ">
                          Hành trình
                        </h1>
                        <Accordion defaultActiveKey="0" className="mt-4">
                          {tourPackage?.durations?.map((val, index) => (
                            <Accordion.Item
                              eventKey={String(index)}
                              key={index}
                              className="mb-5 shadow-sm rounded-lg"
                            >
                              <Accordion.Body className="body-text day p-4 bg-light rounded-lg">
                                {Array.isArray(val.itinerary) &&
                                val.itinerary.length > 0 ? (
                                  val.itinerary.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      className="day-item mb-3"
                                    >
                                      <Accordion defaultActiveKey={null}>
                                        <Accordion.Item
                                          eventKey={String(itemIndex)}
                                        >
                                          <Accordion.Header className="d-flex align-items-center justify-content-between text-white rounded">
                                            <h5 className="mb-0">{item.day}</h5>
                                          </Accordion.Header>
                                          <Accordion.Body className="p-3">
                                            <p>
                                              {item.activity ||
                                                "No activity for this day."}
                                            </p>
                                          </Accordion.Body>
                                        </Accordion.Item>
                                      </Accordion>
                                    </div>
                                  ))
                                ) : (
                                  <p>Không có hành trình nào có sẵn.</p>
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

                        {/* Kiểm tra xem có trường incAndExc không */}
                        {tourPackage?.incAndExc ? (
                          <div>
                            {/* Tách các phần Bao Gồm và Loại Trừ */}
                            {(() => {
                              const inclusionSection = tourPackage?.incAndExc
                                .match(/BAO GỒM:(.*?)(LOẠI TRỪ:|$)/s)?.[1]
                                ?.trim();

                              const exclusionSection = tourPackage?.incAndExc
                                .match(/LOẠI TRỪ:(.*?)(BAO GỒM:|$)/s)?.[1]
                                ?.trim();

                              return (
                                <>
                                  {/* Inclusions */}
                                  <div>
                                    <h4 className="font-bold">Bao gồm</h4>
                                    {inclusionSection ? (
                                      inclusionSection
                                        .split("\n")
                                        .map((line, index) => (
                                          <ListGroup.Item
                                            className="border-0 pt-0 body-text d-flex align-items-center"
                                            key={`inclusion-${index}`}
                                          >
                                            <i className="bi me-2 text-success h4 m-0"></i>
                                            {line.trim()}
                                          </ListGroup.Item>
                                        ))
                                    ) : (
                                      <p>Không có nội dung nào được bao gồm</p>
                                    )}
                                  </div>

                                  {/* Exclusions */}
                                  <div>
                                    <h4 className="font-bold">Loại trừ</h4>
                                    {exclusionSection ? (
                                      exclusionSection
                                        .split("\n")
                                        .map((line, index) => (
                                          <ListGroup.Item
                                            className="border-0 pt-0 body-text d-flex align-items-center"
                                            key={`exclusion-${index}`}
                                          >
                                            <i className="bi me-2 text-danger h4 m-0"></i>
                                            {line.trim()}
                                          </ListGroup.Item>
                                        ))
                                    ) : (
                                      <p>Không có nội dung nào bị loại trừ</p>
                                    )}
                                  </div>
                                </>
                              );
                            })()}
                          </div>
                        ) : (
                          <p>Không có thông tin Bao gồm và Loại trừ</p>
                        )}
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>

                {/* Price & Booking Info */}
                <Col md={4}>
                  <aside>
                    {/* Card for pricing and participants */}
                    <Card
                      className="price-card shadow-lg p-4 mb-4"
                      style={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                      }}
                    >
                      <h1
                        className="text-center text-primary mb-4"
                        style={{ fontSize: "1.8rem", fontWeight: "bold" }}
                      >
                        Lịch Trình và Giá Tour
                      </h1>
                      <Card.Body>
                        {/* Date Selection */}
                        <div className="mb-4">
                          <div>
                            <label
                              htmlFor="tourDuration"
                              style={{ fontSize: "1rem", fontWeight: "600" }}
                            >
                              Chọn Lịch Trình và Xem Giá:
                            </label>
                            <select
                              id="tourDuration"
                              className="form-select mt-2"
                              style={{
                                fontSize: "1rem",
                                borderRadius: "8px",
                                padding: "10px",
                              }}
                            >
                              {tourPackage.durations.map((duration, index) => (
                                <option key={index} value={index}>
                                  {`${new Date(
                                    duration.start_date
                                  ).toLocaleDateString("vi-VN", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })} `}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {/* Participant Types */}
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-muted">
                              Người lớn (>10 tuổi):
                              <h1 className="font-bold mb-0 h2">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(tourPackage.adult_price)}
                              </h1>
                            </span>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                onClick={() =>
                                  setAdults(Math.max(adults - 1, 1))
                                }
                              >
                                -
                              </Button>
                              <span className="mx-2">{adults}</span>
                              <Button
                                variant="outline-secondary"
                                onClick={() => setAdults(adults + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-muted">
                              Trẻ em (2–10 tuổi):
                              <h1 className="font-bold mb-0 h2">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(tourPackage.pricechildren_price)}
                              </h1>
                            </span>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                onClick={() =>
                                  setChildren(Math.max(children - 1, 0))
                                }
                              >
                                -
                              </Button>
                              <span className="mx-2">{children}</span>
                              <Button
                                variant="outline-secondary"
                                onClick={() => setChildren(children + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                        {/* Total Price */}
                        <div className="mt-4 text-center">
                          <h5
                            className="text-muted mb-2"
                            style={{ fontSize: "1rem" }}
                          >
                            Giá gốc
                          </h5>
                          <h1
                            className="text-primary mb-3"
                            style={{ fontSize: "2rem", fontWeight: "bold" }}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              tourPackage.adult_price * adults +
                                tourPackage.pricechildren_price * children
                            )}
                          </h1>
                        </div>

                        {/* Booking Button */}
                        <Button
                          className="w-100 fw-bold mt-4 mau"
                          style={{
                            fontSize: "1.1rem",
                            padding: "10px",
                          }}
                        >
                          Yêu cầu đặt
                        </Button>
                      </Card.Body>
                    </Card>

                    {/* Card for support */}
                    <Card
                      className="support-card shadow-lg p-4 rounded-4"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        border: "1px solid #e1e4e8",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Card.Body>
                        <h3
                          className="text-primary text-center mb-4"
                          style={{
                            fontSize: "1.4rem",
                            fontWeight: "600",
                            color: "#007bff",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Cần trợ giúp?
                        </h3>
                        <ListGroup className="list-group-flush">
                          <ListGroup.Item
                            className="border-0 d-flex align-items-center py-3"
                            style={{
                              fontSize: "1rem",
                              color: "#495057",
                            }}
                          >
                            <i
                              className="bi bi-telephone me-3"
                              style={{
                                color: "#007bff",
                                fontSize: "1.5rem",
                                transition: "transform 0.3s ease",
                              }}
                            ></i>
                            Gọi cho chúng tôi:{" "}
                            <strong style={{ color: "#495057" }}>
                              +84 19001514
                            </strong>
                          </ListGroup.Item>
                          <ListGroup.Item
                            className="border-0 d-flex align-items-center py-3"
                            style={{
                              fontSize: "1rem",
                              color: "#495057",
                            }}
                          >
                            <i
                              className="bi bi-envelope me-3"
                              style={{
                                color: "#007bff",
                                fontSize: "1.5rem",
                                transition: "transform 0.3s ease",
                              }}
                            ></i>
                            email:{" "}
                            <strong style={{ color: "#495057" }}>
                              support@tourcompany.com
                            </strong>
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
