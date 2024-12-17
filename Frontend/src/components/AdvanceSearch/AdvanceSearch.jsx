import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../AdvanceSearch/search.css";
import { Container, Row, Col, Button } from "react-bootstrap";
// import
import CustomDropdown from "../CustomDropdown/CustomDropdown";

const AdvanceSearch = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate] = useState(new Date());

  const selectedLocation = (value) => { // Hàm xử lý khi chọn địa điểm
    console.log("Địa điểm:", value)
  }

  return (
    <>
      <section className="box-search-advance">
        <Container>
          <Row>
            <Col md={12} xs={12}>
              <div className="box-search shadow-sm">
                <div className="item-search">
                  {/*  Sử dụng Props để truyền dữ liệu */}
                  <CustomDropdown
                    label="Địa điểm"
                    onSelect={selectedLocation}
                    options={[
                      "USA, Turkish",
                      "Tokyo, Japan",
                      "Sydney, Australia",
                      "Melbourne, Australia",
                      "Paris, France",
                    ]}
                  />
                </div>
                <div className="item-search item-search-2">
                  <label className="item-search-label"> Ngày khởi hành </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd, MMMM, yyyy"
                  />
                </div>
                  <div className="item-search bd-none">
                    <Button className="primaryBtn flex-even d-flex justify-content-center">
                      <i className="bi bi-search me-2"></i> Tìm kiếm
                    </Button>

                  </div>
              </div>

            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdvanceSearch;
