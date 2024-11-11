import React, { useState } from 'react';
import { format } from 'date-fns'; // Import date-fns for formatting
import './CreateTour.css';

const CreateTour = () => {
    const [dateRanges, setDateRanges] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [numPeople, setNumPeople] = useState(''); // State for the number of people

    const handleAddDateRange = () => {
        if (startDate && endDate && numPeople && new Date(startDate) <= new Date(endDate)) {
            // Calculate days and nights
            const { days, nights } = calculateDaysAndNights(startDate, endDate);

            // Add date range with days, nights, and number of people to the state
            setDateRanges([
                ...dateRanges,
                { startDate, endDate, days, nights, numPeople }
            ]);

            // Reset the input fields
            setStartDate('');
            setEndDate('');
            setNumPeople('');
        }
    };

    const handleRemoveDateRange = (index) => {
        setDateRanges(dateRanges.filter((_, i) => i !== index));
    };

    const calculateDaysAndNights = (start, end) => {
        const startDateObj = new Date(start);
        const endDateObj = new Date(end);
        
        const timeDifference = endDateObj - startDateObj;
        const daysCount = timeDifference / (1000 * 3600 * 24);
        
        return {
            days: daysCount + 1, // Add 1 to include the start day
            nights: daysCount // Nights is the number of days minus 1
        };
    };

    // Helper function to format date as dd/mm/yyyy
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return format(date, 'dd/MM/yyyy');
    };

    return (
        <div className='parent-container'>
            <div className="form-container">
                <h2>Thêm Tour du lịch</h2>
                <form>
                    <div className="form-columns">
                        {/* Column 1 */}
                        <div className="form-column">
                            <div className="form-group">
                                <label htmlFor="destinationName">Tên Địa Danh</label>
                                <input
                                    id="destinationName"
                                    type="text"
                                    placeholder="Nhập tên địa danh"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Mô tả</label>
                                <textarea
                                    id="description"
                                    rows="3"
                                    placeholder="Nhập mô tả"
                                    required
                                />
                            </div>
                        </div>

                        {/* Column 2 */}
                        <div className="form-column">
                            <div className="form-group">
                                <label htmlFor="price">Giá</label>
                                <input
                                    id="price"
                                    type="text"
                                    placeholder="Giá"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="itinerary">Hành trình</label>
                                <textarea
                                    id="itinerary"
                                    rows="3"
                                    placeholder="Nhập hành trình"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Row for Price and Guide */}
                    <div className="row-two-items">
                        <div className="form-group">
                            <label htmlFor="guide">Hướng dẫn viên</label>
                            <select id="guide" required>
                                <option value="" disabled>Chọn...</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="destination">Điểm đến</label>
                            <select id="destination" required>
                                <option value="" disabled>Chọn...</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Quốc gia</label>
                            <select id="country" required>
                                <option value="" disabled>Chọn...</option>
                            </select>
                        </div>
                    </div>

                    {/* Row for Available Date Ranges */}
                    <div className="form-group">
                        <label>Khoảng thời gian có sẵn</label>
                        <div className="date-picker-row">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Ngày bắt đầu"
                                required
                            />
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="Ngày kết thúc"
                                required
                            />
                            <input
                           
                                type="number"
                                value={numPeople}
                                onChange={(e) => setNumPeople(e.target.value)}
                                placeholder="Số người"
                                required
                            />
                            <button type="button" onClick={handleAddDateRange}>Thêm </button>
                        </div>

                        {/* List of Added Date Ranges */}
                        <ul className="date-range-list">
                            {dateRanges.map((range, index) => (
                                <li key={index}>
                                    Từ {formatDate(range.startDate)} đến {formatDate(range.endDate)} : {range.days} ngày, {range.nights} đêm
                                    - {range.numPeople} người
                                    <button type="button" onClick={() => handleRemoveDateRange(index)}>Xóa</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Row for Image Upload */}
                    <div className="row-one-item">
                        <div className="form-group anh2">
                            <label htmlFor="imageUpload">Ảnh</label>
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                            />
                        </div>
                        <div className="form-group anh2">
                            <label htmlFor="groupImagesUpload">Chọn nhiều ảnh</label>
                            <input
                                id="groupImagesUpload"
                                type="file"
                                accept="image/*"
                                multiple
                            />
                        </div>
                    </div>

                    <button className='buttonCreate' type="submit">Đăng Ký</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTour;
