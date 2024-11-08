import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateLocation = () => {
    const [firstname, setFirstname] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(firstname); // Log the `firstname` value to ensure it's correct

        // Send the request to the backend
        try {
            const response = await fetch('http://localhost:8001/api/location/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname }),
            });

            // Check for a successful response
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Location created:', data);

            // Navigate to the location page after successful creation
            navigate('/location');
        } catch (error) {
            console.error('Error creating location:', error);
        }
    };

    return (
        <div className='parent-container'>
            <div className="form-container">
                <h2>Thêm Tên Quốc gia</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Tên Quốc gia</label>
                        <input
                            id="firstname"
                            type="text"
                            placeholder="Nhập tên quốc gia"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </div>
                    <button className='buttonCreate' type="submit">Đăng Ký</button>
                </form>
            </div>
        </div>
    );
};

export default CreateLocation;
