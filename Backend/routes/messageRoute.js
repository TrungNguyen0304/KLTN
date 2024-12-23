const express = require('express');
const router = express.Router();
const {
    createMessage,
    getAllMessages,
    deleteMessage,
    searchMessage,
} = require('../controller/Home/message');
const authenticateUser = require('../middlewares/authenticateUser'); 


router.post('/create', authenticateUser, createMessage); 
router.get('/',getAllMessages ); 
router.delete("/delete/:messageId", deleteMessage);
router.get("/search", searchMessage);

module.exports = router;
