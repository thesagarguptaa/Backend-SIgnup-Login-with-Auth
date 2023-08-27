const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["Admin", "Student", "Visitor"],
  },
});

module.exports = mongoose.model("signUpSchema", signUpSchema);
