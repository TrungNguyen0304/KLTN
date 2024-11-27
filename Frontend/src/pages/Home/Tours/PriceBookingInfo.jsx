// src/components/PriceBookingInfo/PriceBookingInfo.js
import React from 'react';
import { Button, Card, Col, ListGroup } from 'react-bootstrap';

const PriceBookingInfo = ({
    tourPackage,
    adults,
    setAdults,
    children,
    setChildren,
    totalPrice
}) => {
    return (
        <Col md={4}>
            <aside>

                {/* Card for pricing and participants */}
                <Card
                    className="price-card shadow-lg p-4 mb-4"
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                    }}
                >
                    <h1 className="text-center text-primary mb-4" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                        Lịch Trình và Giá Tour
                    </h1>
                    <Card.Body>
                        {/* Date Selection */}
                        <div className="mb-4">
                            <div>
                                <label htmlFor="tourDuration" style={{ fontSize: '1rem', fontWeight: '600' }}>
                                    Chọn Lịch Trình và Xem Giá:
                                </label>
                                <select
                                    id="tourDuration"
                                    className="form-select mt-2"
                                    style={{
                                        fontSize: '1rem',
                                        borderRadius: '8px',
                                        padding: '10px',
                                    }}
                                >
                                    {tourPackage.durations.map((duration, index) => (
                                        <option key={index} value={index}>
                                            {`${new Date(duration.start_date).toLocaleDateString("vi-VN", {
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
                                <span className="fw-bold text-muted">Người lớn (>10 tuổi):
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
                                        onClick={() => setAdults(Math.max(adults - 1, 1))}
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
                                <span className="fw-bold text-muted">Trẻ em (2–10 tuổi):
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
                                        onClick={() => setChildren(Math.max(children - 1, 0))}
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
                            <h5 className="text-muted mb-2" style={{ fontSize: '1rem' }}>
                                Giá gốc
                            </h5>
                            <h1
                                className="text-primary mb-3"
                                style={{ fontSize: '2rem', fontWeight: 'bold' }}
                            >
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(tourPackage.adult_price * adults + tourPackage.pricechildren_price * children)}
                            </h1>
                        </div>

                        {/* Booking Button */}
                        <Button
                            className="w-100 fw-bold mt-4 mau"

                            style={{
                                fontSize: '1.1rem',
                                padding: '10px',
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
                        backgroundColor: '#f8f9fa',
                        borderRadius: '12px',
                        border: '1px solid #e1e4e8',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Card.Body>
                        <h3
                            className="text-primary text-center mb-4"
                            style={{
                                fontSize: '1.4rem',
                                fontWeight: '600',
                                color: '#007bff',
                                letterSpacing: '0.5px',
                            }}
                        >
                            Cần trợ giúp?
                        </h3>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item
                                className="border-0 d-flex align-items-center py-3"
                                style={{
                                    fontSize: '1rem',
                                    color: '#495057',
                                }}
                            >
                                <i
                                    className="bi bi-telephone me-3"
                                    style={{
                                        color: '#007bff',
                                        fontSize: '1.5rem',
                                        transition: 'transform 0.3s ease',
                                    }}
                                ></i>
                                Gọi cho chúng tôi: <strong style={{ color: '#495057' }}>+84 19001514</strong>
                            </ListGroup.Item>
                            <ListGroup.Item
                                className="border-0 d-flex align-items-center py-3"
                                style={{
                                    fontSize: '1rem',
                                    color: '#495057',
                                }}
                            >
                                <i
                                    className="bi bi-envelope me-3"
                                    style={{
                                        color: '#007bff',
                                        fontSize: '1.5rem',
                                        transition: 'transform 0.3s ease',
                                    }}
                                ></i>
                                email: <strong style={{ color: '#495057' }}>support@tourcompany.com</strong>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>

            </aside>
        </Col>
    );
};

export default PriceBookingInfo;
