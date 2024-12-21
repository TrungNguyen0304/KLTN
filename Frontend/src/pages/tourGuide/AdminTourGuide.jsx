import React, { useState, useEffect } from "react";
import "../../adminApp.css";
import MainDash from "./MainGuideDash/MainDash";
import WidgetsDropdown from "./widgetsGuide/WidgetsDropdown";
import axios from "axios";

const AdminTourGuide = () => {
  const userId = localStorage.getItem("userid");
  const [paymentData, setPaymentData] = useState({
    daily: {},
    weekly: {},
    monthly: {},
    yearly: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8001/api/user/payments/count/${userId}`
        );
        console.log("Received payment data from API:", data);
        setPaymentData(data);
      } catch (error) {
        console.error("Error fetching payment data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <MainDash />
      <WidgetsDropdown paymentData={paymentData} className="mb-4" />
    </>
  );
};

export default AdminTourGuide;
