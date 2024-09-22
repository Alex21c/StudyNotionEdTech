import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, default: "student" }, // educator OR stduent
    isRoleModifictionPending: { type: Boolean, required: true, default: false },
    username: {
      type: String,
      maxlength: 50,
      match: [
        /^[a-zA-Z0-9_\-]+$/,
        "Invalid username. Only alphanumeric characters, underscores, and hyphens are allowed.",
      ],
    },
    firstName: { type: String, required: true },
    lastName: { type: String },
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

      validate: {
        validator: function (value) {
          return validator.isMobilePhone(value) && value.length === 10;
        },
        message: "Invalid mobile phone number, allowed length 10",
      },
    },
    password: { type: String },
    gender: {
      type: String,

      maxlength: 6,
      match: [
        /^[a-zA-Z]+$/,
        "Invalid gender. Only alphabets allowed, allowed length 6",
      ],
    },
    dateOfBirth: { type: Date },
    about: {
      type: String,

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
    googleProfileImage: { type: String },
    profileImage: { type: Map, of: String },
  },
  { timestamps: true }
);

const UsersModel = mongoose.model("users", userSchema);
export default UsersModel;
