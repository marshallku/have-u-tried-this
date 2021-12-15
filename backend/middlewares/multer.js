const multer = require("multer");

function fileFilter(req, file, cb) {
  let fileType = file.mimetype.split("/")[1];
  if (fileType == "jpg" || fileType == "png" || fileType == "jpeg") {
    cb(null, true);
  } else {
    cb("jpg, jpeg, png 파일만 업로드 가능합니다.");
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
