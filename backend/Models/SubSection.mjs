import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const SubSectionSchema = new Schema(
  {
    title: { type: String, required: true },
    timeDuration: { type: String, required: true, default: null },
    description: { type: String, required: true },
    video: { type: Map, of: String },
    belongsToCourseId: {
      type: Types.ObjectId,
      ref: "courses",
      required: true,
      default: null,
    },
    belongsToSectionId: {
      type: Types.ObjectId,
      ref: "sections",
      required: true,
      default: null,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdByUser: {
      type: Types.ObjectId,
      ref: "users",
      required: true,
    },
    isFreePreviewAvailableForGuests: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const SubSectionModel = mongoose.model("sub-sections", SubSectionSchema);
export default SubSectionModel;
