import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingDetail = () => {
  const { code } = useParams();
  const [payment, setpayment] = useState(null);

  useEffect(() => {
    const fetchpaymentDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/booking/code/${code}`
        );
        console.log(response.data.payment); 
        setpayment(response.data.payment);  
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đặt phòng:", error);
      }
    };

    fetchpaymentDetail();
  }, [code]);

  if (!payment) {
    return <div>Loading...</div>;
  }

  const isArray = Array.isArray(payment);

  return (
    <div className="Headerpayments">
      <h1>payment Detail</h1>
      <div className="Tablepayments">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Package</th>
              <th>Total</th>
              <th>Quantity</th>
              <th>Special Requests</th>
              <th>payment Date</th>
            </tr>
          </thead>
          <tbody>
            {isArray ? (
              payment.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.packageId.package_name}</td>
                  <td>{item.total}</td>
                  <td>{item.totalPeople}</td>
                  <td>{item.specialrequest}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr key={payment._id}>
                <td>1</td>
                <td>{payment.packageId.package_name}</td>
                <td>{payment.amount}</td>
                <td>{payment.totalPeople}</td>
                <td>{payment.specialrequest}</td>
                <td>{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDetail;
