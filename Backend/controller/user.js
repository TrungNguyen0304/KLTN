const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// API Register user
const register = async (req, res) => {
  const { email, password, firstname, lastname, phoneNumber } = req.body;
  const role = req.body.role || "user";

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Người dùng đã tồn tại." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      phoneNumber,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "Người dùng đã đăng ký thành công!" });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    res
      .status(500)
      .json({ message: "Lỗi máy chủ nội bộ.", error: error.message });
  }
};

// API Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // console.log("Thử đăng nhập bằng email:", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email không hợp lệ." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không hợp lệ." });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, firstname: user.firstname, role: user.role },
      process.env.JWT_SECRET, // Secret key từ file .env
      { expiresIn: "1h" } // Token hết hạn sau 1 giờ
    );

    res.status(200).json({
      message: "Đăng nhập thành công!",
      token, // Trả về token
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

// API Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }
    res.status(200).json({ message: "Người dùng đã được xóa thành công." });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

// API Update user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { email, firstname, lastname, phoneNumber, role } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, firstname, lastname, phoneNumber, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    res
      .status(200)
      .json({ message: "Cập nhật người dùng thành công!", user: updatedUser });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res
      .status(500)
      .json({ message: "Lỗi máy chủ nội bộ.", error: error.message });
  }
};

// API Get all users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi lấy danh sách người dùng", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

// API Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Lỗi lấy thông tin người dùng:", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

module.exports = {
  register,
  login,
  deleteUser,
  updateUser,
  getUserById,
  getAllUser,
};
