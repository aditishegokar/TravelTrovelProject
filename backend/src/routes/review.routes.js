const express = require("express");
const router = express.Router({ mergeParams: true });
const reviewController = require("../controllers/review.controller");
const protect = require("../middlewares/auth.middleware");

router.post("/", protect, reviewController.addReview);
router.get("/", reviewController.getReviews);

module.exports = router;
