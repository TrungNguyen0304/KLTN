import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditLocation = () => {
    const { id } = useParams(); // Get the location ID from the URL
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // State to hold error messages

    // Fetch the location data when the component mounts
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/location/location/${id}`);
                setFirstname(response.data.firstname);
            } catch (error) {
                setError(error.response ? error.response.data.message : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before the update

        try {
            await axios.put(`http://localhost:8001/api/location/update/${id}`, { firstname });
            setTimeout(() => {
                navigate('/location'); // Redirect to the location list after a short delay
            }, 1000);
        } catch (error) {
            setError(error.response ? error.response.data.message : error.message);
        }
    };

    if (loading) return <div>Loading...</div>; // Show loading message while fetching data

    return (
        <div className='parent-container'>
            <div className="form-container">
                <h2>Cập nhật</h2>
                {error && <div className="error-message">{error}</div>} {/* Show error message if exists */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">Tên</label>
                        <input
                            id="firstName"
                            type="text"
                            value={firstname} // Set the input value to the state
                            onChange={(e) => setFirstname(e.target.value)} // Update state on change
                            placeholder="Nhập tên"
                            required
                        />
                    </div>
                    <button className='buttonCreate' type="submit">Cập nhật</button>
                </form>
            </div>
        </div>
    );
};

export default EditLocation;
