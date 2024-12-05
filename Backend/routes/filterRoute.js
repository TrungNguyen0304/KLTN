const express = require("express");
const router = express.Router();
const { getFilteredTourPackages } = require("../controller/Home/filter");

// Route để lọc tours
router.get("/", getFilteredTourPackages);

module.exports = router;
