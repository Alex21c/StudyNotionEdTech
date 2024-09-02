import e from "express";
import passport from "../Passport/passport-config.mjs";
import CustomError from "../Utils/CustomError.mjs";
import { SectionInputValidationMiddleware } from "../Middlewares/SectionInputValidationMiddleware.mjs";
import SectionController from "../Controllers/SectionController.mjs";
const SectionRoute = e.Router();
SectionRoute.post(
  "/create-new-section",
  passport.authenticate("jwt", { session: false }),
  SectionInputValidationMiddleware,
  SectionController.createNewSection
);
SectionRoute.delete(
  "/delete-section",
  passport.authenticate("jwt", { session: false }),
  SectionInputValidationMiddleware,
  SectionController.deleteSection
);
SectionRoute.put(
  "/rename-section",
  passport.authenticate("jwt", { session: false }),
  SectionInputValidationMiddleware,
  SectionController.renameSection
);
SectionRoute.put(
  "/add-sub-sections",
  passport.authenticate("jwt", { session: false }),
  SectionInputValidationMiddleware,
  SectionController.addSubSections
);
SectionRoute.put(
  "/remove-sub-sections",
  passport.authenticate("jwt", { session: false }),
  SectionInputValidationMiddleware,
  SectionController.removeSubSections
);

export default SectionRoute;
