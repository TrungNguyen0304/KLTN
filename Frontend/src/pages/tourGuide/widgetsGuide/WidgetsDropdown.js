import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import './widgetsDropdown.css' // Import the custom CSS

const WidgetsDropdown = (props) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)
  const widgetChartRef3 = useRef(null) // New ref for Conversion Rate chart
  const widgetChartRef4 = useRef(null) // New ref for Sessions chart

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = '#1565c0'; // Darker blue for Users
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = '#0097a7'; // Darker teal for Income
          widgetChartRef2.current.update()
        })
      }

      if (widgetChartRef3.current) {
        setTimeout(() => {
          widgetChartRef3.current.data.datasets[0].backgroundColor = '#f57c00'; // Darker orange for Conversion Rate
          widgetChartRef3.current.update()
        })
      }

      if (widgetChartRef4.current) {
        setTimeout(() => {
          widgetChartRef4.current.data.datasets[0].borderColor = '#d32f2f'; // Darker red for Sessions
          widgetChartRef4.current.update()
        })
      }
    })
  }, [widgetChartRef1, widgetChartRef2, widgetChartRef3, widgetChartRef4])

  return (
    <div className={`widgets-container ${props.className}`}>
      {/* User Widget */}
      <div className="widget-card users-widget">
        <div className="widget-header">
          <h4 className="widget-title">Users</h4>
          <span className="widget-value">26K <span className="widget-change">(-12.4%) ↓</span></span>
        </div>
        <CChartLine
          ref={widgetChartRef1}
          className="widget-chart"
          style={{ height: '70px' }}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'Users Dataset',
                backgroundColor: 'transparent',
                borderColor: '#1565c0', // Darker blue for Users
                pointBackgroundColor: '#1565c0',
                data: [65, 59, 84, 84, 51, 55, 40],
              },
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

      {/* Income Widget */}
      <div className="widget-card income-widget">
        <div className="widget-header">
          <h4 className="widget-title">Income</h4>
          <span className="widget-value">$6,200 <span className="widget-change">(40.9%) ↑</span></span>
        </div>
        <CChartLine
          ref={widgetChartRef2}
          className="widget-chart"
          style={{ height: '70px' }}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'Income Dataset',
                backgroundColor: 'transparent',
                borderColor: '#0097a7', // Darker teal for Income
                pointBackgroundColor: '#0097a7',
                data: [1, 18, 9, 17, 34, 22, 11],
              },
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
              line: { borderWidth: 2 },
              point: { radius: 4 },
            },
          }}
        />
      </div>

      {/* Conversion Rate Widget */}
      <div className="widget-card conversion-rate-widget">
        <div className="widget-header">
          <h4 className="widget-title">Conversion Rate</h4>
          <span className="widget-value">2.49% <span className="widget-change">(84.7%) ↑</span></span>
        </div>
        <CChartBar
          ref={widgetChartRef3}
          className="widget-chart"
          style={{ height: '70px' }}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'Conversion Rate Dataset',
                backgroundColor: '#f57c00', // Darker orange for Conversion Rate
                borderColor: '#f57c00',
                data: [78, 81, 80, 45, 34, 12, 40],
                barPercentage: 0.6,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { display: false },
              y: { display: false },
            },
          }}
        />
      </div>

      {/* Sessions Widget */}
      <div className="widget-card sessions-widget">
        <div className="widget-header">
          <h4 className="widget-title">Sessions</h4>
          <span className="widget-value">44K <span className="widget-change">(-23.6%) ↓</span></span>
        </div>
        <CChartLine
          ref={widgetChartRef4}
          className="widget-chart"
          style={{ height: '70px' }}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'Sessions Dataset',
                backgroundColor: 'transparent',
                borderColor: '#d32f2f', // Darker red for Sessions
                pointBackgroundColor: '#d32f2f',
                data: [65, 70, 55, 90, 34, 70, 80],
              },
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
    </div>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
}

export default WidgetsDropdown
