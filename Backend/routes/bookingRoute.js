const express = require("express");
const router = express.Router();
const {
  createBooking,
  getTourPackageById,
  getAllTourPackages,
  getUserAndTourPackage,
//   getBookingByUserId
} = require("../controller/booking");

router.post("/create", createBooking);
router.get("/:id", getTourPackageById);
router.get("/", getAllTourPackages);
router.get("/:userId/:packageId", getUserAndTourPackage);
// router.get('/:userId/bookings', getBookingByUserId);

module.exports = router;
