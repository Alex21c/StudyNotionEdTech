import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    courseBenefits: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: "₹", required: true },
    thumbnail: { type: Map, of: String },
    instructors: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    courseContent: [
      {
        type: mongoose.Types.ObjectId,
        ref: "sections",
        required: true,
      },
    ],
    tags: [{ type: String }],

    studentsEnrolled: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
        default: null,
        required: true,
      },
    ],

    ratingsAndReviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "ratings-and-reviews",
      },
    ],
    createdByUser: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    language: {
      type: String,
      required: true,
      default: "English",
    },
  },
  { timestamps: true }
);

const CoursesModel = mongoose.model("courses", courseSchema);
export default CoursesModel;
