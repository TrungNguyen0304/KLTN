import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateLocation = () => {
    const [firstname, setFirstname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8001/api/location/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstname }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Location created:', data);
            // Navigate to IndexLocation on success
            navigate('/location'); // Update the path as needed
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
