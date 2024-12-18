const express = require('express');
const router = express.Router();
const { getAdminTourGuideDetails } = require('../controller/tourGuide/showTourGuide');
const authenticateUser = require('../middlewares/authenticateUser'); // Middleware xác thực

// Route: GET /api/adminTourGuide
router.get('/adminTourGuide', authenticateUser, getAdminTourGuideDetails);

module.exports = router;
