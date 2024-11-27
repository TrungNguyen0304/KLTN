const express = require('express');
const router = express.Router();
const {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} = require('../controller/Home/review');
const authenticateUser = require('../middlewares/authenticateUser'); 


router.post('/create', authenticateUser, createReview); 
router.get('/', getAllReviews); 
router.get('/:id', authenticateUser, getReviewById);
router.put('/:id', authenticateUser, updateReview); 
router.delete('/:id', authenticateUser, deleteReview); 

module.exports = router;
