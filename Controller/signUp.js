const signUpSchema = require("../models/Signup");
const bcrypt = require("bcrypt");

exports.Signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const Userexist = await signUpSchema.findOne({ email });

    if (Userexist) {
      res.status(400).json({
        success: false,
        message: "email already exist",
      });
    }

    let hashpassword;
    try {
      hashpassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "error in hashpassword",
        error: err.message,
      });
    }

    const user = await signUpSchema.create({
      firstName,
      lastName,
      email,
      password: hashpassword,
      role,
    });

    res.status(200).json({
      success: true,
      message: "user successfully signup ",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error in controller code",
      Error: err.message,
    });
  }
};
