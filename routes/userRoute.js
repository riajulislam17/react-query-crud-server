const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController");

// express router
const router = express();

// signup route
router.post("/signup", signupUser);

// login route
router.post("/login", loginUser);

module.exports = router;
