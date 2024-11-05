const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  API Register user
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
    console.log("Thử đăng nhập bằng email:", email);

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Email không hợp lệ." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({ message: "Đăng nhập thành công!", token });
    } else {
      return res.status(401).json({ message: "Mật khẩu không hợp lệ." });
    }
  } catch (error) {
    console.error("Login error:", error);
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
// API Edit user by ID
const editUser = async (req, res) => {
  const { id } = req.params;
  const { email, firstname, lastname, phoneNumber, role } = req.body;

  try {
    if (!email && !firstname && !lastname && !phoneNumber && !role) {
      return res
        .status(400)
        .json({ message: "Không có dữ liệu nào để cập nhật." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, firstname, lastname, phoneNumber, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Người dùng không tồn tại." });
    }

    res.status(200).json({
      message: "Người dùng đã được cập nhật thành công.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res
      .status(500)
      .json({ message: "Lỗi máy chủ nội bộ.", error: error.message });
  }
};
// API get all user
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi lấy danh sách người dùng", error);
    res.status(500).json({ message: "Lỗi máy chủ nội bộ." });
  }
};

module.exports = {
  register,
  login,
  deleteUser,
  updateUser,
  editUser,
  getAllUser
};
