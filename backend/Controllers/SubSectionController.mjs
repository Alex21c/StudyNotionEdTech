import CustomError from "../Utils/CustomError.mjs";
import CloudinaryHelper from "../Utils/CloudinaryHelper.mjs";
import SubSectionModel from "../Models/SubSection.mjs";
import fs from "fs";
import "dotenv/config";
import mongoose from "mongoose";
import SectionModel from "../Models/Section.mjs";

const createNewSubSection = async (req, res, next) => {
  try {
    req.body.createdByUser = req.user.id;
    const doc = new SubSectionModel(req.body);
    req.section.subSections.push(doc?._id);
    req.section.save();

    const videoFile = req?.file;
    if (videoFile) {
      try {
        const objCloudinary = new CloudinaryHelper();
        const response = await objCloudinary.uploadVideoFile(
          videoFile,
          `${process.env.PRJ_NAME || "study-notion-edtech"}/Course-${
            req.body.belongsToCourseId
          }/Section-${req.body.belongsToSectionId}/SubSection-${doc._id}`
        );
        if (!response) {
          throw new Error("failed to upload file");
        }

        const videoData = {
          public_id: response.public_id,
          url: response.secure_url,
        };
        doc.video = videoData;
        doc.timeDuration = response?.duration || null;
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
    await doc.save();

    // push sub-section to the section

    return res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    return next(new CustomError(500, error.message));
  }
};
const editSubSection = async (req, res, next) => {
  try {
    const videoFile = req?.file;
    if (videoFile) {
      try {
        const objCloudinary = new CloudinaryHelper();
        // delete existing video file from cloudinary if it exist?
        if (req.subSection?.video) {
          // check if there is an video then delete it from cloudinary
          const public_id = req.subSection?.video.get("public_id");
          try {
            if (public_id) {
              await objCloudinary.deleteVideoFile(public_id);
            }
          } catch (error) {
            console.log(error.message);
          }
        }

        // upload new video file

        const response = await objCloudinary.uploadVideoFile(
          videoFile,
          `${process.env.PRJ_NAME || "study-notion-edtech"}/Course-${
            req.subSection.belongsToCourseId
          }/Section-${req.subSection.belongsToSectionId}/SubSection-${
            req.subSection._id
          }`
        );
        if (!response) {
          throw new Error("failed to upload file");
        }
        const videoData = {
          public_id: response.public_id,
          url: response.secure_url,
        };
        req.subSection.video = videoData;
        req.subSection.timeDuration = response?.duration || null;
      } catch (error) {
        return next(
          new CustomError(
            500,
            "Failed to upload video file to server ! " + error.message
          )
        );
      } finally {
        // delete file from uploads dir
        setTimeout(() => {
          fs.unlinkSync(req.file.path);
        }, 2000);
      }
    }

    // update other fields
    if (req?.body?.title) {
      req.subSection.title = req.body.title;
    }

    if (req?.body?.description) {
      req.subSection.description = req.body.description;
    }
    if (req?.body?.isCompleted) {
      req.subSection.isCompleted = req.body.isCompleted;
    }

    req.subSection.save();

    return res.status(200).json({
      success: true,
      data: req.subSection,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};
const deleteSubSection = async (req, res, next) => {
  try {
    // remove sub-section from section
    const section = await SectionModel.findById(
      req.subSection.belongsToSectionId
    );
    section.subSections = section.subSections.filter(
      (subSectionId) =>
        subSectionId.toString() !== req.subSection?._id.toString()
    );
    await section.save();

    // first delete the video
    if (req.subSection?.video) {
      try {
        const objCloudinary = new CloudinaryHelper();
        const public_id = req.subSection?.video.get("public_id");
        try {
          if (public_id) {
            await objCloudinary.deleteVideoFile(public_id);
            // delete dir as well containing the video file
            const parts = public_id.split("/");
            parts.pop();
            parts.pop();
            const folderID = parts.join("/");
            await objCloudinary.deleteFolder(folderID);
          }
        } catch (error) {
          console.log(error.message);
        }
      } catch (error) {
        return next(
          new CustomError(
            500,
            "Failed to Delete video file from server ! " + error.message
          )
        );
      }
    }

    // now delete the document from mongoDB
    try {
      await req.subSection.deleteOne();
    } catch (error) {
      throw new Error("Failed to delete Sub Section ! ");
    }

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully !",
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};

const SubSectionController = {
  createNewSubSection,
  editSubSection,
  deleteSubSection,
};
export default SubSectionController;
