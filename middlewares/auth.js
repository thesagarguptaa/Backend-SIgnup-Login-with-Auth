// auth , isStundent , isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    //verify token
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token",
      error: err,
    });
  }
};

//isStudent

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "THis is a protected route for students",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching",
      error: err,
    });
  }
};

//isAdmin

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "THis is a protected route for admin",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User Role is not matching",
      error: err,
    });
  }
};
