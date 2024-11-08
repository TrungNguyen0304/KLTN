const express = require("express");
const router = express.Router();

const {
  createTourGuide,
  deleteTourGuide,
  editTourGuide,
  getAllTourGuide,
  getTourGuideById,
} = require("../controller/tourGuide");

router.delete("/delete/:id", deleteTourGuide);
router.post("/create", createTourGuide);
router.put("/edit/:id", editTourGuide);
router.get("/getAll", getAllTourGuide);
router.get("/:id", getTourGuideById);

module.exports = router;
