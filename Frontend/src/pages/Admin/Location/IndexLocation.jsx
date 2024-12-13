import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const IndexLocation = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const initialQuery = location.state?.searchQuery || "";
  const LocationPerPage = 8;

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/location");
        setLocations(response.data); // Giả sử response.data chứa thông tin locations với destinationsCount
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu Locations:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const fetchLocationsByQuery = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/location/search?searchQuery=${query}`
      );
      // Giả sử response.data đã có `destinationsCount` cho mỗi location
      setLocations(response.data); // Đảm bảo response.data chứa thông tin chính xác
      setCurrentPage(1); // Reset to the first page on new search
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const totalPages = Math.ceil(locations.length / LocationPerPage);
  const indexOfLastLocation = currentPage * LocationPerPage;
  const indexOfFirstLocation = indexOfLastLocation - LocationPerPage;
  const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchLocationsByQuery(searchQuery);
    }
  };

  const handleSearchClick = () => {
    fetchLocationsByQuery(searchQuery);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8001/api/location/delete/${id}`
      );
      console.log(response.data.message);
      setLocations(locations.filter((location) => location._id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa Location:", error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="HeaderCustomers">
      <Row className="align-items-center mb-3">
        <div className="Destination">Quốc gia</div>
        <Col md={6} className="mt-3">
          <div className="input-container position-relative">
            <input
              type="text1"
              className="form-control11"
              placeholder="Tìm kiếm người dùng..."
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyPress}
            />
            <FaSearch
              className="search-icon position-absolute top-50 end-0 translate-middle-y me-3"
              onClick={handleSearchClick}
            />
          </div>
        </Col>
        <Col md={6} className="text-end">
          <Link className="btn btn-primary" to="create">
            Thêm quốc gia
          </Link>
        </Col>
      </Row>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Thành Phố</th>
            <th>Số lượng Destination</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentLocations.map((location, index) => (
            <tr key={location._id}>
              <td>{index + 1}</td>
              <td>{location.firstname}</td>
              <td>{location.destinationsCount || 0}</td> {/* Hiển thị Số lượng Destination */}
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
      <div className="pagination">
        {locations.length > LocationPerPage && (
          <>
            <button
              className="btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Trước
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`btn ${page === currentPage ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Sau
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IndexLocation;
