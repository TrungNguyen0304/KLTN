const express = require("express");
const router = express.Router();
const { createTour,deleteTour,editTour,getAllTour } = require("../controller/tourPackage");

router.post("/create", createTour);
router.get("/", getAllTour);
router.get("/edit/:id", editTour);
router.get("/delete/:id", deleteTour);

module.exports = router;
