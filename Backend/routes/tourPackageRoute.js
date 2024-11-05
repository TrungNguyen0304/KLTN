const express = require("express");
const router = express.Router();
const { createTour } = require("../controller/tourPackage");

router.post("/create", createTour);

module.exports = router;
