import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingDetail = () => {
  const { code } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/booking/code/${code}`
        );
        console.log(response.data.booking); 
        setBooking(response.data.booking);  
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết đặt phòng:", error);
      }
    };

    fetchBookingDetail();
  }, [code]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  const isArray = Array.isArray(booking);

  return (
    <div className="HeaderBookings">
      <h1>Booking Detail</h1>
      <div className="TableBookings">
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Package</th>
              <th>Total</th>
              <th>Quantity</th>
              <th>Special Requests</th>
              <th>Booking Date</th>
            </tr>
          </thead>
          <tbody>
            {isArray ? (
              booking.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.packageId.package_name}</td>
                  <td>{item.total}</td>
                  <td>{item.quantity}</td>
                  <td>{item.special_requests}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr key={booking._id}>
                <td>1</td>
                <td>{booking.packageId.package_name}</td>
                <td>{booking.total}</td>
                <td>{booking.quantity}</td>
                <td>{booking.special_requests}</td>
                <td>{new Date(booking.createdAt).toLocaleString()}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingDetail;
