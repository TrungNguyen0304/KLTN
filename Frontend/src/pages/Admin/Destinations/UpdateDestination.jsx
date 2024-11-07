import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './create.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDestination = () => {
    const { id } = useParams(); // Lấy ID từ route params
    const [destinationName, setDestinationName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(''); // Lưu URL ảnh hiện tại
    const [state, setState] = useState('');
    const [locationId, setLocationId] = useState('');
    const [locations, setLocations] = useState([]); // Lưu danh sách location
    const [groudImages, setGroudImages] = useState([]); // Lưu nhiều ảnh nhóm
    const [groudPreviews, setGroudPreviews] = useState([]); // Lưu ảnh preview nhóm
    const navigate = useNavigate(); // Khởi tạo useNavigate

    // Fetch data for the destination and locations
    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await axios.get(`http://localhost:8001/api/destination/${id}`);
                const data = response.data;
                setDestinationName(data.DestinationName);
                setDescription(data.Description);
                setState(data.state || ''); // Nếu state có
                setCurrentImage(data.Images); // Set ảnh hiện tại
                setLocationId(data.locationId || ''); // Set locationId từ dữ liệu
                setGroudImages(data.groudImages || []); // Lưu ảnh nhóm nếu có
                setGroudPreviews(data.groudImages ? data.groudImages.map(img => img) : []); // Hiển thị preview ảnh nhóm
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Hiển thị ảnh đã upload lên ngay lập tức nếu có
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentImage(reader.result); // Lưu URL của ảnh vào state
            };
            reader.readAsDataURL(file); // Đọc ảnh và chuyển thành Data URL
        }
    };

    const handleGroudImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setGroudImages(files); // Cập nhật ảnh nhóm mới

        const imagePreviews = files.map(file => URL.createObjectURL(file));
        setGroudPreviews(imagePreviews); // Cập nhật ảnh preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("DestinationName", destinationName.trim());
        formData.append("Description", description);
        formData.append("state", state);
        formData.append("locationId", locationId);

        // Kiểm tra nếu có ảnh mới cho địa danh
        if (image) {
            formData.append("image", image);  // Thêm ảnh mới cho địa danh nếu có
        } else if (currentImage) {
            formData.append("image", currentImage);  // Giữ ảnh cũ nếu không có ảnh mới
        }

        // Kiểm tra nếu có ảnh nhóm mới thì thêm, nếu không có thì giữ ảnh nhóm cũ
        if (groudImages.length > 0) {
            groudImages.forEach((img) => {
                formData.append('groudImages', img); // Thêm ảnh nhóm vào form data
            });
        } else if (groudPreviews.length > 0) {
            // Giữ ảnh nhóm cũ nếu không có ảnh nhóm mới
            groudPreviews.forEach((img) => {
                formData.append('groudImages', img); // Giữ ảnh nhóm cũ nếu không có ảnh mới
            });
        }

        try {
            const response = await axios.put(`http://localhost:8001/api/destination/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status === 200) {
                alert("Đã cập nhật địa danh thành công!");
                navigate("/destination"); // Điều hướng về trang danh sách địa danh
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật địa danh:", error);
            alert("Đã xảy ra lỗi khi cập nhật địa danh");
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

                    <div className="form-group">
                        <label htmlFor="imageUpload">Ảnh</label>
                        {currentImage && (
                            <div>
                                <p>Ảnh hiện tại:</p>
                                <img
                                    src={currentImage} // Hiển thị ảnh hiện tại nếu có
                                    alt="Current"
                                    className="current-image"
                                    style={{ maxWidth: "100%", maxHeight: "300px", marginBottom: "10px" }}
                                />
                            </div>
                        )}
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange} // Xử lý sự kiện thay đổi ảnh
                        />
                        <label htmlFor="imageUpload" className="file-input-label">Chọn ảnh mới (nếu có)</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="groudImagesUpload">Chọn nhiều ảnh</label>
                        <input
                            id="groudImagesUpload"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleGroudImagesChange} // Xử lý nhiều ảnh
                        />
                        <label htmlFor="groudImagesUpload" className="file-input-label">Chọn nhiều ảnh</label>
                    </div>

                    {/* Hiển thị preview các ảnh nhóm đã chọn */}
                    {groudPreviews.length > 0 && (
                        <div className="preview-images">
                            <h4>Ảnh nhóm đã chọn:</h4>
                            <div className="image-previews">
                                {groudPreviews.map((preview, index) => (
                                    <img
                                        key={index}
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        style={{ width: '100px', height: '100px', marginRight: '10px', marginBottom: '10px' }}
                                    />
                                ))}
                            </div>
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
