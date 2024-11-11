import React, { useEffect, useState } from "react";
import axios from "axios";
import "./IndexUser.css";
import { Link } from "react-router-dom";

const IndexUser = () => {
  const [users, setusers] = useState([]);

  useEffect(() => {
    const fetchusers = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/user");
        setusers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchusers();
  }, []);

  // Delete user by id
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/api/user/delete/${id}`);
      setusers(users.filter((user) => user.id !== id));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="HeaderCustomers">
      <div className="TableCustomers">
        <div className="SpanCustomer">User</div>

        <div className="createDestination">
          <Link className="btn btn-primary" to="create">
            Thêm người dùng{" "}
          </Link>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
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
    </div>
  );
};

export default IndexUser;
