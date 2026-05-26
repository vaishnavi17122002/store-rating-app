const express = require("express");

const router = express.Router();

const {
  submitRating,
} = require("../controllers/ratingController");

const { verifyToken } = require("../middleware/authMiddleware");

// Authenticated users can submit/update their own rating.
router.post("/", verifyToken, submitRating);

module.exports = router;
