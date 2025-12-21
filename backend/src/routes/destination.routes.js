const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destination.controller");
const reviewRoutes = require("./review.routes");

router.get("/search", destinationController.searchGuides);
router.get("/:id", destinationController.getGuideById);

// Nested reviews
router.use("/:id/reviews", reviewRoutes);

module.exports = router;
