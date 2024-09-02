import multer from "multer";
import { nanoid } from "nanoid";
import "dotenv/config";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = nanoid(9) + "." + file.originalname.split(".").at(-1);
    const newName = file.originalname.split(".").at(0) + "-" + nanoid(21);
    cb(null, newName);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept files only if they are images
  if (!file.mimetype.startsWith("video/")) {
    return cb(new Error("Only video files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize:
      Number(process.env.MAX_ALLOWED_VIDEO_FILE_UPLOAD_SIZE_IN_KB) * 1024,
  },
});

const multerUploadMiddlewareVideos = upload.single("video");

export default multerUploadMiddlewareVideos;
