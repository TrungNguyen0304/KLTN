import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const IndexLocation = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/location");
        setLocations(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu Locations:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8001/api/location/delete/${id}`);
      console.log(response.data.message);
      setLocations(locations.filter((location) => location._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa Location:", error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="HeaderCustomers">
      <div className="TableCustomers">
        <div className="SpanCustomer">
          <Link to="/dashboard" className="dashboard-link">Dashboard</Link> &gt; Location
        </div>

        <div className="createDestination">
          <Link className="btn btn-primary" to="create">Thêm Thành Phố</Link>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Thành Phố</th>
            <th>Số lượng Destination</th> {/* Thêm cột này */}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr key={location._id}>
              <td>{index + 1}</td>
              <td>{location.firstname}</td>
              <td>{location.destinationsCount}</td> {/* Hiển thị số lượng Destination */}
              <td>
                <div className="edit2">
                  <Link to={`/location/update/${location._id}`} className="edit-button">
                    Edit
                  </Link>
                </div>
              </td>
              <td>
                <div className="delete2">
                  <button className="delete-button" onClick={() => handleDelete(location._id)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default IndexLocation;
