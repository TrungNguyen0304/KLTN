const express = require("express");
const router = express.Router();
const { create, getAll, deleteLocation, updateLocation, getLocationById } = require("../controller/location"); // Import cả hai hàm create và getAll

// Tạo vị trí mới
router.post("/create", create);

// Lấy tất cả vị trí
router.get("/", getAll);

router.delete("/delete/:id", deleteLocation);

router.put("/update/:id", updateLocation); 

router.get("/location/:id", getLocationById);


module.exports = router;
