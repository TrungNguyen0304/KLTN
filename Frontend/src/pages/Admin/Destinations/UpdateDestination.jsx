import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './create.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDestination = () => {
    const { id } = useParams();
    const [destinationName, setDestinationName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(''); // Lưu URL ảnh hiện tại
    const [state, setState] = useState('');
    const [locationId, setLocationId] = useState('');
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    // Fetch data for the destination and locations
    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/destination/${id}`);
                const data = response.data;

                // Cập nhật các trường thông tin
                setDestinationName(data.DestinationName);
                setDescription(data.Description);
                setState(data.state || '');
                setCurrentImage(data.Images); // URL ảnh hiện tại
                setLocationId(data.locationId || '');

            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu địa danh:", error);
                alert("Không thể tải dữ liệu địa danh.");
            }
        };

        const fetchLocations = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/location");
                setLocations(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách location:", error);
                alert("Không thể tải danh sách tỉnh/thành phố.");
            }
        };

        fetchDestination();
        fetchLocations();
    }, [id]);

    // Xử lý thay đổi ảnh chính
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Xử lý gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("DestinationName", destinationName.trim());
        formData.append("Description", description);
        formData.append("state", state);
        formData.append("locationId", locationId);

        // Thêm ảnh chính nếu có ảnh mới
        if (image) {
            formData.append("image", image);
        } else if (currentImage && !currentImage.startsWith("data:image")) {
            formData.append("currentImageURL", currentImage); // Thêm URL ảnh hiện tại nếu không phải base64
        }

        try {
            const response = await axios.put(`http://localhost:8001/api/destination/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                alert("Đã cập nhật địa danh thành công!");
                navigate("/destination");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật địa danh:", error.response?.data || error.message);
            alert("Đã xảy ra lỗi khi cập nhật địa danh.");
        }
    };

    return (
        <div className='parent-container'>
            <div className="form-container">
                <h2>Cập nhật địa danh</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="destinationName">Tên Địa Danh</label>
                        <input
                            id="destinationName"
                            type="text"
                            value={destinationName}
                            onChange={(e) => setDestinationName(e.target.value)}
                            placeholder="Nhập tên địa danh"
                            required
                        />
                    </div>

                    <div className="form-group anh">
                        <label htmlFor="imageUpload">Ảnh</label>
                        {currentImage && (
                            <div>
                                <p>Ảnh hiện tại:</p>
                                <img
                                    src={currentImage}
                                    alt="Current"
                                    className="current-image"
                                    style={{ Width: "200px", Height: "200px", marginBottom: "10px" }}
                                />
                            </div>
                        )}
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="imageUpload" className="file-input-label">Chọn ảnh mới</label>
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
                        <label htmlFor="locationId">Tỉnh/Thành Phố</label>
                        <select
                            id="locationId"
                            value={locationId}
                            onChange={(e) => setLocationId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Chọn...</option>
                            {locations.map(location => (
                                <option key={location._id} value={location._id}>
                                    {location.firstname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className='buttonCreate' type="submit">Cập nhật</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateDestination;
