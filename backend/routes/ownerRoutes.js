const express = require("express");

const router = express.Router();

const {
  getOwnerDashboard,
} = require(
  "../controllers/ownerController"
);

const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// Store owner dashboard
router.get(
  "/",
  verifyToken,
  requireRole(["STORE_OWNER"]),
  getOwnerDashboard
);


module.exports = router;

