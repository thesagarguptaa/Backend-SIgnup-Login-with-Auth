const express = require("express");
const router = express.Router();

// import controller

const { Signup } = require("../Controller/signUp");
const { login } = require("../Controller/login");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");

//define API route
router.post("/signUp", Signup);
router.post("/login", login);

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for TESTS",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the Protected route for Admin",
  });
});

module.exports = router;
