import mongoose from "mongoose";
const invoicesSchema = new mongoose.Schema(
  {
    purchasedByUser: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    courseName: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    pinCode: { type: String, required: true },
    purchasedCourseId: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
      required: true,
    },
  },
  { timestamps: true }
);

const invoicesModel = mongoose.model("invoices", invoicesSchema);
export default invoicesModel;
