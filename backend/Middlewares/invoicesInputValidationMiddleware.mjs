import SubSectionModel from "../Models/SubSection.mjs";
import SectionModel from "../Models/Section.mjs";
import mongoose from "mongoose";
import CustomError from "../Utils/CustomError.mjs";
import CoursesModel from "../Models/courses.mjs";
import invoicesModel from "../Models/invoices.mjs";

export const InvoicesInputValidationMiddleware = async (req, res, next) => {
  try {
    let action = req.url.split("/").at(-1);
    // in case there is query string
    if (action.includes("?")) {
      action = action.split("?").at(0);
    }

    if (action === "generate-new-invoice") {
      // is courseId valid?
      const { purchasedCourseId } = req?.body;
      if (!mongoose.isValidObjectId(purchasedCourseId)) {
        throw new Error(`Invalid Course ID: ${purchasedCourseId}`);
      }
      const course = await CoursesModel.findById(purchasedCourseId);
      if (!course) {
        return next(
          new CustomError(400, `Course (${purchasedCourseId}) not found !`)
        );
      }
      req.course = course;
    }

    if (action === "delete-invoice") {
      const { invoiceId } = req.query;
      // is it valid?
      if (!mongoose.isValidObjectId(invoiceId)) {
        throw new Error(`Invalid invoiceId: ${invoiceId}`);
      }
      const invoice = await invoicesModel.findById(invoiceId);
      if (!invoice) {
        return next(new CustomError(400, `invoice (${invoiceId}) not found !`));
      }
      req.invoice = invoice;

      // authorization?
      // is the user Administrator
      if (req?.user?.role.toLowerCase() !== "administrator") {
        return next(
          new CustomError(
            400,
            "Not Allowed: Only Administrators are allowed to delete invoices!"
          )
        );
      }
    }

    next();
  } catch (error) {
    return next(new CustomError(400, error.message));
  }
};
