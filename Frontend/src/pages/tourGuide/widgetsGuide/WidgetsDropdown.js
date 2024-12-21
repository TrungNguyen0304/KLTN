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
          <span className="widget-value">26K</span>
        </div>
      </div>

      {/* Income Widget */}
      <div className="widget-card income-widget">
        <div className="widget-header">
          <h4 className="widget-title">Income</h4>
          <span className="widget-value">$6,20</span>
        </div>
      </div>

      {/* Conversion Rate Widget */}
      <div className="widget-card conversion-rate-widget">
        <div className="widget-header">
          <h4 className="widget-title">Conversion Rate</h4>
          <span className="widget-value">2.49%</span>
        </div>
      </div>

      {/* Sessions Widget */}
      <div className="widget-card sessions-widget">
        <div className="widget-header">
          <h4 className="widget-title">Sessions</h4>
          <span className="widget-value">44K</span>
        </div>
      </div>
    </div>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
}

export default WidgetsDropdown
