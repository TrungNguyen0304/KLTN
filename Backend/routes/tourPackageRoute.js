const express = require("express");
const router = express.Router();
const { createTour,
    deleteTour,
    editTour,
    getAllTour,
    getAllTourById,
    countTourByDestination } = require("../controller/tourPackage");
const upload = require("../middlewares/upload");

router.post("/create", upload, createTour);
router.get("/", getAllTour);
router.get("/:id", getAllTourById);
router.put("/update/:id", upload, editTour);
router.delete("/delete/:id", deleteTour);
router.get("/count/:destinationId", countTourByDestination);

module.exports = router;

