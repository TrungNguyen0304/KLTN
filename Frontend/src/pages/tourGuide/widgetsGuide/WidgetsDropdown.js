import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CChartBar, CChartLine } from '@coreui/react-chartjs';
import './widgetsDropdown1.css'; // Import the custom CSS

const WidgetsDropdown = (props) => {

  const userId = localStorage.getItem('userid');
  const [stats, setStats] = useState({
    daily: {},
    weekly: {},
    monthly: {},
    yearly: {}
  });

  const { id } = props; // assuming the id is passed down as a prop

  useEffect(() => {
    const fetchPaymentStats = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/user/payments/count/${userId}`);
        const data = await response.json();
        setStats(data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching payment stats:", error);
      }
    };

    fetchPaymentStats();
  }, [userId]); // Update effect dependency on userId

  // Get current date in 'YYYY-MM-DD' format
  const currentDate = new Date().toISOString().split('T')[0];

  // Function to count today's payments (or the payments for any given day)
  const getPaymentsForDay = (day) => {
    if (!stats.daily) return 0;
    return stats.daily[day] || 0; // Get payment count for the given day or 0 if no data for that day
  };

  // Optional: You can also add functionality to display a range of days' payments
  const getWeeklyPayments = () => {
    if (!stats.weekly) return 0;
    return Object.values(stats.weekly).reduce((a, b) => a + b, 0);
  };

  const getMonthlyPayments = () => {
    if (!stats.monthly) return 0;
    return Object.values(stats.monthly).reduce((a, b) => a + b, 0);
  };

  const getYearlyPayments = () => {
    if (!stats.yearly) return 0;
    return Object.values(stats.yearly).reduce((a, b) => a + b, 0);
  };

  return (
    <div className={`widgets-container ${props.className}`}>
      {/* Daily Payments Widget */}
      <div className="widget-card users-widget">
        <div className="widget-header">
          <h4 className="widget-title">Ngày</h4>
          <span className="widget-value">{getPaymentsForDay(currentDate)} <span className="widget-change">↑</span></span>
        </div>
      </div>

      {/* Weekly Payments Widget */}
      <div className="widget-card income-widget">
        <div className="widget-header">
          <h4 className="widget-title">Tuần</h4>
          <span className="widget-value">{getWeeklyPayments()} <span className="widget-change">↑</span></span>
        </div>
      </div>

      {/* Monthly Payments Widget */}
      <div className="widget-card conversion-rate-widget">
        <div className="widget-header">
          <h4 className="widget-title">Tháng</h4>
          <span className="widget-value">{getMonthlyPayments()} <span className="widget-change">↑</span></span>
        </div>
      </div>

      {/* Yearly Payments Widget */}
      <div className="widget-card sessions-widget">
        <div className="widget-header">
          <h4 className="widget-title">Năm</h4>
          <span className="widget-value">{getYearlyPayments()} <span className="widget-change">↑</span></span>
        </div>
      </div>
    </div>
  );
};

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
};

export default WidgetsDropdown;
