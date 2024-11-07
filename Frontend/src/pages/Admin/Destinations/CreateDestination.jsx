import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './create.css';

const CreateDestination = () => {
    const [destinationName, setDestinationName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [state, setState] = useState('');
    const [groupImages, setGroupImages] = useState([]); // Sửa từ groudImages thành groupImages
    const [groupPreviews, setGroupPreviews] = useState([]); // Sửa từ groudPreviews thành groupPreviews
    const [locations, setLocations] = useState([]);
    const navigate = useNavigate();

    // Fetch locations khi component mount
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

    // Xử lý chọn ảnh đại diện
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

    // Xử lý chọn nhiều ảnh
    const handleGroupImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setGroupImages(files);

        const imagePreviews = files.map(file => URL.createObjectURL(file));
        setGroupPreviews(imagePreviews);
    };

    // Xử lý gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("DestinationName", destinationName);
        formData.append("Description", description);
        formData.append("image", image); // Ảnh đơn
        formData.append("locationId", state);

        // Thêm tất cả các ảnh nhóm vào FormData
        groupImages.forEach((img) => {
            formData.append("groupImages", img);  // Sửa từ groudImages thành groupImages
        });

        try {
            const response = await fetch("http://localhost:8001/api/destination/create", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                // Reset form
                setDestinationName('');
                setDescription('');
                setImage(null);
                setState('');
                setGroupImages([]); // Sửa từ groudImages thành groupImages
                setPreview(null);
                setGroupPreviews([]); // Sửa từ groudPreviews thành groupPreviews
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

                    <div className="form-group">
                        <label htmlFor="imageUpload">Ảnh</label>
                        {image && (
                            <div>
                                <p>Ảnh hiện tại:</p>
                                <img
                                    src={preview} // Hiển thị ảnh preview
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
                            onChange={handleImageChange} // Chỉ lưu ảnh đơn
                        />
                        <label htmlFor="imageUpload" className="file-input-label">Chọn ảnh mới </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="groupImagesUpload">Chọn nhiều ảnh</label>
                        <input
                            id="groupImagesUpload"
                            type="file"
                            accept="image/*"
                            multiple // Cho phép chọn nhiều ảnh
                            onChange={handleGroupImagesChange}
                        />
                        <label htmlFor="groupImagesUpload" className="file-input-label">Chọn nhiều ảnh </label>
                    </div>

                    {groupPreviews.length > 0 && (
                        <div className="image-preview">
                            <p>Ảnh đã chọn:</p>
                            {groupPreviews.map((image, index) => (
                                <img
                                    key={index}
                                    src={image} // Hiển thị ảnh preview
                                    alt={`Preview ${index}`}
                                    className="current-image"
                                    style={{ width: '200px', height: '200px', marginRight: '10px', marginBottom: '10px' }}
                                />
                            ))}
                        </div>
                    )}

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
