const express = require("express");
const router = express.Router();
const {
  register,
  login,
  deleteUser,
  editUser,
  updateUser,
  getAllUser,
} = require("../controller/user");

router.post("/register", register);
router.post("/login", login);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);
router.put("/:id", editUser);
router.get("/", getAllUser);


module.exports = router;
