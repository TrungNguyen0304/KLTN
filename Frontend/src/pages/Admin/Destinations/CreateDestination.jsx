import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './create.css';

const CreateDestination = () => {
    const [destinationName, setDestinationName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [state, setState] = useState('');
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    // Fetch locations when component mounts
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch("http://localhost:8001/api/location");
                const data = await response.json();
                setLocations(data);
            } catch (error) {
                console.error("Error fetching locations:", error);
            }
        };

        fetchLocations();
    }, []);

    // Handle single image upload
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("DestinationName", destinationName);
        formData.append("Description", description);
        formData.append("image", image); // Single image
        formData.append("locationId", state);

        try {
            const response = await fetch("http://localhost:8001/api/destination/create", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                setDestinationName('');
                setDescription('');
                setImage(null);
                setState('');
                setPreview(null);
                navigate("/destination");
            } else {
                alert(result.message || "Đã xảy ra lỗi khi thêm địa danh.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };

    return (
        <div className='parent-container'>
            <div className="form-container">
                <h2>Thêm Địa Danh</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="destinationName">Tên Địa Danh</label>
                        <input
                            id="destinationName"
                            type="text"
                            placeholder="Nhập tên địa danh"
                            value={destinationName}
                            onChange={(e) => setDestinationName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group  anh">
                        <label htmlFor="imageUpload">Ảnh</label>
                        {image && (
                            <div>
                                <p>Ảnh hiện tại:</p>
                                <img
                                    src={preview} 
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
                            onChange={handleImageChange} 
                        />
                        <label htmlFor="imageUpload" className="file-input-label">Chọn ảnh mới </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Mô tả</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state" className="form-label">Tỉnh/Thành Phố</label>
                        <select
                            className="form-select"
                            id="state"
                            name="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        >
                            <option value="" disabled>Chọn...</option>
                            {locations.map((location) => (
                                <option key={location._id} value={location._id}>
                                    {location.firstname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className='buttonCreate' type="submit">Đăng Ký</button>
                </form>
            </div>
        </div>
    );
};

export default CreateDestination;
