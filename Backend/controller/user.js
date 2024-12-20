const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payment = require("../models/payment");
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
const getUserOrderedPayments = async (userGuideId) => {
  try {
    const payments = await Payment.find({})
      .populate("packageId")
      .populate("userId")
      .populate("packageId.locationId")
      .populate("packageId.destinationId");
    // Filter the payments by matching userGuideId
    const matchingPayments = payments.filter(
      (payment) =>
        payment.packageId &&
        payment.packageId.userGuideId &&
        payment.packageId.userGuideId.toString() === userGuideId.toString()
    );

    return matchingPayments;
  } catch (error) {
    console.error("Error in getUserOrderedPayments:", error);
    throw new Error("Error fetching payments");
  }
};

const getUserGuideId = async (req, res) => {
  const { id } = req.params;

  try {
    const matchingPayments = await getUserOrderedPayments(id);

    res.status(200).json({ payments: matchingPayments });
  } catch (error) {
    console.error("Error in getUserGuideId:", error);
    res.status(500).json({ message: "Error fetching payments" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email không hợp lệ." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không hợp lệ." });
    }

    const token = jwt.sign(
      { id: user._id, firstname: user.firstname, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Lấy các thanh toán đã order của user guide
    const matchingPayments = await getUserOrderedPayments(user._id);

    res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      payments: matchingPayments,
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
  const { email, firstname, lastname, password, phoneNumber, role } = req.body;

  try {
    let updateData = { email, firstname, lastname, phoneNumber, role };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

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

const searchUser = async (req, res) => {
  try {
    const { searchQuery, role } = req.query; // Thêm `role` vào query parameters

    // Xây dựng bộ lọc
    const filter = {
      ...(searchQuery && {
        $or: [
          { email: { $regex: searchQuery, $options: "i" } },
          { firstname: { $regex: searchQuery, $options: "i" } },
          { lastname: { $regex: searchQuery, $options: "i" } },
        ],
      }),
      ...(role && { role: role }), // Nếu `role` được cung cấp, thêm điều kiện lọc theo role
    };

    const users = await User.find(filter);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

module.exports = {
  register,
  login,
  deleteUser,
  updateUser,
  getUserById,
  getAllUser,
  searchUser,
  getUserGuideId,
};
