import multer, { MulterError } from "multer";

function fileFilter(req, file, cb) {
  const fileType = file.mimetype.split("/")[0];
  if (fileType === "image") {
    cb(null, true);
  } else {
    cb("이미지 파일만 업로드 가능합니다.");
  }
}

export default function uploadFile(req, res, next) {
  const upload = multer({
    dest: "public/uploads/",
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter,
  }).array("pictures", 4);

  upload(req, res, (err) => {
    if (err instanceof MulterError) {
      next(err.message);
    } else if (err) {
      next(err);
    }
    next();
  });
}
