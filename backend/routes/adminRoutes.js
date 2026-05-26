const express = require("express");

const router = express.Router();

const {
  getDashboardData,
} = require(
  "../controllers/adminController"
);

const {
  verifyToken,
  requireRole,
} = require("../middleware/authMiddleware");

router.get(
  "/dashboard",
  verifyToken,
  requireRole(["ADMIN"]),
  getDashboardData
);


module.exports = router;