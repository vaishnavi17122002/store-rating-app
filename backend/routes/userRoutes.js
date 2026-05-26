const express = require("express");

const router = express.Router();

const {
  getUsers,
  updatePassword,
} = require(
  "../controllers/userController"
);

const { verifyToken, requireRole } = require("../middleware/authMiddleware");

// Admin: Get Users
router.get(
  "/",
  verifyToken,
  requireRole(["ADMIN"]),
  getUsers
);

// Authenticated user: update only their own password
router.put(
  "/update-password",
  verifyToken,
  updatePassword
);

module.exports = router;

