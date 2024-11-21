const express = require("express");
const router = express.Router();
const { createBooking,getTourPackageById,getAllTourPackages} = require("../controller/booking");

router.post("/create", createBooking);
router.get("/:id", getTourPackageById);
router.get('/', getAllTourPackages);

module.exports = router;
