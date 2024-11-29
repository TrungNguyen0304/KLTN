const express = require("express");
const router = express.Router();
const { createBooking, getAll, getBookingByCode } = require("../controller/booking");

router.post("/create", createBooking);

router.get("/", getAll);

router.get('/code/:code',getBookingByCode);

module.exports = router;
