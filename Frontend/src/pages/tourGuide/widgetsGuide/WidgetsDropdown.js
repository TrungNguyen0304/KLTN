import React from "react";
import PropTypes from "prop-types";
import "./widgetsDropdown.css";

const WidgetsDropdown = ({ paymentData = {}, className }) => {
  const { daily = {}, weekly = {}, monthly = {}, yearly = {} } = paymentData;

  console.log("Payment data received in WidgetsDropdown:", paymentData);

  const formatValuesToDisplay = (data) => {
    if (!data || Object.keys(data).length === 0) {
      return ["No data available"];
    }

    return Object.entries(data).map(([date, value]) => `${date}: ${value}`);
  };

  return (
    <div className={`widgets-container ${className}`}>
      {/* Daily Widget */}
      <div className="widget-card users-widget">
        <div className="widget-header">
          <h4 className="widget-title">Ngày</h4>
          <ul className="widget-value">
            {formatValuesToDisplay(daily).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Weekly Widget */}
      <div className="widget-card income-widget">
        <div className="widget-header">
          <h4 className="widget-title">Tuần</h4>
          <ul className="widget-value">
            {formatValuesToDisplay(weekly).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Monthly Widget */}
      <div className="widget-card conversion-rate-widget">
        <div className="widget-header">
          <h4 className="widget-title">Tháng</h4>
          <ul className="widget-value">
            {formatValuesToDisplay(monthly).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Yearly Widget */}
      <div className="widget-card sessions-widget">
        <div className="widget-header">
          <h4 className="widget-title">Năm</h4>
          <ul className="widget-value">
            {formatValuesToDisplay(yearly).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

WidgetsDropdown.propTypes = {
  paymentData: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default WidgetsDropdown;
