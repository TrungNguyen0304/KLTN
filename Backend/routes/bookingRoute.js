const express = require("express");
const router = express.Router();
const {
  payment,
  callback,
  checkPaymentStatus,
  deleteBooking,
  getAll,
  getBookingByCode,
  getPaymentsByUser,
  getPaymentDetail,
  getAllPayments,
  getTotalIncomeForDay
} = require("../configs/momo");

router.post("/payment/:id", payment);
router.post("/callback", callback);
router.get("/checkpaymentstatus/:id", checkPaymentStatus);
router.get("/", getAll);
router.get("/payments", getAllPayments);
router.delete("/delete/:id", deleteBooking);
router.get("/code/:code", getBookingByCode);
router.get("/:userid", getPaymentsByUser);
router.get("/payment/:paymentId", getPaymentDetail);
router.get('/dailytotal/:date', getTotalIncomeForDay);

module.exports = router;
