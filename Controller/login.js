const signUpSchema = require("../models/Signup");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //fetch email , password in req body
    console.log("fetch email , password in req body");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill email and password section",
      });
    }

    //check email and password is enter or not
    console.log("check email and password is enter or not");

    //check user is registerd or not
    let user = await signUpSchema.findOne({ email });

    console.log("check email is valid or not ");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email is not registered",
      });
    }

    console.log("if function for email registerd check ");

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    console.log("make payload");

    if (await bcrypt.compare(password, user.password)) {
      console.log("In a if function");

      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      console.log("make token");

      user = user.toObject();
      user.token = token;
      user.password = undefined;
      console.log("ready user");

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      console.log("make option");

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User Logged in successfully",
      });

      console.log("send cookie ");
    } else {
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
