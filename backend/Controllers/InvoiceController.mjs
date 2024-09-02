import CustomError from "../Utils/CustomError.mjs";
import CloudinaryHelper from "../Utils/CloudinaryHelper.mjs";
import RatingsAndReviewsModel from "../Models/ratingsAndReview.mjs";
import "dotenv/config";
import mongoose from "mongoose";
import CoursesModel from "../Models/courses.mjs";
import invoicesModel from "../Models/invoices.mjs";
const generateNewInvoice = async (req, res, next) => {
  try {
    req.body.purchasedByUser = req.user?.id;
    const doc = new invoicesModel(req.body);
    await doc.save();
    // add current user id to studentsEnrolled insides courses
    req.course.studentsEnrolled.push(req.user?._id);
    await req.course.save();
    // add current user to coursesEnrolledIn
    req.user.coursesEnrolledIn.push(req.body?.purchasedCourseId);
    await req.user.save();
    res.status(201).json({
      success: true,
      data: doc,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};
const deleteInvoice = async (req, res, next) => {
  try {
    // remove current user id to studentsEnrolled insides courses
    const course = await CoursesModel.findById(req?.invoice?.purchasedCourseId);
    course.enrolledStudents = course.studentsEnrolled.filter(
      (studentId) => studentId.toString() !== req.user?._id.toString()
    );
    await course.save();

    // remove current user to coursesEnrolledIn
    req.user.coursesEnrolledIn = req.user.coursesEnrolledIn.filter(
      (studentId) => studentId.toString() !== req.user?._id.toString()
    );
    await req.user.save();

    // now delete the invoice
    await req.invoice.deleteOne();

    res.status(201).json({
      success: true,
      data: "Invoice Deleted Successfully !",
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError(500, error.message));
  }
};

const InvoiceController = {
  generateNewInvoice,
  deleteInvoice,
};
export default InvoiceController;
