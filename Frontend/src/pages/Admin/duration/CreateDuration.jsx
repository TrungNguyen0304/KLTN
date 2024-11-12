import React, { useState } from 'react';
import './CreateDuration.css';
import { useNavigate } from 'react-router-dom';

const CreateDuration = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
 
    const [itinerary, setItinerary] = useState([{ day: '', activity: '' }]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all fields are included in the request
        const data = {
          
            start_date: startDate,
            end_date: endDate,
            itinerary
        };

        try {
            const response = await fetch('http://localhost:8001/api/duration/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Thêm Khoảng thời gian thành công :', result);
                navigate('/duration');
            } else {
                console.error('lỗi Khoảng thời gian:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleItineraryChange = (index, e) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[index][e.target.name] = e.target.value;
        setItinerary(updatedItinerary);
    };

    const addItineraryItem = () => {
        setItinerary([...itinerary, { day: '', activity: '' }]);
    };

    const removeItineraryItem = (index) => {
        const updatedItinerary = itinerary.filter((_, i) => i !== index);
        setItinerary(updatedItinerary);
    };

    return (
        <div className='parent-container'>
            <div className="form-container">
                <h2>Thêm người dùng</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group-inline">
                        <div className="form-group">
                            <label htmlFor="start_date">Ngày bắt đầu</label>
                            <input
                                type="date"
                                id="start_date"
                                required
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="end_date">Ngày kết thúc</label>
                            <input
                                type="date"
                                id="end_date"
                                required
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    

                    <h3>Itinerary</h3>
                    <div className="itinerary-container">
                        {itinerary.map((item, index) => (
                            <div key={index} className="itinerary-item">
                                <div className="form-group">
                                    <label htmlFor={`day_${index}`}>Ngày {index + 1}</label>
                                    <input
                                        type="text"
                                        id={`day_${index}`}
                                        name="day"
                                        placeholder="Nhập ngày"
                                        value={item.day}
                                        onChange={(e) => handleItineraryChange(index, e)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor={`activity_${index}`}>Hoạt động</label>
                                    <input
                                        type="text"
                                        id={`activity_${index}`}
                                        name="activity"
                                        placeholder="Nhập hoạt động"
                                        value={item.activity}
                                        onChange={(e) => handleItineraryChange(index, e)}
                                        required
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => removeItineraryItem(index)}
                                    className="remove-itinerary-item"
                                >
                                    Xóa
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addItineraryItem}
                            className="add-itinerary-item"
                        >
                            Thêm hoạt động
                        </button>
                    </div>

                    <button className='buttonCreate' type="submit">Đăng Ký</button>
                </form>
            </div>
        </div>
    );
};

export default CreateDuration;
