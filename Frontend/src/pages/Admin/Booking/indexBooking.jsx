
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./IndexBooking.css";

const IndexBooking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/booking/");
        setBookings(response.data.payments);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/booking/delete/${id}`);
      setBookings(bookings.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <div className="HeaderBookings">
      <div className="TableBookings">
        <div className="SpanBooking">Booking</div>

        <div className="createBooking">
          <Link className="btn btn-primary" to="create">
            Add Booking
          </Link>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>User ID</th>
            <th>Code</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id}>
              <td>{index + 1}</td>
              <td>{booking.userId ? booking.userId.firstname : 'N/A'}</td>
              <td>
                <Link to={`/booking/detail/${booking.code}`}>{booking.code}</Link>
              </td>
              <td>{booking.status}</td>
              <td>{new Date(booking.createdAt).toLocaleString()}</td>
              <td>
                <Link to={`update/${booking._id}`} className="edit-button">Edit</Link>
              </td>
              <td>
                <button onClick={() => deleteBooking(booking._id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IndexBooking;
