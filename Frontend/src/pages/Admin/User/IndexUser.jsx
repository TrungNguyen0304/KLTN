import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IndexUser.css";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const IndexUser = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState(""); // Add state for role filter
  const [currentPage, setCurrentPage] = useState(1);
  const user = useLocation();
  const initialQuery = user.state?.searchQuery || "";
  const UsersPerPage = 8;

  const roleMap = {
    admin: "Quản trị viên",
    user: "Người dùng",
    tourguide: "Hướng dẫn viên",
  };

  // Fetch users based on initial query
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8001/api/user/search?searchQuery=${initialQuery}&role=${role}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [initialQuery, role]); // Re-fetch when role changes

  // Function to fetch users based on search query and role
  const fetchUsersByQuery = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:8001/api/user/search?searchQuery=${query}&role=${role}`
      );
      setUsers(response.data);
      setCurrentPage(1); // Reset to the first page on new search
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete user by ID
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/user/delete/${id}`);
      // Refetch users after deletion
      fetchUsersByQuery(searchQuery);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / UsersPerPage);
  const indexOfLastUser = currentPage * UsersPerPage;
  const indexOfFirstUser = indexOfLastUser - UsersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Event handlers
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchUsersByQuery(searchQuery);
    }
  };
  const handleSearchClick = () => {
    fetchUsersByQuery(searchQuery);
  };


  return (
    <div className="HeaderCustomers">
      <Row className="align-items-center mb-3">
        <div className="Destination">Người dùng</div>

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
            Thêm người dùng
          </Link>

        </Col>
      </Row>
      <div className="role">
        <select
          className="form-control-role"
          value={role}
          onChange={handleRoleChange}
        >
          <option value="">Tất cả vai trò</option>
          {Object.keys(roleMap).map((key) => (
            <option key={key} value={key}>
              {roleMap[key]}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Họ</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Số điện thoại</th>
            <th>Sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1 + (currentPage - 1) * UsersPerPage}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{roleMap[user.role] || user.role}</td> {/* Map role to Vietnamese */}
              <td>{user.phoneNumber}</td>
              <td>
                <div className="edit2">
                  <Link to={`update/${user._id}`} className="edit-button">
                    Edit
                  </Link>
                </div>
              </td>
              <td>
                <div className="delete2">
                  <button
                    className="delete-button"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {users.length > UsersPerPage && (
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

export default IndexUser;
