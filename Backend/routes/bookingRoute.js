const express = require("express");
const router = express.Router();
const { payment,callback,checkPaymentStatus,deleteBooking,getAll,getBookingByCode,getPaymentsByUser} = require("../configs/momo");


router.post('/payment/:id', payment);
router.post("/callback", callback);
router.get("/checkpaymentstatus/:id", checkPaymentStatus); 
router.get("/", getAll);
router.delete("/delete/:id", deleteBooking);
router.get('/code/:code', getBookingByCode);
router.get("/:userid", getPaymentsByUser);

module.exports = router;
