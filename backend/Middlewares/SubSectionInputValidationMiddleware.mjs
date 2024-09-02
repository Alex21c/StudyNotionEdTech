import SubSectionModel from "../Models/SubSection.mjs";
import mongoose from "mongoose";
import CustomError from "../Utils/CustomError.mjs";
import CoursesModel from "../Models/courses.mjs";
import SectionModel from "../Models/Section.mjs";
import validator from "validator";
export const SubSectionInputValidationMiddleware = async (req, res, next) => {
  try {
    let action = req.url.split("/").at(-1);
    if (action.includes("?")) {
      action = action.split("?").at(0);
    }

    if (action === "create-new-sub-section") {
      if (!validator.isBoolean(req.body?.isFreePreviewAvailableForGuests)) {
        return next(
          new CustomError(
            400,
            `Invalid isFreePreviewAvailableForGuests only true | false supported as value`
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

      // is sectionId valid?
      const { belongsToSectionId } = req?.body;
      if (!mongoose.isValidObjectId(belongsToSectionId)) {
        return next(
          new CustomError(400, `Invalid Section ID: ${belongsToSectionId}`)
        );
      }
      const section = await SectionModel.findById(belongsToSectionId);
      if (!section) {
        return next(
          new CustomError(400, `Section (${belongsToSectionId}) not found !`)
        );
      }
      req.section = section;
      if (!req.file) {
        return next(
          new CustomError(400, `Missing video file in the request !`)
        );
      }
    }

    let subSectionId = null;
    if (action === "edit-sub-section") {
      subSectionId = req.body?.subSectionId;
    } else if (action === "delete-sub-section") {
      subSectionId = req.query?.subSectionId;
    }

    if (action === "edit-sub-section" || action === "delete-sub-section") {
      // is subSectionId valid?
      if (!mongoose.isValidObjectId(subSectionId)) {
        throw new CustomError(400, `Invalid Sub Section ID: ${subSectionId}`);
      }
      const subSection = await SubSectionModel.findById(subSectionId);
      if (!subSection) {
        return next(
          new CustomError(400, `Sub-Section (${subSectionId}) not found !`)
        );
      }
      req.subSection = subSection;
    }

    if (action === "delete-sub-section") {
      // authorization?
      // does it is created by current user
      if (
        req.subSection?.createdByUser.toString() !== req.user?._id.toString()
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
