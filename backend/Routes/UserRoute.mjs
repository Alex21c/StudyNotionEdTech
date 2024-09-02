import e from "express";
import UserController from "../Controllers/UserController.mjs";
import { UserInputValidationMiddleware } from "../Middlewares/userInputValidationMiddleware.mjs";
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
UserRoute.get("/handshake-hello", UserController.handshakeHello);
export default UserRoute;
