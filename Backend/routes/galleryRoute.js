const express = require("express");
const router = express.Router();
const {  createGallery, showAllGalleries, deleteGallery } = require("../controller/gallery"); // Import cả hai hàm create và getAll
const upload = require("../middlewares/upload");
// Tạo vị trí mới
router.post("/create", upload,createGallery);
// Lấy tất cả vị trí
router.get('/', showAllGalleries);

router.delete('/delete/:id',deleteGallery);
module.exports = router;
