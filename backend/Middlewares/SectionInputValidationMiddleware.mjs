import SubSectionModel from "../Models/SubSection.mjs";
import SectionModel from "../Models/Section.mjs";
import mongoose from "mongoose";
import CoursesModel from "../Models/courses.mjs";
import CustomError from "../Utils/CustomError.mjs";
export const SectionInputValidationMiddleware = async (req, res, next) => {
  try {
    let action = req.url.split("/").at(-1);
    // in case there is query string
    if (action.includes("?")) {
      action = action.split("?").at(0);
    }
    if (action === "delete-section") {
      const { sectionId } = req.query;
      // is it valid?
      if (!mongoose.isValidObjectId(sectionId)) {
        throw new Error(`Invalid sectionId: ${sectionId}`);
      }
      const section = await SectionModel.findById(sectionId);
      if (!section) {
        return next(new CustomError(400, `section (${sectionId}) not found !`));
      }
      req.section = section;

      // authorization?
      // does it is created by current user
      if (section?.createdByUser.toString() !== req.user?._id.toString()) {
        // is the user Administrator
        if (req?.user?.role.toLowerCase() !== "administrator") {
          return next(
            new CustomError(
              400,
              "You havn't created this Section, only Administrator OR user who created this Section are allowed to delete it."
            )
          );
        }
      }
    } else if (action === "create-new-section") {
      const { belongsToCourseId } = req?.body;
      if (!mongoose.isValidObjectId(belongsToCourseId)) {
        throw new Error(`Invalid Course ID: ${belongsToCourseId}`);
      }

      const course = await CoursesModel.findById(belongsToCourseId);
      if (!course) {
        return next(
          new CustomError(400, `Course (${belongsToCourseId}) not found !`)
        );
      }
      req.course = course;
    } else if (
      action === "rename-section" ||
      action === "remove-sub-sections" ||
      action === "add-sub-sections"
    ) {
      // is subSectionId valid?
      const { sectionId } = req.body;
      if (!mongoose.isValidObjectId(sectionId)) {
        return next(new CustomError(400, `Invalid Section ID: ${sectionId}`));
      }
      const section = await SectionModel.findById(sectionId);
      if (!section) {
        return next(new CustomError(400, `Section (${sectionId}) not found !`));
      }
      req.section = section;
    }

    next();
  } catch (error) {
    return next(new CustomError(400, error.message));
  }
};
