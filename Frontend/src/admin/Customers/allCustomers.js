import React, { useState } from "react";
import "./allCustomers.css";
import Sidebar from "../siderBar/Sidebar";
import { Link } from "react-router-dom";

const AllCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddCustomer = () => {
    alert("Add customer functionality goes here!");
  };

  const handleEditCustomer = (id) => {
    alert(`Edit functionality for customer ID ${id} goes here!`);
  };

  const handleDeleteCustomer = (id) => {
    alert(`Delete functionality for customer ID ${id} goes here!`);
  };

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

  const filteredCustomers = customers.filter((customer) => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="HeaderCustomers">
          <div className="TableCustomers">
            <div className="SpanCustomer">
              <Link to="/dashboard" className="dashboard-link">
                Dashboard
              </Link>
              &gt; Customer
            </div>

            <button onClick={handleAddCustomer} className="add-button">
              Add Customer
            </button>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>
                    <button
                      onClick={() => handleEditCustomer(customer.id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteCustomer(customer.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllCustomers;
