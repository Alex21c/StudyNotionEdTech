import passport from "./Passport/passport-config.mjs";
import e from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import UserRoute from "./Routes/UserRoute.mjs";
import CourseRoute from "./Routes/CourseRoute.mjs";
import SubSectionRoute from "./Routes/SubSectionRoute.mjs";
import SectionRoute from "./Routes/SectionRoute.mjs";
import RatingsAndReviewsRoute from "./Routes/RatingsAndReviewsRoute.mjs";
import InvoiceRoute from "./Routes/InvoiceRoute.mjs";
import fs from "fs";
// Check if the upload directory exists, if not, create it
const uploadDir = "Uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Upload directory created at ${uploadDir}`);
}

const PORT = process.env.PORT || 4000;
const app = e();
// Req logging
app.use(morgan("dev"));
// Making connection with DB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Connection Established with Database!");
  })
  .catch((err) => {
    console.log("Unable to connect to DB!");
    console.log("Exiting...");
    process.exit(1);
  });

// cors
const corsOptions = {
  origin: (origin, callback) => {
    if (
      !origin ||
      origin.includes("localhost:3000") ||
      origin.includes("https://study-notion-edtech.vercel.app")
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  allowedHeaders: ["Authorization", "Content-Type"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// allow me to export json from body
app.use(e.json());

// linking passport
app.use(passport.initialize());

// Routes
app.use("/api/v1/user", UserRoute);
app.use("/api/v1/course", CourseRoute);
app.use("/api/v1/sub-section", SubSectionRoute);
app.use("/api/v1/section", SectionRoute);
app.use("/api/v1/ratings-and-reviews", RatingsAndReviewsRoute);
app.use("/api/v1/invoices", InvoiceRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error!",
  });
});

app.listen(PORT, () => {
  console.log(`SERVER is up and running at port ${PORT}`);
});
