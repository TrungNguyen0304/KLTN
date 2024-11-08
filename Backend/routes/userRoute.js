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
} = require("../controller/user");

router.post("/register", register);
router.post("/login", login);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
// router.put("/:id", editUser);
router.get("/", getAllUser);
router.get("/user/:id",getUserById );


module.exports = router;
