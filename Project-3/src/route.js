const express = require("express");
const router = express.Router();
const authController = require("./authcontroller");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
