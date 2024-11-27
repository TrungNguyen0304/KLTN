const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import model User

// Middleware xác thực người dùng
const authenticateUser = async (req, res, next) => {
    try {
        // Lấy token từ header
        const token = req.headers.authorization?.split(' ')[1]; // 'Bearer <token>'
        
        if (!token) {
            return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
        }

        // Xác thực token và giải mã
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Sử dụng secret key của bạn

        // Tìm người dùng từ ID trong token
        const user = await User.findById(decoded.id); // Tìm người dùng dựa trên ID trong token

        if (!user) {
            return res.status(401).json({ message: 'Người dùng không hợp lệ' });
        }

        // Gắn thông tin người dùng vào request
        req.user = user;

        // Tiếp tục với các middleware hoặc route handler tiếp theo
        next();
    } catch (error) {
        // Nếu có lỗi trong quá trình xác thực
        res.status(401).json({ message: 'Xác thực thất bại', error: error.message });
    }
};

module.exports = authenticateUser;