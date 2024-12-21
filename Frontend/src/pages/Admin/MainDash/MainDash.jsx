import React from 'react'
import classNames from 'classnames'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilCloudDownload,
} from '@coreui/icons'
import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

import "./MainDash.css";
const MainDash = () => {
  const progressExample = [
    { title: 'Lượt truy cập', value: '29.703 Người dùng', percent: 40, color: 'success' },
    { title: 'Người dùng duy nhất', value: '24.093 Người dùng', percent: 20, color: 'info' },
    { title: 'Xem trang', value: '78.706 Lượt xem', percent: 60, color: 'warning' },
    { title: 'Người dùng mới', value: '22.123 Người dùng', percent: 80, color: 'danger' },
    { title: 'Tỷ lệ thoát', value: 'Tỷ lệ trung bình', percent: 40.15, color: 'primary' },
  ]

  return (
    <div className="MainDash">
      <>
        <WidgetsDropdown className="mb-4" />
        <CCard className="mb-4">
          <CCardBody>
            <CRow>
              <CCol sm={5}>
                <h4 id="traffic" className="card-title mb-0">
                  Lưu lượng truy cập
                </h4>
                <div className="small text-body-secondary">Tháng 1 - Tháng 7 năm 2023</div>
              </CCol>
              <CCol sm={7} className="d-none d-md-block">
                <CButton color="primary" className="float-end">
                  <CIcon icon={cilCloudDownload} />
                </CButton>
                <CButtonGroup className="float-end me-3">
                  {['Ngày', 'Tháng', 'Năm'].map((value) => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Tháng'}
                    >
                      {value}
                    </CButton>
                  ))}
                </CButtonGroup>
              </CCol>
            </CRow>
            <MainChart />
          </CCardBody>
          <CCardFooter>
            <CRow
              xs={{ cols: 1, gutter: 4 }}
              sm={{ cols: 2 }}
              lg={{ cols: 4 }}
              xl={{ cols: 5 }}
              className="mb-2 text-center"
            >
              {progressExample.map((item, index, items) => (
                <CCol
                  className={classNames({
                    'd-none d-xl-block': index + 1 === items.length,
                  })}
                  key={index}
                >
                  <div className="text-body-secondary">{item.title}</div>
                  <div className="fw-semibold text-truncate">
                    {item.value} ({item.percent}%)
                  </div>
                  <CProgress thin className="mt-2" color={item.color} value={item.percent} />
                </CCol>
              ))}
            </CRow>
          </CCardFooter>
        </CCard>
        <WidgetsBrand className="mb-4" withCharts />
      </>
    </div>
  );
};

export default MainDash;
