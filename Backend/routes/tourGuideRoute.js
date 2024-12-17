const express = require("express");
const router = express.Router();
const upload =require("../middlewares/upload")
const {
  createTourGuide,
  deleteTourGuide,
  editTourGuide,
  getAllTourGuide,
  getTourGuideById,
  searchTourGuide,
} = require("../controller/tourGuide");

router.delete("/delete/:id", deleteTourGuide);
router.post("/create",upload, createTourGuide);
router.put("/update/:id", upload,editTourGuide);
router.get("/getAll", getAllTourGuide);
router.post("/:id", getTourGuideById);
router.get("/search", searchTourGuide);


module.exports = router;
