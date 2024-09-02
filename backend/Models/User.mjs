import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, default: "student" },
    username: {
      type: String,
      required: true,
      maxlength: 50,
      match: [
        /^[a-zA-Z0-9_\-]+$/,
        "Invalid username. Only alphanumeric characters, underscores, and hyphens are allowed.",
      ],
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid email address",
      },
    },
    mobile: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value) && value.length === 10;
        },
        message: "Invalid mobile phone number, allowed length 10",
      },
    },
    password: { type: String, required: true },
    gender: {
      type: String,
      required: true,
      maxlength: 6,
      match: [
        /^[a-zA-Z]+$/,
        "Invalid gender. Only alphabets allowed, allowed length 6",
      ],
    },
    dateOfBirth: { type: Date, required: true },
    about: {
      type: String,
      required: true,
      maxlength: 100,
      match: [
        /^[a-zA-Z0-9\-\.\s]+$/,
        "Invalid about. Only alphanumeric characters, underscores, hyphens and dots are allowed.",
      ],
    },
    coursesEnrolledIn: [
      {
        type: mongoose.Types.ObjectId,
        ref: "courses",
      },
    ],
    passwordResetToken: { type: String },
  },
  { timestamps: true }
);

const UsersModel = mongoose.model("users", userSchema);
export default UsersModel;
