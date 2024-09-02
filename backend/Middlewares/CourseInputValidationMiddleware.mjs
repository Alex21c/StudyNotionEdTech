import SubSectionModel from "../Models/SubSection.mjs";
import SectionModel from "../Models/Section.mjs";
import mongoose from "mongoose";
import CustomError from "../Utils/CustomError.mjs";
import CoursesModel from "../Models/courses.mjs";
import RatingsAndReviewsModel from "../Models/ratingsAndReview.mjs";
export const CourseInputValidationMiddleware = async (req, res, next) => {
  try {
    let action = req.url.split("/").at(-1);
    // in case there is query string
    if (action.includes("?")) {
      action = action.split("?").at(0);
    }

    if (action === "create-new-course") {
      // safeguard make sure there is no other course with similar name
      const coursesWithSimilarName = await CoursesModel.findOne({
        courseName: req?.body?.courseName,
      });

      if (coursesWithSimilarName) {
        return next(
          new CustomError(
            400,
            "Course with similar name already exist, please try different course name !"
          )
        );
      }
      req.body.instructors = req.body.instructors
        .split(",")
        .map((instructor) => {
          const val = instructor.trim();
          // if there are empty value say , , , ,
          if (val.length > 0) {
            return val;
          } else {
            return null;
          }
        });
      // skip null instructors
      const instructors = [];
      req.body.instructors.forEach((instructor) => {
        if (instructor) {
          instructors.push(instructor);
        }
      });
      req.body.instructors = instructors;
    }
    if (action === "delete-course") {
      // is courseId valid?
      const { courseId } = req?.query;
      if (!mongoose.isValidObjectId(courseId)) {
        return next(new CustomError(400, `Invalid Course ID: ${courseId}`));
      }
      const course = await CoursesModel.findById(courseId);
      if (!course) {
        return next(new CustomError(400, `Course (${courseId}) not found !`));
      }
      req.course = course;

      // does it have any sections?
      if (req.course?.courseContent?.length > 0) {
        return next(
          new CustomError(
            400,
            "Course is having Content, it can only be deleted after all of its Sections are deleted !"
          )
        );
      }

      // authorization?
      // does course created by current user
      if (course?.createdByUser.toString() !== req.user?._id.toString()) {
        // is the user Administrator
        if (req?.user?.role.toLowerCase() !== "administrator") {
          return next(
            new CustomError(
              400,
              "You havn't created this course, only Administrator OR user who created this course are allowed to delete it."
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
