exports.fileFilter = function (req, file, cb) {
  let fileType = file.mimetype.split("/")[1];
  if (fileType == "jpg" || fileType == "png" || fileType == "jpeg") {
    cb(null, true);
  } else {
    cb("jpg, jpeg, png 파일만 업로드 가능합니다.");
  }
};
