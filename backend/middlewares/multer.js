const multer = require("multer");

function fileFilter(req, file, cb) {
  let fileType = file.mimetype.split("/")[0];
  if (fileType === "image") {
    cb(null, true);
  } else {
    cb("이미지 파일만 업로드 가능합니다.");
  }
}

module.exports = function uploadFile(req, res, next) {
  const upload = multer({
    dest: "public/uploads/",
    limits: { fileSize: 1024 * 1024 * 2 },
    fileFilter: fileFilter,
  }).array("pictures", 4);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      next(err.message);
    } else if (err) {
      next(err);
    }
    next();
  });
};
