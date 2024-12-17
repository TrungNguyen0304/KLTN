import React, { useEffect, useRef } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import "./MainChart.css";

const MainChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color');
          chartRef.current.options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color');
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  const random = () => Math.round(Math.random() * 100);

  return (
    <div className="chart-container">
      <CChartLine
        ref={chartRef}
        className="chart-line"
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền mới
              borderColor: 'rgba(255, 99, 132, 1)', // Màu viền mới
              pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)', // Màu điểm hover
              borderWidth: 2,
              data: [
                random(),
                random(),
                random(),
                random(),
                random(),
                random(),
                random(),
              ],
              fill: true,
            },
            {
              label: 'My Second dataset',
              backgroundColor: 'transparent',
              borderColor: 'rgba(75, 192, 192, 1)', // Màu viền mới cho dataset 2
              pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)', // Màu điểm hover mới
              borderWidth: 2,
              data: [
                random(),
                random(),
                random(),
                random(),
                random(),
                random(),
                random(),
              ],
            },
            {
              label: 'My Third dataset',
              backgroundColor: 'transparent',
              borderColor: 'rgba(153, 102, 255, 1)', // Màu viền mới cho dataset 3
              pointHoverBackgroundColor: 'rgba(153, 102, 255, 1)', // Màu điểm hover mới
              borderWidth: 1,
              borderDash: [8, 5],
              data: [65, 65, 65, 65, 65, 65, 65],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 250,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </div>
  );
};

export default MainChart;
