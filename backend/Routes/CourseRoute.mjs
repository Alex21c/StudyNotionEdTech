import e from "express";
import passport from "../Passport/passport-config.mjs";
import multerUploadMiddleware from "../Multer/multer-config.mjs";
import { CourseInputValidationMiddleware } from "../Middlewares/CourseInputValidationMiddleware.mjs";
import CustomError from "../Utils/CustomError.mjs";
import CourseController from "../Controllers/CourseController.mjs";
import "dotenv/config";
const CourseRoute = e.Router();
CourseRoute.post(
  "/create-new-course",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    multerUploadMiddleware(req, res, (err) => {
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
  CourseInputValidationMiddleware,
  CourseController.createNewCourse
);
CourseRoute.delete(
  "/delete-course",
  passport.authenticate("jwt", { session: false }),
  CourseInputValidationMiddleware,
  CourseController.deleteCourse
);

export default CourseRoute;
