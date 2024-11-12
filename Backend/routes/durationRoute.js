const express = require("express");
const router = express.Router();
const { createDuration, getAllDurations, deleteDuration, updateDuration, getDurationById } = require("../controller/duration");

router.post("/create", createDuration);
router.get("/", getAllDurations);
router.delete("/delete/:id", deleteDuration);
router.put("/update/:id",updateDuration);
router.get("/:id", getDurationById);
module.exports = router;