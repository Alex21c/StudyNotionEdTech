import SubSectionModel from "../Models/SubSection.mjs";
import SectionModel from "../Models/Section.mjs";
import mongoose from "mongoose";
import CustomError from "../Utils/CustomError.mjs";
import UsersModel from "../Models/User.mjs";
import validator from "validator";
import jwt from "jsonwebtoken";
import Utils from "../Utils/Utils.mjs";
export const UserInputValidationMiddleware = async (req, res, next) => {
  try {
    let action = req.url.split("/").at(-1);
    // in case there is query string
    if (action.includes("?")) {
      action = action.split("?").at(0);
    }

    if (action === "register-new-user") {
      // Input Validations
      const { itIsGoogleAuth } = req.body;

      /// is role valid?
      if (!itIsGoogleAuth) {
        const validRoles = ["student", "educator"];
        req.body.role = req.body.role.toLowerCase();

        if (!validRoles.includes(req.body.role)) {
          return next(
            new CustomError(
              400,
              `invalid role ${
                req.body.role
              }, valid roles are: ${validRoles.join(", ")}`
            )
          );
        }
      }

      // DB Validations
      /// Does email already exist?
      if (await UsersModel.findOne({ email: req.body.email })) {
        return next(new CustomError(400, "email already exist!"));
      }
      if (!itIsGoogleAuth) {
        /// Does mobile already exist?
        if (await UsersModel.findOne({ mobile: req.body.mobile })) {
          return next(new CustomError(400, "mobile already exist!"));
        }
        /// Does username already exist?
        if (await UsersModel.findOne({ username: req.body.username })) {
          return next(new CustomError(400, "username already exist!"));
        }
      }
    } else if (action === "forget-password") {
      // is it properly formatted email?
      const { email } = req.body;
      if (!validator.isEmail(email)) {
        return next(new CustomError(400, `invalid email`));
      }

      // does any user exist with this email?
      const user = await UsersModel.findOne({ email });
      if (!user) {
        return next(
          new CustomError(
            404,
            `Not found : email doesn't belongs to any registered user`
          )
        );
      }
      req.user = user;
    } else if (action === "reset-password") {
      // invalid token - synchronous
      try {
        const { token } = req.query;
        const { _id, passwordResetToken } = jwt.verify(
          token,
          process.env.JWT_PRIVATE_KEY
        );

        // verify that the _id belongs to user, i.e. user exist
        const user = await UsersModel.findById(_id);
        if (!user) {
          return next(new CustomError(400, `Invalid Token !`));
        }
        req.user2 = user;
        // verify that the password token is valid
        const tokenStoredInDB = user?.passwordResetToken;

        if (tokenStoredInDB !== passwordResetToken) {
          return next(new CustomError(400, `Invalid Token !`));
        }
      } catch (error) {
        if (error.message.toLowerCase() === "jwt expired") {
          return next(
            new CustomError(
              400,
              `password reset link expired, kindly generate new link.`
            )
          );
        } else {
          return next(
            new CustomError(500, `Internal Server Error ${error.message}`)
          );
        }
      }
    } else if (action === "modify-role") {
      return res.send("hi there");
      // is role present?
      if (!req?.body?.role) {
        return next(new CustomError(400, `Missing role in request body`));
      }
      // is role valid?
      req.body.role = req.body.role.toLowerCase();
      let { role } = req.body;
      if (role !== "educator" && role !== "student") {
        return next(
          new CustomError(
            400,
            `Invalid role : ${role}. Allowed roles are student, educator`
          )
        );
      }
    }

    next();
  } catch (error) {
    return next(new CustomError(400, error.message));
  }
};
