import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CreateDuration.css';  // Import CSS file to make the UI look nice

const UpdateDuration = () => {
    const { id } = useParams();  // Get the duration ID from URL params
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [itinerary, setItinerary] = useState([{ day: '', activity: '' }]);

    // Fetch the current duration data for editing
    useEffect(() => {
        const fetchDuration = async () => {
            try {
                const response = await fetch(`http://localhost:8001/api/duration/${id}`);
                const data = await response.json();
                if (response.ok) {
                    // Convert dates to yyyy-mm-dd format for the date input
                    const formattedStartDate = new Date(data.start_date).toISOString().split('T')[0];
                    const formattedEndDate = new Date(data.end_date).toISOString().split('T')[0];
                    
                    setStartDate(formattedStartDate);  // Set formatted start date
                    setEndDate(formattedEndDate);      // Set formatted end date
                    setItinerary(data.itinerary);      // Set default itinerary
                } else {
                    alert('Không tìm thấy Duration!');
                }
            } catch (error) {
                console.error('Error fetching duration data:', error);
                alert('Lỗi khi tải thông tin Duration.');
            }
        };

        fetchDuration();
    }, [id]);

    // Handle itinerary changes
    const handleItineraryChange = (index, e) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[index][e.target.name] = e.target.value;
        setItinerary(updatedItinerary);
    };

    // Add a new itinerary item
    const addItineraryItem = () => {
        setItinerary([...itinerary, { day: '', activity: '' }]);
    };

    // Remove an itinerary item
    const removeItineraryItem = (index) => {
        const updatedItinerary = itinerary.filter((_, i) => i !== index);
        setItinerary(updatedItinerary);
    };

    // Handle form submission (update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare updated data, only include fields that have changed
        const updatedData = {};

        // Compare and only include fields if the value has changed
        if (startDate !== '') updatedData.start_date = startDate;
        if (endDate !== '') updatedData.end_date = endDate;

        if (itinerary.length > 0) {
            const updatedItinerary = itinerary.filter((item, index) => {
                return item.day !== '' || item.activity !== '';
            });
            updatedData.itinerary = updatedItinerary.length > 0 ? updatedItinerary : undefined;
        }

        try {
            const response = await fetch(`http://localhost:8001/api/duration/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            const result = await response.json();
            if (response.ok) {
                console.log('Cập nhật Duration thành công:', result);
                navigate('/duration');  // Navigate back to the list of durations
            } else {
                console.error('Lỗi cập nhật Duration:', result.message);
                alert('Lỗi khi cập nhật Duration.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Lỗi kết nối khi cập nhật Duration.');
        }
    };

    return (
        <div className="parent-container">
            <div className="form-container">
                <h2>Cập nhật Duration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group-inline">
                        <div className="form-group">
                            <label htmlFor="start_date">Ngày bắt đầu</label>
                            <input
                                type="date"
                                id="start_date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="end_date">Ngày kết thúc</label>
                            <input
                                type="date"
                                id="end_date"
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

                    <button className="buttonCreate" type="submit">Cập nhật</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateDuration;
