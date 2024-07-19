// Import Mongoose
const mongoose = require("mongoose");
// Import Validator
const validator = require("validator");

// Create User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is Required !!"],
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email ID !!");
        }
      },
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create User Collection & Export It
module.exports = mongoose.model("user", userSchema);
