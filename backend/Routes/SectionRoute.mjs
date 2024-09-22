import JwtCookieAuthentication from "../Middlewares/JwtCookieAuthentication.mjs";
import e from "express";
import passport from "../Passport/passport-config.mjs";
import CustomError from "../Utils/CustomError.mjs";
import { SectionInputValidationMiddleware } from "../Middlewares/SectionInputValidationMiddleware.mjs";
import SectionController from "../Controllers/SectionController.mjs";
const SectionRoute = e.Router();
SectionRoute.post(
  "/create-new-section",
  JwtCookieAuthentication,
  SectionInputValidationMiddleware,
  SectionController.createNewSection
);
SectionRoute.delete(
  "/delete-section",
  JwtCookieAuthentication,
  SectionInputValidationMiddleware,
  SectionController.deleteSection
);
SectionRoute.put(
  "/rename-section",
  JwtCookieAuthentication,
  SectionInputValidationMiddleware,
  SectionController.renameSection
);
SectionRoute.put(
  "/add-sub-sections",
  JwtCookieAuthentication,
  SectionInputValidationMiddleware,
  SectionController.addSubSections
);
SectionRoute.put(
  "/remove-sub-sections",
  JwtCookieAuthentication,
  SectionInputValidationMiddleware,
  SectionController.removeSubSections
);

export default SectionRoute;
