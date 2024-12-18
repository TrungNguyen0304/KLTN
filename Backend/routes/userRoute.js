const express = require("express");
const router = express.Router();
const {
  register,
  login,
  deleteUser,
  // editUser,
  updateUser,
  getAllUser,
  getUserById,
  searchUser,
} = require("../controller/user");

router.post("/register", register);
router.post("/login", login);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
// router.put("/:id", editUser);
router.get("/", getAllUser);
router.post("/:id",getUserById );
router.get("/search", searchUser);

module.exports = router;
