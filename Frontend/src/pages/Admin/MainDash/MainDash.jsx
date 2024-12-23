import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MainChart from './MainChart';
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CRow,
  CButton,
} from '@coreui/react';
import { cilCloud } from '@coreui/icons';  // Using cilCloud as a fallback icon
import CIcon from '@coreui/icons-react';
import WidgetsDropdown from '../widgets/WidgetsDropdown';

const MainDash = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Fetch payments data and user count
    const fetchData = async () => {
      try {
        const paymentsResponse = await axios.get('http://localhost:8001/api/booking/payments');  
        const userCountResponse = await axios.get('http://localhost:8001/api/user/user-count'); 
        setPayments(paymentsResponse.data.payments);
        setUserCount(userCountResponse.data.count);
        setTotalIncome(paymentsResponse.data.totalIncome);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="MainDash">
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
                <CIcon icon={cilCloud} /> {/* Use cilCloud instead */}
              </CButton>
            </CCol>
          </CRow>
          <MainChart payments={payments} userCount={userCount} />
        </CCardBody>
        <CCardFooter>
          <CRow className="mb-2 text-center">
            <CCol sm={6} style={{ backgroundColor: '#e0f7fa' }}>
              <div className="text-body-secondary">Tổng thu nhập</div>
              <div className="fw-semibold text-truncate">
                {totalIncome} VNĐ
              </div>
            </CCol>
            <CCol sm={6} style={{ backgroundColor: '#f8bbd0' }}>
              <div className="text-body-secondary">Người dùng</div>
              <div className="fw-semibold text-truncate">
                {userCount} Người dùng
              </div>
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </div>
  );
};

export default MainDash;
