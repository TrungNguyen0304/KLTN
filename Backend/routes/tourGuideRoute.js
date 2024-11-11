const express = require("express");
const router = express.Router();
const upload =require("../middlewares/upload")
const {
  createTourGuide,
  deleteTourGuide,
  editTourGuide,
  getAllTourGuide,
  getTourGuideById,
} = require("../controller/tourGuide");

router.delete("/delete/:id", deleteTourGuide);
router.post("/create",upload, createTourGuide);
router.put("/update/:id", upload,editTourGuide);
router.get("/getAll", getAllTourGuide);
router.get("/:id", getTourGuideById);

module.exports = router;
