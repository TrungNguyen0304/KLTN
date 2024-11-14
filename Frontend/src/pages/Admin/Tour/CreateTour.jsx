import React, { useState, useEffect } from 'react';
import './CreateTour.css';
import { useNavigate } from 'react-router-dom';

const CreateTour = () => {
    const [package_name, setPackageName] = useState('');
    const [price, setPrice] = useState('');
    const [incAndExc, setIncAndExc] = useState('');
    const [description, setDescription] = useState('');
    const [groupImages, setGroupImages] = useState([]); // Store group images as file objects
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [selectedDurations, setSelectedDurations] = useState([]);

    const [destinations, setDestinations] = useState([]);
    const [tourGuides, setTourGuides] = useState([]);
    const [locations, setLocations] = useState([]);
    const [durations, setDurations] = useState([]);

    const [destinationId, setDestinationId] = useState('');
    const [tourGuideId, setTourGuideId] = useState('');
    const [locationId, setLocationId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (url, setterFunction) => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setterFunction(data);
            } catch (error) {
                console.error(`Error fetching data from ${url}:`, error);
            }
        };

        fetchData("http://localhost:8001/api/location", setLocations);
        fetchData("http://localhost:8001/api/destination", setDestinations);
        fetchData("http://localhost:8001/api/tourGuide/getAll", setTourGuides);
        fetchData("http://localhost:8001/api/duration", setDurations);
    }, []);

    const handleDurationChange = (e) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedDurations(selectedIds);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
        } else {
            setPreview(null);
        }
    };

    const handleGroupImageChange = (e) => {
        const files = Array.from(e.target.files);
        setGroupImages(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedDurations.length === 0) {
            alert("Bạn cần chọn ít nhất một khoảng thời gian.");
            return;
        }

        // Log selectedDurations to debug
        console.log("Selected Durations: ", selectedDurations);

        const formData = new FormData();
        formData.append("package_name", package_name);
        formData.append("description", description);
        formData.append("incAndExc", incAndExc);
        formData.append("price", price);
        formData.append("durations", JSON.stringify(selectedDurations)); // Send durations as JSON string
        formData.append("destinationId", destinationId);
        formData.append("tourGuideId", tourGuideId);
        formData.append("locationId", locationId);
        formData.append("image", image); // Single image

        // Append group images to formData
        groupImages.forEach((file) => {
            formData.append("groupImages", file);
        });

        // Debug: Log the formData to check its contents
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await fetch("http://localhost:8001/api/tourPackage/create", {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert("Gói tour đã được tạo thành công!");
                console.log(result);
                navigate("/tour");
                
            } else {
                alert(result.message || "Có lỗi xảy ra.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
            alert("Có lỗi khi gửi yêu cầu.");
        }
    };
    return (
        <div className='parent-container'>
            <div className="form-container">
                <h2>Thêm Tour Du Lịch</h2>
                <form onSubmit={handleSubmit}>
                    {/* Tour Name and Price */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="packagename">Tên Tour</label>
                            <input
                                id="packagename"
                                type="text"
                                value={package_name}
                                onChange={(e) => setPackageName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Giá</label>
                            <input
                                id="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Description and Inclusions/Exclusions */}
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="description">Mô Tả</label>
                            <textarea
                                id="description"
                                rows="2"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="incAndExc">Bao Gồm/Không Bao Gồm</label>
                            <textarea
                                id="incAndExc"
                                rows="2"
                                value={incAndExc}
                                onChange={(e) => setIncAndExc(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Tour Guide and Duration */}
                    <div className="row-two-items">
                        <div className="form-group">
                            <label htmlFor="guide">Hướng Dẫn Viên</label>
                            <select
                                id="guide"
                                value={tourGuideId}
                                onChange={(e) => setTourGuideId(e.target.value)}
                                required
                            >
                                <option value="" disabled>Chọn Hướng Dẫn Viên</option>
                                {tourGuides.map(tourGuide => (
                                    <option key={tourGuide._id} value={tourGuide._id}>
                                        {tourGuide.first_name}    {tourGuide.last_name}

                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="duration">Khoảng Thời Gian</label>
                            <select
                                id="duration"
                                value={selectedDurations}
                                onChange={handleDurationChange}
                                multiple
                                required
                            >
                                {durations.map(duration => (
                                    <option key={duration._id} value={duration._id}>
                                        {new Date(duration.start_date).toLocaleDateString()} - {new Date(duration.end_date).toLocaleDateString()}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Destination and Location */}
                    <div className="row-two-items">
                        <div className="form-group">
                            <label htmlFor="destination">Điểm Đến</label>
                            <select
                                id="destination"
                                value={destinationId}
                                onChange={(e) => setDestinationId(e.target.value)}
                                required
                            >
                                <option value="" disabled>Chọn Điểm Đến</option>
                                {destinations.map(destination => (
                                    <option key={destination._id} value={destination._id}>
                                        {destination.DestinationName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="location">Quốc Gia</label>
                            <select
                                id="location"
                                value={locationId}
                                onChange={(e) => setLocationId(e.target.value)}
                                required
                            >
                                <option value="" disabled>Chọn Quốc Gia</option>
                                {locations.map(location => (
                                    <option key={location._id} value={location._id}>
                                        {location.firstname}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Image and Group Images */}
                    <div className="row-one-item">
                        <div className="form-group anh2">
                            <label htmlFor="image">Ảnh</label>
                            {image && (
                                <div>
                                    <p>Ảnh hiện tại:</p>
                                    <img
                                        src={preview} // Preview image
                                        alt="Current"
                                        className="current-image"
                                        style={{ width: '200px', height: '200px', marginRight: '10px', marginBottom: '10px' }}
                                    />
                                </div>
                            )}
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange} // Only handle single image
                            />
                            <label htmlFor="imageUpload" className="file-input-label">Chọn ảnh mới</label>
                        </div>
                        <div className="form-group anh2">
                            <label htmlFor="groupImages">Chọn nhiều ảnh</label>
                            <input
                                id="groupImageUpload"
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleGroupImageChange}
                            />
                            {groupImages.length > 0 && (
                                <div>
                                    <h3>Group Images</h3>
                                    {groupImages.map((file, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt={`Group Image ${index + 1}`}
                                            style={{ width: "100px", height: "100px", marginBottom: "10px" }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <button className='buttonCreate' type="submit">Đăng Ký</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTour;
