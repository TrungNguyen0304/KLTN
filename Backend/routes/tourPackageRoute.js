const express = require("express");
const router = express.Router();
const { createTour,deleteTour,editTour,getAllTour } = require("../controller/tourPackage");
const upload = require("../middlewares/upload");

router.post("/create", upload,createTour);
router.get("/", getAllTour);
router.put("/update/:id", upload, editTour);
router.delete("/delete/:id", deleteTour);

module.exports = router;
