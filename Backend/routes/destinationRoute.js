const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  createDestination,
  deleteDestination,
  editDestination,
  getAllDestination,
  getDestinationById,
  getDestinationsCountByLocation,
} = require("../controller/destination");

router.post("/create", upload, createDestination);

router.delete("/:id", deleteDestination);
router.put("/:id", upload, editDestination);
router.get("/", getAllDestination);
router.get("/:id", getDestinationById); 

router.get("/count/:locationId", async (req, res) => {
  const { locationId } = req.params;
  try {
    const count = await getDestinationsCountByLocation(locationId);
    res.status(200).json({ locationId, count });
  } catch (error) {
    console.error("Error fetching destinations count:", error.message);
    res.status(500).json({ message: "Error fetching destinations count", error: error.message });
  }
});

module.exports = router;