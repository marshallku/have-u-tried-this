import multer, { MulterError } from "multer";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

function fileFilter(req, file, cb) {
  const imageType = [
    "image/apng",
    "image/bmp",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/tiff",
    "image/webp",
  ];
  const fileType = file.mimetype;
  if (imageType.includes(fileType)) {
    cb(null, true);
  } else {
    cb("이미지 파일만 업로드 가능합니다.");
  }
}

export default function uploadFile(req, res, next) {
  const upload = multer({
    storage: multer.diskStorage({
      destination(_req, file, cb) {
        cb(null, process.env.UPLOAD_PATH);
      },
      fileName(_req, file, cb) {
        cb(null, `${new Date().valueOf()}${path.extname(file.originalname)}`);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter,
  }).array("photos", 4);

  upload(req, res, (err) => {
    if (err instanceof MulterError) {
      next(err.message);
    } else if (err) {
      next(err);
    }
    next();
  });
}
