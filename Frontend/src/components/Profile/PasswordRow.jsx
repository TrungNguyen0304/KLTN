import React, { useState } from 'react';

function PasswordRow({ label, value, description }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newPassword, setNewPassword] = useState(value);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        console.log("New password:", newPassword); // Thay bằng API để lưu mật khẩu mới
        setIsEditing(false);
    };

    return (
        <div className="info-row">
            <div className="info-label">{label}</div>
            <div className="info-value">
                {isEditing ? (
                    <input
                        type="text"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nhập mật khẩu mới"
                    />
                ) : (
                    <input
                        type={isVisible ? "text" : "password"}
                        value={value}
                        readOnly
                        style={{ border: "none", backgroundColor: "transparent" }}
                    />
                )}
                {description && <small>{description}</small>}
            </div>
            {isEditing ? (
                <button className="edit-button" onClick={handleSaveClick}>
                    Lưu
                </button>
            ) : (
                <>
                    <button className="edit-button" onClick={toggleVisibility}>
                        {isVisible ? "Ẩn" : "Hiển thị"}
                    </button>
                    <button className="edit-button" onClick={handleEditClick}>
                        Chỉnh sửa
                    </button>
                </>
            )}
        </div>
    );
}

export default PasswordRow;
