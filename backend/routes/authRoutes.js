const express = require("express");

const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");


// Normal user registers without being logged in.
router.post("/register", register);

router.post("/login", login);


module.exports = router;
