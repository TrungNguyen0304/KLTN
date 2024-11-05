import React from 'react';
import './create.css';

const UpdateDestination = () => {
    return (
        <>
            <div className='parent-container'>
                <div className="form-container">
                    <h2>Cập nhật</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="destinationName">Tên Địa Danh</label>
                            <input
                                id="destinationName"
                                type="text"
                                placeholder="Nhập tên địa danh"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUpload">Ảnh</label>
                            <input
                                id="imageUpload"
                                type="file"
                                accept="image/*"
                                required
                            />
                            <label htmlFor="imageUpload" className="file-input-label">Chọn ảnh</label>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Mô tả</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="state" className="form-label">Tỉnh/Thành Phố</label>
                            <select
                                className="form-select"
                                id="state"
                                name="state"
                                required
                            >
                                <option value="" disabled>Chọn...</option>
                                <option value="NY">New York</option>
                                <option value="CA">California</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>

                        <button className='buttonCreate' type="submit">cập nhật</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateDestination;

