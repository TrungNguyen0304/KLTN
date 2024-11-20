import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './IndexDuration.css';  // Import the CSS file

const IndexDuration = () => {
    const [durations, setDurations] = useState([]);

    useEffect(() => {
        // Fetch durations from the server
        const fetchDurations = async () => {
            try {
                const response = await fetch('http://localhost:8001/api/duration/');
                const data = await response.json();
                setDurations(data);
            } catch (error) {
                console.error("Error fetching durations:", error);
            }
        };

        fetchDurations();
    }, []);

    // Function to delete a duration
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8001/api/duration/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the deleted duration from the state
                setDurations(durations.filter(duration => duration._id !== id));
                alert('Đã xóa Khoảng thời gian thành công');
            } else {
                alert('Không thể xóa Khoảng thời gian');
            }
        } catch (error) {
            console.error('Error deleting duration:', error);
            alert('Đã xảy ra lỗi khi xóa thời lượng');
        }
    };

    return (
        <div className="duration-container">
            <div className="TableCustomers">
                <div className="SpanCustomer">Khoảng thời gian</div>
                <div className="createDestination">
                    <Link className="btn btn-primary" to="create">
                        Thêm Khoảng thời gian{" "}
                    </Link>
                </div>
            </div>
            <div className="table-container">
                <table className="duration-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tour Package</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Itinerary</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {durations.map((duration, index) => (
                            <tr key={duration._id}>
                                <td>{index + 1}</td>
                                <td>{duration.tourPackageId?.package_name || "N/A"}</td> {/* Display tour package name */}
                                <td>{new Date(duration.start_date).toLocaleDateString()}</td>
                                <td>{new Date(duration.end_date).toLocaleDateString()}</td>
                                <td className="itinerary">
                                    {(duration.itinerary || []).map((item, idx) => (
                                        <div key={idx}>
                                            <strong>{item.day}</strong>: {item.activity}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/duration/update/${duration._id}`} className="edit-button">Edit</Link>
                                </td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(duration._id)}
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
    );
};

export default IndexDuration;
