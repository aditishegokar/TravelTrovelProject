const express = require("express");
const router = express.Router();
const destinationController = require("../controllers/destination.controller");
const reviewRoutes = require("./review.routes");
const protect = require("../middlewares/auth.middleware");
const admin = require("../middlewares/admin.middleware");

router.post("/", protect, admin, destinationController.createGuide);
router.put("/:id", protect, admin, destinationController.updateGuide);
router.get("/", destinationController.getGuides);
router.get("/:id", destinationController.getGuideById);

// Nested reviews
router.use("/:id/reviews", reviewRoutes);

module.exports = router;
