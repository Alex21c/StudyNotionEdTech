import e from "express";
import passport from "../Passport/passport-config.mjs";
import multerUploadMiddleware from "../Multer/multer-config.mjs";
import multerUploadMiddlewareVideos from "../Multer/multer-config-videos-only.mjs";
import CustomError from "../Utils/CustomError.mjs";
import RatingsAndReviewsController from "../Controllers/RatingsAndReviewControllers.mjs";
import { RatingsAndReviewsInputValidationMiddleware } from "../Middlewares/RatingsAndReviewsInputValidationMiddleware.mjs";
import "dotenv/config";
const RatingsAndReviewsRoute = e.Router();
RatingsAndReviewsRoute.post(
  "/create-new-rating-and-review",
  passport.authenticate("jwt", { session: false }),
  RatingsAndReviewsInputValidationMiddleware,
  RatingsAndReviewsController.createNewRatingAndReview
);
RatingsAndReviewsRoute.delete(
  "/delete-rating-and-review",
  passport.authenticate("jwt", { session: false }),
  RatingsAndReviewsInputValidationMiddleware,
  RatingsAndReviewsController.deleteRatingAndReview
);

export default RatingsAndReviewsRoute;
