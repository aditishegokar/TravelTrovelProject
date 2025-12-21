const express = require("express");
const router = express.Router();
const itineraryController = require("../controllers/itinerary.controller");
const protect = require("../middlewares/auth.middleware");

router.post("/", protect, itineraryController.createItinerary);
router.get("/:id", itineraryController.getItineraryById);

module.exports = router;
