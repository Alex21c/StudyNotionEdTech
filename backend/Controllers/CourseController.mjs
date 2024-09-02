import CustomError from "../Utils/CustomError.mjs";
import CloudinaryHelper from "../Utils/CloudinaryHelper.mjs";
import CoursesModel from "../Models/courses.mjs";
import validator from "validator";
import Utils from "../Utils/Utils.mjs";
import fs from "fs";
import "dotenv/config";
import mongoose from "mongoose";
import RatingsAndReviewsModel from "../Models/ratingsAndReview.mjs";
const createNewCourse = async (req, res, next) => {
  try {
    req.body.createdByUser = req.user.id;

    const course = new CoursesModel(req.body);
    const thumbnail = req?.file;
    const tags = req.body?.tags;
    if (tags) {
      course.tags = tags.split(",").map((val) => val.trim());
    }

    if (thumbnail) {
      try {
        const objCloudinary = new CloudinaryHelper();
        const response = await objCloudinary.uploadFile(
          thumbnail,
          `${process.env.PRJ_NAME || "study-notion-edtech"}/Course-${
            course.id
          }/thumbnail/`
        );
        if (!response) {
          throw new Error("failed to upload file");
        }

        const imgData = {
          public_id: response.public_id,
          url: response.secure_url,
        };
        course.thumbnail = imgData;
      } catch (error) {
        return next(
          new CustomError(
            500,
            "Failed to upload image file to server ! " + error.message
          )
        );
      } finally {
        // delete file from uploads dir
        setTimeout(() => {
          fs.unlinkSync(req.file.path);
        }, 2000);
      }
    }

    await course.save();
    return res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};
const deleteCourse = async (req, res, next) => {
  try {
    // deleting all the ratingsAndReviews
    try {
      await RatingsAndReviewsModel.deleteMany({
        _id: { $in: req?.course?.ratingsAndReviews },
      });
    } catch (error) {
      throw new Error("failed to delete ratings and reviews !" + error.message);
    }

    // delete the document itself
    await req.course.deleteOne();

    res.json({
      success: true,
      message: "Course Deleted successfully !",
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};

const CourseController = {
  createNewCourse,
  deleteCourse,
};
export default CourseController;
