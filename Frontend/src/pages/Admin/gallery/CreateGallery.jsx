import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGallery = () => {
    const [Images, setImages] = useState([]);  // To handle multiple images
    const [preview, setPreview] = useState("");  // Preview for image
    const navigate = useNavigate();

    // Handle multiple image changes
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);  // Convert FileList to an array
        setImages(files);

        // Generate previews for each image
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setPreview(imageUrls);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        // Append each image file to formData
        Images.forEach((file) => {
            formData.append("image", file);  // Append all selected images
        });

        try {
            const response = await fetch("http://localhost:8001/api/gallery/create", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                setImages([]); // Clear the images after successful submission
                navigate("/gallerys"); // Redirect to another page after successful submission
            } else {
                alert(result.message || "Đã xảy ra lỗi khi thêm thư viện ảnh.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi yêu cầu:", error);
        }
    };

    return (
        <div className='parent-container'>
            <div className="form-container">
                <h2>Thêm Thư viện ảnh</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group anh2">
                        <label htmlFor="image">Ảnh</label>
                        {preview && preview.length > 0 && (
                            <div>
                                <p>Ảnh hiện tại:</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {preview.map((imageUrl, index) => (
                                        <img
                                            key={index}
                                            src={imageUrl}
                                            alt={`Preview ${index + 1}`}
                                            className="current-image"
                                            style={{ width: '100px', height: '100px', margin: '10px' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            multiple  // Allow multiple file selection
                            onChange={handleImageChange}  // Handle file change
                        />
                        <label htmlFor="imageUpload" className="file-input-label">Chọn ảnh mới</label>
                    </div>
                    <button className='buttonCreate' type="submit">Đăng Ký</button>
                </form>
            </div>
        </div>
    );
};

export default CreateGallery;
