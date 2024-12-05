const express = require("express");
const router = express.Router();
const { createBooking, getAll, getBookingByCode, deleteBooking } = require("../controller/booking");
const { payment,callback,checkPaymentStatus} = require("../configs/momo");

router.post("/create", createBooking);
router.get("/", getAll);
router.get('/code/:code', getBookingByCode);
router.delete("/delete/:id", deleteBooking);

router.post('/payment/:id', payment);
router.post("/callback", callback);
router.get("/checkpaymentstatus/:id", checkPaymentStatus); 

module.exports = router;
