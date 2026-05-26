const express = require("express");

const router = express.Router();

const {
  addStore,
  getStores,
} = require("../controllers/storeController");

const {
  verifyToken,
  requireRole,
} = require("../middleware/authMiddleware");

// Anyone logged out can browse stores, but adding stores is admin-only.
router.post(
  "/",
  verifyToken,
  requireRole(["ADMIN"]),
  addStore
);

router.get("/", getStores);


module.exports = router;