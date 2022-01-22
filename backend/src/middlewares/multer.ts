import { Request, Response, NextFunction } from "express";
import multer, { MulterError, FileFilterCallback } from "multer";

import dotenv from "dotenv";
import path from "path";

dotenv.config();

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) {
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
    cb(new Error("이미지 파일만 업로드 가능합니다."));
  }
}

export default function uploadFile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const upload = multer({
    storage: multer.diskStorage({
      destination(_req, file, cb) {
        cb(null, process.env.UPLOAD_PATH);
      },
      filename(_req, file, cb) {
        cb(null, `${new Date().valueOf()}${path.extname(file.originalname)}`);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 20 },
    fileFilter,
  }).array("photos", 4);

  upload(req, res, (err: any) => {
    if (err instanceof MulterError) {
      next(err.message);
    } else if (err) {
      next(err);
    }
    next();
  });
}
