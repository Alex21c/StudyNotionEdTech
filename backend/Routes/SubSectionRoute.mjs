import e from "express";
import passport from "../Passport/passport-config.mjs";
import multerUploadMiddleware from "../Multer/multer-config.mjs";
import multerUploadMiddlewareVideos from "../Multer/multer-config-videos-only.mjs";
import CustomError from "../Utils/CustomError.mjs";
import SubSectionController from "../Controllers/SubSectionController.mjs";
import { SubSectionInputValidationMiddleware } from "../Middlewares/SubSectionInputValidationMiddleware.mjs";
import "dotenv/config";
const SubSectionRoute = e.Router();

SubSectionRoute.post(
  "/create-new-sub-section",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    multerUploadMiddlewareVideos(req, res, (err) => {
      if (err) {
        next(
          new CustomError(
            400,
            err.message,
            " max. allowed fileSize: " +
              process.env.MAX_ALLOWED_FILE_UPLOAD_SIZE +
              "KB"
          )
        );
      } else {
        next();
      }
    });
  },
  SubSectionInputValidationMiddleware,
  SubSectionController.createNewSubSection
);
SubSectionRoute.put(
  "/edit-sub-section",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    multerUploadMiddlewareVideos(req, res, (err) => {
      if (err) {
        next(
          new CustomError(
            400,
            err.message,
            " max. allowed fileSize: " +
              process.env.MAX_ALLOWED_FILE_UPLOAD_SIZE +
              "KB"
          )
        );
      } else {
        next();
      }
    });
  },
  SubSectionInputValidationMiddleware,
  SubSectionController.editSubSection
);
SubSectionRoute.delete(
  "/delete-sub-section",
  passport.authenticate("jwt", { session: false }),
  SubSectionInputValidationMiddleware,
  SubSectionController.deleteSubSection
);

export default SubSectionRoute;
