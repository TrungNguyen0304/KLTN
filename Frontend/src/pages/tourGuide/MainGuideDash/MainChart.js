import React, { useEffect, useState } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import './ChartDashboard.css';

const ChartDashboard = () => {
  const userId = localStorage.getItem('userid'); // Lấy userId từ localStorage
  const [chartData, setChartData] = useState({
    daily: {},
    weekly: {},
    monthly: {},
    yearly: {},
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/user/payments/count/${userId}`);
        const data = await response.json();
        setChartData(data); // Cập nhật dữ liệu biểu đồ
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [userId]);

  const formatCombinedChartData = () => {
    const labels = Array.from(
      new Set([
        ...Object.keys(chartData.daily),
        ...Object.keys(chartData.weekly),
        ...Object.keys(chartData.monthly),
        ...Object.keys(chartData.yearly),
      ])
    );

    return {
      labels,
      datasets: [
        {
          label: 'Ngày',
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: 'rgba(75,192,192,1)',
          pointBorderColor: '#fff',
          data: labels.map((label) => chartData.daily[label] || 0),
          tension: 0.4, // Đường cong mượt
        },
        {
          label: 'Tuần',
          backgroundColor: 'rgba(153,102,255,0.2)',
          borderColor: 'rgba(153,102,255,1)',
          pointBackgroundColor: 'rgba(153,102,255,1)',
          pointBorderColor: '#fff',
          data: labels.map((label) => chartData.weekly[label] || 0),
          tension: 0.4,
        },
        {
          label: 'Tháng',
          backgroundColor: 'rgba(255,159,64,0.2)',
          borderColor: 'rgba(255,159,64,1)',
          pointBackgroundColor: 'rgba(255,159,64,1)',
          pointBorderColor: '#fff',
          data: labels.map((label) => chartData.monthly[label] || 0),
          tension: 0.4,
        },
        {
          label: 'Năm',
          backgroundColor: 'rgba(54,162,235,0.2)',
          borderColor: 'rgba(54,162,235,1)',
          pointBackgroundColor: 'rgba(54,162,235,1)',
          pointBorderColor: '#fff',
          data: labels.map((label) => chartData.yearly[label] || 0),
          tension: 0.4,
        },
      ],
    };
  };

  return (
    <div className="chart-dashboard">
      <h4>Biểu đồ sóng (Ngày, Tuần, Tháng, Năm)</h4>
      <div className="chart-container">
        <CChartLine
          data={formatCombinedChartData()}
          options={{
            responsive: true,
            plugins: {
              legend: { display: true },
            },
            scales: {
              x: {
                ticks: { maxRotation: 90, minRotation: 45 },
                grid: { display: false },
              },
              y: {
                ticks: { beginAtZero: true },
                grid: { display: true },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ChartDashboard;
