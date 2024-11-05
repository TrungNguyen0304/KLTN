import React from 'react'

const EditUser = () => {
    return (
        <>
            <div className='parent-container'>
                <div className="form-container">
                    <h2>Cập nhật</h2>
                    <form>
                        <div className="form-group-inline">
                            <div className="form-group">
                                <label htmlFor="firstName">Tên</label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="Nhập tên"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Họ</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Nhập họ"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Nhập Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Số điện thoại</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Nhập Số điện thoại"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mật Khẩu</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Nhập mật khẩu"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role" className="form-label">Vai trò</label>
                            <select
                                className="form-select"
                                id="role"
                                name="role"
                                required
                            >
                                <option value="admin">Admin</option>
                                <option value="user">Người dùng</option>
                            </select>
                        </div>
                        <button className='buttonCreate' type="submit">Đăng Ký</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditUser;