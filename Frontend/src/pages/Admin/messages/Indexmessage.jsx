import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './IndexMessage.css';
import { format } from 'date-fns';
import { Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';


const IndexMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const MessagePerPage = 4;
  const [filteredMessages, setFilteredMessages] = useState([]);

  // Fetch all messages from API (no pagination or filtering)
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/message`);
        setMessages(response.data.data); // Store all messages
        setFilteredMessages(response.data.data); // Initially, show all messages
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(filteredMessages.length / MessagePerPage);
  const indexOfLastMessage = currentPage * MessagePerPage;
  const indexOfFirstMessage = indexOfLastMessage - MessagePerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search on key press (Enter key)
  const handleSearchKeyPress = (event) => {
    if (event.key === "Enter") {
      filterMessages(searchQuery);
    }
  };

  // Handle search click (when search icon is clicked)
  const handleSearchClick = () => {
    filterMessages(searchQuery);
  };

  // Filter messages based on search query (filters by firstname and lastname)
  const filterMessages = (query) => {
    if (!query) {
      setFilteredMessages(messages); // No search query, show all messages
    } else {
      const filtered = messages.filter((message) => {
        const fullName = `${message.userId.firstname} ${message.userId.lastname}`.toLowerCase();
        return fullName.includes(query.toLowerCase()); // Filter based on user name (firstname + lastname)
      });
      setFilteredMessages(filtered);
    }
    setCurrentPage(1); // Reset to page 1 after search
  };

  // Handle delete action
  const handleDelete = async (messageId) => {
    try {
      await axios.delete(`http://localhost:8001/api/message/delete/${messageId}`);
      setMessages(messages.filter((message) => message._id !== messageId));
      setFilteredMessages(filteredMessages.filter((message) => message._id !== messageId)); // Remove from filtered list
    } catch (error) {
      alert("Không thể xóa tin nhắn.");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="containermessage">
      <h1 className="title">Danh Sách Tin Nhắn</h1>
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

      {filteredMessages.length === 0 ? (
        <p className="noMessages">Không có tin nhắn nào</p>
      ) : (
        <ul className="messageList">
          {currentMessages.map((message) => (
            <li key={message._id} className="messageItem">
              {message.userId ? (
                <div className="messageContent">
                  <strong className="userName">Tên: {message.userId.firstname} {message.userId.lastname}</strong>
                  <span className="userEmail">Email: {message.userId.email}</span>
                  <span className="userPhoneNumber">Số điện thoại: {message.userId.phoneNumber}</span>
                  <p className="messageText">Tin nhắn: {message.message}</p>

                  {/* Format the createdAt timestamp */}
                  <span className="messageDate">
                    Ngày gửi: {format(new Date(message.createdAt), 'dd/MM/yyyy HH:mm')}
                  </span>

                  {/* Delete Button */}
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(message._id)}
                  >
                    Xóa
                  </button>
                </div>
              ) : (
                <p className="noUserData">User data not available</p>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="pagination">
        {filteredMessages.length > MessagePerPage && (
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

export default IndexMessage;
