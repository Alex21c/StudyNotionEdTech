import SubSectionModel from "../Models/SubSection.mjs";
import SectionModel from "../Models/Section.mjs";
import mongoose from "mongoose";
import CustomError from "../Utils/CustomError.mjs";
import CoursesModel from "../Models/courses.mjs";
import RatingsAndReviewsModel from "../Models/ratingsAndReview.mjs";
export const RatingsAndReviewsInputValidationMiddleware = async (
  req,
  res,
  next
) => {
  try {
    let action = req.url.split("/").at(-1);
    // in case there is query string
    if (action.includes("?")) {
      action = action.split("?").at(0);
    }

    if (action === "create-new-rating-and-review") {
      // has user already made a review?
      const reviewsCreatedByCurrentUser = await RatingsAndReviewsModel.findOne({
        writtenByUser: req.user?._id,
      });
      if (reviewsCreatedByCurrentUser) {
        return next(
          new CustomError(
            400,
            "You are only allowd to have single review for a particular course, you have already made an review, first delete that only then you can have new review"
          )
        );
      }

      // is courseId valid?
      const { belongsToCourseId } = req?.body;
      if (!mongoose.isValidObjectId(belongsToCourseId)) {
        return next(
          new CustomError(400, `Invalid Course ID: ${belongsToCourseId}`)
        );
      }
      const course = await CoursesModel.findById(belongsToCourseId);
      if (!course) {
        return next(
          new CustomError(400, `Course (${belongsToCourseId}) not found !`)
        );
      }
      req.course = course;
    }

    if (action === "delete-rating-and-review") {
      const { ratingAndReviewId } = req.query;
      // is it valid?
      if (!mongoose.isValidObjectId(ratingAndReviewId)) {
        throw new Error(`Invalid ratingAndReviewId: ${ratingAndReviewId}`);
      }
      const ratingAndReview = await RatingsAndReviewsModel.findById(
        ratingAndReviewId
      );
      if (!ratingAndReview) {
        return next(
          new CustomError(
            400,
            `ratingAndReviewId (${ratingAndReviewId}) not found !`
          )
        );
      }
      req.ratingAndReview = ratingAndReview;
      // authorization?
      // does it is created by current user
      if (
        req.ratingAndReview?.createdByUser.toString() !==
        req.user?._id.toString()
      ) {
        // is the user Administrator
        if (req?.user?.role.toLowerCase() !== "administrator") {
          return next(
            new CustomError(
              400,
              "You havn't created this Sub-Section, only Administrator OR user who created this Sub-Section are allowed to delete it."
            )
          );
        }
      }
    }

    next();
  } catch (error) {
    return next(new CustomError(400, error.message));
  }
};
