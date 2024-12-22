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
        { expiresIn: "24h" }
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

  const countPaymentsByUserGuideId = async (req, res) => {
    const { id } = req.params;

    try {
      const payments = await Payment.find({})
        .populate("packageId")
        .populate("userId");

      const filteredPayments = payments.filter(
        (payment) =>
          payment.packageId &&
          payment.packageId.userGuideId &&
          payment.packageId.userGuideId.toString() === id.toString()
      );

      if (filteredPayments.length === 0) {
        return res.status(200).json({
          daily: {},
          weekly: {},
          monthly: {},
          yearly: {},
        });
      }

      const counts = filteredPayments.reduce(
        (acc, payment) => {
          const date = new Date(payment.createdAt);

          const dayKey = date.toISOString().split("T")[0];
          const startOfYear = new Date(date.getFullYear(), 0, 1);
          const daysDifference = Math.floor(
            (date - startOfYear + (startOfYear.getDay() === 0 ? 0 : 7 - startOfYear.getDay())) /
            (1000 * 60 * 60 * 24)
          );
          const weekNumber = Math.ceil((daysDifference + 1) / 7);
          const weekKey = `${date.getFullYear()}-W${weekNumber}`;
          const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          const yearKey = `${date.getFullYear()}`;

          acc.daily[dayKey] = (acc.daily[dayKey] || 0) + 1;
          acc.weekly[weekKey] = (acc.weekly[weekKey] || 0) + 1;
          acc.monthly[monthKey] = (acc.monthly[monthKey] || 0) + 1;
          acc.yearly[yearKey] = (acc.yearly[yearKey] || 0) + 1;

          return acc;
        },
        { daily: {}, weekly: {}, monthly: {}, yearly: {} }
      );

      res.status(200).json(counts);
    } catch (error) {
      console.error("Error counting payments by UserGuideId:", error);
      res.status(500).json({ message: "Error counting payments" });
    }
  };

  const getUserCount = async (req, res) => {
    try {
      const userCount = await User.countDocuments({});
      res.status(200).json({ count: userCount });
    } catch (error) {
      console.error("Error fetching user count:", error);
      res.status(500).json({ message: "Error fetching user count" });
    }
  };
  const getTourGuideCount = async (req, res) => {
    try {
      const tourGuideCount = await User.countDocuments({ role: "tourguide" });
      res.status(200).json({ countGuide: tourGuideCount });
    } catch (error) {
      console.error("Error fetching tour guide count:", error);
      res.status(500).json({ message: "Error fetching tour guide count" });
    }
  };


  const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Kiểm tra tính hợp lệ của mật khẩu mới
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        message: "Mật khẩu mới phải chứa ít nhất 8 ký tự, bao gồm chữ hoa và chữ thường.",
      });
    }

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Mật khẩu cũ không đúng." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Cập nhật mật khẩu thành công!" });
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error);
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
    searchUser,
    getUserGuideId,
    countPaymentsByUserGuideId,
    getUserCount,
    getTourGuideCount,
    updatePassword

  };
