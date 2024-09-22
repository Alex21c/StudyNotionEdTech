import multerImageUploadMiddleware from "../Multer/multer-config-profile-image.mjs";
import JwtCookieAuthentication from "../Middlewares/JwtCookieAuthentication.mjs";
import e from "express";
import CustomError from "../Utils/CustomError.mjs";
import UserController from "../Controllers/UserController.mjs";
import { UserInputValidationMiddleware } from "../Middlewares/UserInputValidationMiddleware.mjs";
import passport from "../Passport/passport-config.mjs";
const UserRoute = e.Router();
UserRoute.post(
  "/register-new-user",
  UserInputValidationMiddleware,
  UserController.registerNewUser
);
UserRoute.post(
  "/login",
  UserInputValidationMiddleware,
  UserController.loginUser
);
UserRoute.patch(
  "/forget-password",
  UserInputValidationMiddleware,
  UserController.forgetPassword
);
UserRoute.patch(
  "/reset-password",
  UserInputValidationMiddleware,
  UserController.resetPassword
);
UserRoute.patch(
  "/modify-role",
  JwtCookieAuthentication,
  UserInputValidationMiddleware,
  UserController.modifyRole
);
UserRoute.patch(
  "/update-profile-image",
  JwtCookieAuthentication,
  (req, res, next) => {
    multerImageUploadMiddleware(req, res, (err) => {
      if (err) {
        next(
          new CustomError(
            400,
            err.message +
              " max. allowed fileSize: " +
              process.env.MAX_ALLOWED_FILE_UPLOAD_SIZE_IN_KB +
              "KB"
          )
        );
      } else {
        next();
      }
    });
  },
  UserInputValidationMiddleware,
  UserController.updateProfileImage
);
UserRoute.post("/logout", UserController.logout);
UserRoute.get("/handshake-hello", UserController.handshakeHello);
export default UserRoute;
