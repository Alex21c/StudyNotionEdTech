import mongoose from "mongoose";
const ratingsAndReview = new mongoose.Schema(
  {
    writtenByUser: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    belongsToCourseId: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
      required: true,
      default: null,
    },
    createdByUser: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const RatingsAndReviewsModel = mongoose.model(
  "ratings-and-reviews",
  ratingsAndReview
);
export default RatingsAndReviewsModel;
