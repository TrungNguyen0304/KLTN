const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createDestination,
  deleteDestination,
  editDestination,
  getAllDestination,
  getDestinationById,
} = require("../controller/destination");

router.post("/create", upload, createDestination);

router.delete("/:id", deleteDestination);
router.put("/:id", upload, editDestination);
router.get("/", getAllDestination);
router.get("/:id", getDestinationById);

module.exports = router;