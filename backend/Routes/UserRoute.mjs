import e from "express";
import UserController from "../Controllers/UserController.mjs";
import { UserInputValidationMiddleware } from "../Middlewares/userInputValidationMiddleware.mjs";
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
  passport.authenticate("jwt", { session: false }),
  UserInputValidationMiddleware,
  UserController.modifyRole
);
UserRoute.get("/handshake-hello", UserController.handshakeHello);
export default UserRoute;
