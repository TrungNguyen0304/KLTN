const express = require("express");
const router = express.Router();
const { createBooking, getAll, getBookingByCode ,deleteBooking} = require("../controller/booking");

router.post("/create", createBooking);

router.get("/", getAll);

router.get('/code/:code',getBookingByCode);

router.delete("/delete/:id", deleteBooking);

module.exports = router;
