import CustomError from "../Utils/CustomError.mjs";
import CloudinaryHelper from "../Utils/CloudinaryHelper.mjs";
import RatingsAndReviewsModel from "../Models/ratingsAndReview.mjs";
import "dotenv/config";
import mongoose from "mongoose";
import CoursesModel from "../Models/courses.mjs";
const createNewRatingAndReview = async (req, res, next) => {
  try {
    req.body.writtenByUser = req.user?.id;
    req.body.createdByUser = req.user?.id;

    const doc = new RatingsAndReviewsModel(req.body);

    // update course ratingsAndReviews
    req.course.ratingsAndReviews.push(doc?.id);

    // save
    await doc.save();
    await req.course.save();

    res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};
const getReviewsForHomepage = async (req, res, next) => {
  try {
    // first fetch all the reviews
    const reviews = await RatingsAndReviewsModel.find()
      .populate(
        "writtenByUser",
        "firstName lastName about googleProfileImage profileImage"
      )
      .populate("belongsToCourseId", "courseName");

    const randomReviews = [];
    // fetch any three random reviews
    const indices = [];
    // safeguard
    if (reviews?.length <= 3) {
      randomReviews = reviews;
    } else {
      console.log(reviews.length);
      while (indices.length < 3) {
        // genrate random idx from 0 to reviews length
        const idx = Math.floor(Math.random() * reviews.length);
        // check if it is present in indices
        // if not add it to indices
        if (!indices.includes(idx)) {
          randomReviews.push(reviews.at(idx));
          indices.push(idx);
        }
      }
    }
    // return those
    res.json({
      success: true,
      data: randomReviews,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};

const deleteRatingAndReview = async (req, res, next) => {
  try {
    // update course ratingsAndReviews
    const course = await CoursesModel.findById(
      req?.ratingAndReview?.belongsToCourseId
    );
    course.ratingsAndReviews = course.ratingsAndReviews.filter(
      (ratingAndReviewId) =>
        ratingAndReviewId.toString() !== req.ratingAndReview?._id.toString()
    );

    course.save();

    try {
      await req.ratingAndReview.deleteOne();
      res.json({
        success: true,
        message: "Rating and Review Deleted successfully !",
      });
    } catch (error) {
      throw new Error("Failed to delete Rating and Review !");
    }
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};

const RatingsAndReviewsController = {
  createNewRatingAndReview,
  deleteRatingAndReview,
  getReviewsForHomepage,
};
export default RatingsAndReviewsController;
