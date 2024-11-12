const express = require("express");
const router = express.Router();
const {
  getNotificationsByUserId ,
  getNotificationById,
  deleteAllNotificationsByUserId,
  deleteNotificationById
} = require("../controller/notificationv");

router.get("/:userId", getNotificationsByUserId);
router.get("/detail/:notificationId", getNotificationById);
router.delete("/:notificationId", deleteNotificationById);
router.delete("/:userId/all", deleteAllNotificationsByUserId);



module.exports = router;
