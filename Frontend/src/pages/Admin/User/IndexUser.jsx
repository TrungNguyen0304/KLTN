import React from "react";
import "./IndexUser.css";
import { Link } from "react-router-dom";

const IndexUser = () => {

  const customers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password123",
      phoneNumber: "123-456-7890",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      password: "password456",
      phoneNumber: "987-654-3210",
    },
    {
      id: 3,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      password: "password456",
      phoneNumber: "987-654-3210",
    },
    {
      id: 4,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      password: "password456",
      phoneNumber: "987-654-3210",
    },
    {
      id: 5,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      password: "password456",
      phoneNumber: "987-654-3210",
    },
    {
      id: 6,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      password: "password456",
      phoneNumber: "987-654-3210",
    },
  ];

  return (

    <div className="HeaderCustomers">
      <div className="TableCustomers">
        <div className="SpanCustomer">
      User
        </div>

        <div className='createDestination'>
          <Link className="btn btn-primary" to="create">Thêm người dùng </Link>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
              <td>{customer.phoneNumber}</td>

              <td>
                <div className="edit2">
                  <Link to="update" className="edit-button">
                    Edit
                  </Link>
                </div>
              </td>
              <td>
                <div className="delete2">
                  <button
                    className="delete-button"
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