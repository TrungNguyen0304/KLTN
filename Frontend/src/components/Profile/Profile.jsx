import React from 'react';
import './Profile.css';

function Profile() {
    return (
        <div className="profile-container">
            <div className="breadcrumb">
                <span>Trang chủ</span> / <span>Tài khoản</span> / <span>Hồ sơ của tôi</span>
            </div>
            <div className="profile-content">
                <div className="sidebar1">
                    <ul>
                        <li onClick={() => console.log('Go to profile')}>Hồ sơ của tôi</li>
                        <li onClick={() => console.log('Go to orders')}>Đơn hàng của tôi</li>
                        <li onClick={() => console.log('Logging out')}>Đăng xuất</li>
                    </ul>
                </div>
                <div className="main-profile">
                    <h2>Thông tin cá nhân</h2>
                    <p>Lưu thông tin của Quý khách để đặt dịch vụ nhanh hơn</p>
                    <div className="info-list">
                        <InfoRow label="Họ tên" value="Trung Nguyễn" />
                        <InfoRow label="Địa chỉ email" value="trungnguyen15989@gmail.com"  description="Đây là email Quý khách đã xác thực. iVIVU sẽ gửi các xác nhận đến địa chỉ email này"/>
                        <InfoRow label="Số điện thoại" value="Thêm số điện thoại của bạn" description="iVIVU sẽ liên lạc với Quý khách đến số điện thoại này" />
                        <InfoRow label="Ngày sinh" value="Nhập ngày sinh của bạn" />
                        <InfoRow label="Giới tính" value="Nhập giới tính của bạn" />
                        <InfoRow label="Địa chỉ" value="Nhập địa chỉ" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value, description }) {
    return (
        <div className="info-row">
            <div className="info-label">{label}</div>
            <div className="info-value">
                <span>{value}</span>
                {description && <small>{description}</small>}
            </div>
            <button className="edit-button" onClick={() => console.log(`Editing ${label}`)}>Chỉnh sửa</button>
        </div>
    );
}

export default Profile;
