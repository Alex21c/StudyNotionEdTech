import CustomError from "../Utils/CustomError.mjs";
import "dotenv/config";
import mongoose, { mongo } from "mongoose";
import SectionModel from "../Models/Section.mjs";
import SubSectionModel from "../Models/SubSection.mjs";
import CoursesModel from "../Models/courses.mjs";
const createNewSection = async (req, res, next) => {
  try {
    req.body.createdByUser = req.user.id;
    const section = new SectionModel(req.body);
    // now push this section to the courseContent
    req.course.courseContent.push(section?._id);

    // save changes
    await section.save();
    await req.course.save();

    // return
    return res.status(201).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};
const deleteSection = async (req, res, next) => {
  try {
    // allowing section deletion, iff it is empty i.e. having no sub sections
    if (req.section?.subSections?.length > 0) {
      return next(
        new CustomError(
          400,
          "Section is not empty, kindly make sure all of the sub-sections are deleted first, only then Section can be deleted!"
        )
      );
    }

    // remove section from course content as well
    const course = await CoursesModel.findById(req.section?.belongsToCourseId);
    course.courseContent = course.courseContent.filter(
      (courseId) => courseId.toString() !== req.section?._id.toString()
    );
    course.save();

    // delete it
    await req.section.deleteOne();
    res.json({
      success: true,
      data: "Section Deleted Successfully !",
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};

const renameSection = async (req, res, next) => {
  try {
    if (req?.body?.sectionNewName) {
      req.section.sectionName = req?.body?.sectionNewName;
    }
    await req.section.save();
    res.json({
      sucess: true,
      message: "Section Renamed Successfully !",
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};
const addSubSections = async (req, res, next) => {
  try {
    const { subSections } = req?.body;

    // does sub sections exist?
    if (subSections) {
      for (let subSectionId of subSections) {
        if (!mongoose.isValidObjectId(subSectionId)) {
          return next(
            new CustomError(400, `Invalid Sub-Section ID: ${subSectionId}`)
          );
        }
        const subSection = await SubSectionModel.findById(subSectionId);
        if (!subSection) {
          return next(
            new CustomError(400, `subSection (${subSectionId}) not found !`)
          );
        }

        if (req.section.subSections.includes(subSectionId)) {
          return next(
            new CustomError(
              400,
              `subSection (${subSectionId}) already part of current section!`
            )
          );
        }
      }
    }
    // add subsections

    for (let subSectionId of subSections) {
      req.section.subSections.push(subSectionId);
    }
    await req.section.save();

    res.json({
      sucess: true,
      message: "Sections Added Successfully !",
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};
const removeSubSections = async (req, res, next) => {
  try {
    const { subSections } = req?.body;

    // does sub sections exist?
    if (subSections) {
      for (let subSectionId of subSections) {
        if (!mongoose.isValidObjectId(subSectionId)) {
          return next(
            new CustomError(400, `Invalid Sub-Section ID: ${subSectionId}`)
          );
        }
        const subSection = await SubSectionModel.findById(subSectionId);
        if (!subSection) {
          return next(
            new CustomError(400, `subSection (${subSectionId}) not found !`)
          );
        }

        if (!req.section.subSections.includes(subSectionId)) {
          return next(
            new CustomError(
              400,
              `subSection (${subSectionId}) is not part of current section!`
            )
          );
        }
      }
    }
    // add subsections
    const filteredSubSections = req.section.subSections.filter(
      (subSectionId) => {
        const subSectionIdStr = subSectionId.toString();
        return !subSections.includes(subSectionIdStr);
      }
    );

    req.section.subSections = filteredSubSections;
    await req.section.save();

    res.json({
      sucess: true,
      message: "Sections Removed  Successfully !",
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};

const SectionController = {
  createNewSection,
  deleteSection,
  renameSection,
  addSubSections,
  removeSubSections,
};
export default SectionController;
