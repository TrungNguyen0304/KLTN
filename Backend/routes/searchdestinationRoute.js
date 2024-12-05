const express = require("express");
const { searchDestination } = require("../controller/Home/searchDestination");

const router = express.Router();

// Route để tìm kiếm destination
router.get("/search", searchDestination);

module.exports = router;
