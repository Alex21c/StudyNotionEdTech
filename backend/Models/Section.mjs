import mongoose from "mongoose";
const sectionSchema = new mongoose.Schema({
  sectionName: { type: String, required: true },
  subSections: [
    {
      type: mongoose.Types.ObjectId,
      ref: "sub-sections",
    },
  ],
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
});

const SectionModel = mongoose.model("sections", sectionSchema);
export default SectionModel;
