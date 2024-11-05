import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const IndexLocation = () => {
    const [locations, setLocations] = useState([]); // State to hold locations
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://localhost:8001/api/location/location'); // Updated port
                setLocations(response.data); // Set the data to state
            } catch (error) {
                console.error("Error fetching locations:", error.response ? error.response.data : error.message);
            } finally {
                setLoading(false); // Set loading to false once data is fetched
            }
        };

        fetchLocations(); // Call the function
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8001/api/location/delete/${id}`);

            console.log(response.data.message); // Log success message
            setLocations(locations.filter(location => location._id !== id)); // Remove deleted location from state
        } catch (error) {
            console.error('Error deleting location:', error.response ? error.response.data : error.message);
        }
    };

    if (loading) return <div>Loading...</div>; // Show loading message

    return (
        <div className="HeaderCustomers">
            <div className="TableCustomers">
                <div className="SpanCustomer">
                    <Link to="/dashboard" className="dashboard-link">
                        Dashboard
                    </Link>
                    &gt; Customer
                </div>

                <div className='createDestination'>
                    <Link className="btn btn-primary" to="create">Thêm Quốc Gia</Link>
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location, index) => (
                        <tr key={location._id}>
                            <td>{index + 1}</td> {/* Sequential ID */}
                            <td>{location.firstname}</td>

                            <td>
                                <div className="edit2">
                                    <Link to={`/location/update/${location._id}`} className="edit-button">
                                        Edit
                                    </Link>
                                </div>
                            </td>
                            <td>
                                <div className="delete2">
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(location._id)} // Call handleDelete on click
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

export default IndexLocation;