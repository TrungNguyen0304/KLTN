import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { CChartBar, CChartLine } from "@coreui/react-chartjs";
import "./widgetsDropdown.css"; // Import the custom CSS

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null);
  const widgetChartRef2 = useRef(null);
  const widgetChartRef3 = useRef(null);
  const widgetChartRef4 = useRef(null);
  const [userCount, setUserCount] = useState(0);
  const [tourGuideCount, setTourGuideCount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalIncomeday, setTotalIncomeday] = useState(0);

  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/user/user-count"
        );
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);
  useEffect(() => {
    const fetchTourGuideCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/user/tourGuideCount"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTourGuideCount(data.countGuide);
      } catch (error) {
        console.error("Error fetching tour guide count:", error);
      }
    };

    fetchTourGuideCount();
  }, []);
  useEffect(() => {
    const fetchTotalIncome = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/booking/payments"
        );
        const data = await response.json();

        const total = data.payments.reduce((sum, payment) => {
          if (payment.status === "complete") {
            return sum + payment.amount;
          }
          return sum;
        }, 0);

        setTotalIncome(total);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchTotalIncome();
  }, []);
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `http://localhost:8001/api/booking/dailytotal/${today}`
        );
        const data = await response.json();
        if (data.success) {
          setTotalIncomeday(data.totalIncomeDay);
        }
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  useEffect(() => {
    document.documentElement.addEventListener("ColorSchemeChange", () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor =
            "#1565c0"; // Darker blue for Users
          widgetChartRef1.current.update();
        });
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor =
            "#0097a7"; // Darker teal for Income
          widgetChartRef2.current.update();
        });
      }

      if (widgetChartRef3.current) {
        setTimeout(() => {
          widgetChartRef3.current.data.datasets[0].backgroundColor = "#f57c00"; // Darker orange for Conversion Rate
          widgetChartRef3.current.update();
        });
      }

      if (widgetChartRef4.current) {
        setTimeout(() => {
          widgetChartRef4.current.data.datasets[0].borderColor = "#d32f2f"; // Darker red for Sessions
          widgetChartRef4.current.update();
        });
      }
    });
  }, [widgetChartRef1, widgetChartRef2, widgetChartRef3, widgetChartRef4]);
  return (
    <div className={`widgets-container ${props.className}`}>
      {/* User Widget */}

      <div className="widget-card users-widget">
        <div className="widget-header">
          <h4 className="widget-title">Người Sử Dụng</h4>
          <span className="widget-value">
            {userCount} <span className="widget-change"></span>
          </span>
        </div>
        <CChartLine
          ref={widgetChartRef1}
          className="widget-chart"
          style={{ height: "70px" }}
          options={{
            plugins: { legend: { display: false } },
            maintainAspectRatio: false,
            scales: {
              x: { display: false },
              y: { display: false },
            },
            elements: {
              line: { borderWidth: 2, tension: 0.4 },
              point: { radius: 4 },
            },
          }}
        />
      </div>
      {/* Sessions Widget */}
      <div className="widget-card sessions-widget">
        <div className="widget-header">
          <h4 className="widget-title">Huóng dẫn viên</h4>
          <span className="widget-value">
            {tourGuideCount} <span className="widget-change"></span>
          </span>{" "}
        </div>
        <CChartLine
          ref={widgetChartRef4}
          className="widget-chart"
          style={{ height: "70px" }}
          data={{
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
            ],
          }}
          options={{
            plugins: { legend: { display: false } },
            maintainAspectRatio: false,
            scales: {
              x: { display: false },
              y: { display: false },
            },
            elements: {
              line: { borderWidth: 2, tension: 0.4 },
              point: { radius: 4 },
            },
          }}
        />
      </div>

      {/* Conversion Rate Widget */}
      <div className="widget-card income-widget">
        <div className="widget-header">
          <h4 className="widget-title">Tổng thu nhập trong ngày</h4>
          <span className="widget-value">
            {formatCurrency(totalIncomeday)}{" "}
            <span className="widget-change"></span>
          </span>{" "}
        </div>
        <CChartLine
          ref={widgetChartRef3}
          className="widget-chart"
          style={{ height: "70px" }}
          options={{
            plugins: { legend: { display: false } },
            maintainAspectRatio: false,
            scales: {
              x: { display: false },
              y: { display: false },
            },
            elements: {
              line: { borderWidth: 2 },
              point: { radius: 4 },
            },
          }}
        />
      </div>
      {/* Income Widget */}
      <div className="widget-card income-widget">
        <div className="widget-header">
          <h4 className="widget-title">Tổng Thu Nhập</h4>
          <span className="widget-value">
            {formatCurrency(totalIncome)}{" "}
            <span className="widget-change"></span>
          </span>
        </div>
        <CChartLine
          ref={widgetChartRef2}
          className="widget-chart"
          style={{ height: "70px" }}
          options={{
            plugins: { legend: { display: false } },
            maintainAspectRatio: false,
            scales: {
              x: { display: false },
              y: { display: false },
            },
            elements: {
              line: { borderWidth: 2 },
              point: { radius: 4 },
            },
          }}
        />
      </div>
    </div>
  );
};

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
};

export default WidgetsDropdown;
