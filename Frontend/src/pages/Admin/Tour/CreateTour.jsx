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
            const { days, nights } = calculateDaysAndNights(startDate, endDate);

            setDateRanges([
                ...dateRanges,
                { startDate, endDate, days, nights, numPeople }
            ]);

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
                    {/* Row for Destination Name and Price */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="package_name">Tên Tour</label>
                            <input
                                id="package_name"
                                type="text"
                                placeholder="Nhập tên Tour"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Giá</label>
                            <input
                                id="price"
                                type="text"
                                placeholder="Giá"
                                required
                            />
                        </div>
                    </div>

                    {/* Row for Description, Itinerary, Inclusions, and Exclusions */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="description">Mô tả</label>
                            <textarea
                                id="description"
                                rows="2"
                                placeholder="Nhập mô tả"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="IncAndExcl">Bao gồm/Không bao gồm</label>
                            <textarea
                                id="IncAndExcl"
                                rows="2"
                                placeholder="Nhập mục bao gồm"
                                required
                            />
                        </div>
                        
                    </div>

                    {/* Other Form Fields */}
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
                            <button type="button" onClick={handleAddDateRange}>Thêm</button>
                        </div>

                        <ul className="date-range-list">
                            {dateRanges.map((range, index) => (
                                <li key={index}>
                                    Từ {formatDate(range.startDate)} đến {formatDate(range.endDate)} : {range.days} ngày, {range.nights} đêm - {range.numPeople} người
                                    <button type="button" onClick={() => handleRemoveDateRange(index)}>Xóa</button>
                                </li>
                            ))}
                        </ul>
                    </div>

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
