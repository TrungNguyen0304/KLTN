import React, { useEffect, useState } from "react";
import "./ProfileGuide.css";
import axios from "axios";
import { Link } from 'react-router-dom';

function Profile() {
    const [userData, setUserData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        password: "",
    });

    const [originalData, setOriginalData] = useState({});
    const [isEditing, setIsEditing] = useState({
        firstname: false,
        lastname: false,
        email: false,
        phoneNumber: false,
        password: false,
    });

    const [passwordFields, setPasswordFields] = useState({
        oldPassword: "",
        newPassword: "",
    });

    const [notification, setNotification] = useState(null); // State quản lý thông báo
    const userId = localStorage.getItem("userid");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:8001/api/user/${userId}`
                );
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleInputChange = (field, value) => {
        setUserData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handlePasswordChange = (field, value) => {
        setPasswordFields((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleSave = async (field) => {
        let fieldName = ""; // Biến lưu tên trường để hiển thị trong thông báo

        if (field === "password") {
            try {
                await axios.put(
                    `http://localhost:8001/api/user/update-password/${userId}`,
                    passwordFields
                );

                setNotification("Cập nhật mật khẩu thành công!");
                setPasswordFields({ oldPassword: "", newPassword: "" });
                setIsEditing((prevState) => ({
                    ...prevState,
                    password: false,
                }));
            } catch (error) {
                console.error("Error updating password:", error);
                alert("Mật khẩu cũ không đúng hoặc có lỗi xảy ra!");
            }
        } else {
            // Xác định tên trường dựa trên `field`
            switch (field) {
                case "firstname":
                    fieldName = "Họ";
                    break;
                case "lastname":
                    fieldName = "Tên";
                    break;
                case "email":
                    fieldName = "Email";
                    break;
                case "phoneNumber":
                    fieldName = "Số điện thoại";
                    break;
                default:
                    fieldName = "Thông tin";
            }

            try {
                await axios.put(
                    `http://localhost:8001/api/user/update/${userId}`,
                    { [field]: userData[field] }
                );

                setNotification(`Cập nhật ${fieldName} thành công!`);
                setIsEditing((prevState) => ({
                    ...prevState,
                    [field]: false,
                }));
            } catch (error) {
                console.error("Error updating user data:", error);
                alert("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại!");
            }
        }

        // Xóa thông báo sau 3 giây
        setTimeout(() => setNotification(null), 3000);
    };

    const handleEdit = (field) => {
        setOriginalData({ ...userData });
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: true,
        }));

        if (field === "password") {
            setPasswordFields({ oldPassword: "", newPassword: "" });
        }
    };

    const handleCancel = (field) => {
        if (field === "password") {
            setPasswordFields({ oldPassword: "", newPassword: "" });
        } else {
            setUserData({ ...originalData });
        }

        setIsEditing((prevState) => ({
            ...prevState,
            [field]: false,
        }));
    };

    const handleSaveAllChanges = async () => {
        try {
            // Cập nhật thông tin cá nhân
            const updatedData = {};
            Object.keys(userData).forEach((key) => {
                if (userData[key] !== originalData[key]) {
                    updatedData[key] = userData[key];
                }
            });

            if (Object.keys(updatedData).length > 0) {
                await axios.put(`http://localhost:8001/api/user/update/${userId}`, updatedData);
            }

            // Cập nhật mật khẩu nếu có thay đổi
            if (passwordFields.oldPassword && passwordFields.newPassword) {
                await axios.put(`http://localhost:8001/api/user/update-password/${userId}`, passwordFields);
            }

            // Nếu cập nhật thành công, hiển thị thông báo
            setNotification("Cập nhật tất cả thông tin thành công!");

            // Đặt lại state sau khi lưu
            setOriginalData({ ...userData });
            setPasswordFields({ oldPassword: "", newPassword: "" });
            setIsEditing({
                firstname: false,
                lastname: false,
                email: false,
                phoneNumber: false,
                password: false,
            });

            setTimeout(() => setNotification(null), 3000); // Xóa thông báo sau 3 giây
        } catch (error) {
            console.error("Error saving all changes:", error);
            alert("Có lỗi xảy ra khi lưu thông tin. Vui lòng thử lại!");
        }
    };

    return (
        <div className="profile-container1">
            {notification && <div className="notification">{notification}</div>}
            <div className="breadcrumb">
                <Link to="/indextourguide"> <span>Trang chủ</span></Link> / <span>Hồ sơ của tôi</span>
            </div>
            <div className="profile-content">
                <div className="main-profile">
                    <h2>Thông tin cá nhân</h2>
                    <p>Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</p>
                    <div className="info-list">
                        <InfoRow
                            label="Họ"
                            value={userData.firstname}
                            isEditing={isEditing.firstname}
                            onChange={(value) => handleInputChange("firstname", value)}
                            onSave={() => handleSave("firstname")}
                            onCancel={() => handleCancel("firstname")}
                            onEdit={() => handleEdit("firstname")}
                        />
                        <InfoRow
                            label="Tên"
                            value={userData.lastname}
                            isEditing={isEditing.lastname}
                            onChange={(value) => handleInputChange("lastname", value)}
                            onSave={() => handleSave("lastname")}
                            onCancel={() => handleCancel("lastname")}
                            onEdit={() => handleEdit("lastname")}
                        />
                        <InfoRow
                            label="Email"
                            value={userData.email}
                            isEditing={isEditing.email}
                            onChange={(value) => handleInputChange("email", value)}
                            onSave={() => handleSave("email")}
                            onCancel={() => handleCancel("email")}
                            onEdit={() => handleEdit("email")}
                        />
                        <InfoRow
                            type="number"
                            label="Số điện thoại"
                            value={userData.phoneNumber}
                            isEditing={isEditing.phoneNumber}
                            onChange={(value) => handleInputChange("phoneNumber", value)}
                            onSave={() => handleSave("phoneNumber")}
                            onCancel={() => handleCancel("phoneNumber")}
                            onEdit={() => handleEdit("phoneNumber")}
                        />
                        <InfoRow
                            label="Mật khẩu"
                            value="********"
                            isEditing={isEditing.password}
                            onChange={(value) =>
                                handlePasswordChange(
                                    passwordFields.oldPassword ? "newPassword" : "oldPassword",
                                    value
                                )
                            }
                            onSave={() => handleSave("password")}
                            onCancel={() => handleCancel("password")}
                            onEdit={() => handleEdit("password")}
                        />
                    </div>
                    <button className="save-all-button" onClick={handleSaveAllChanges}>
                        Lưu tất cả các chỉnh sửa
                    </button>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value, isEditing, onChange, onSave, onCancel, onEdit }) {
    return (
        <div className="info-row">
            <div className="info-label">{label}</div>
            <div className="info-value">
                {isEditing ? (
                    label === "Mật khẩu" ? (
                        <div className="password-inputs">
                            <input
                                type="password"
                                placeholder="Mật khẩu cũ"
                                onChange={(e) => onChange(e.target.value)}
                                className="input-field"
                            />
                            <input
                                type="password"
                                placeholder="Mật khẩu mới"
                                onChange={(e) => onChange(e.target.value)}
                                className="input-field"
                            />
                        </div>
                    ) : (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="input-field"
                        />
                    )
                ) : (
                    <span>{label === "Mật khẩu" ? "********" : value || "Chưa có dữ liệu"}</span>
                )}
            </div>
            <div className="info-actions">
                {isEditing ? (
                    <>
                        <button className="save-button" onClick={onSave}>
                            Lưu
                        </button>
                        <button className="cancel-button" onClick={onCancel}>
                            Hủy
                        </button>
                    </>
                ) : (
                    <button className="edit-button" onClick={onEdit}>
                        Chỉnh sửa
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;
