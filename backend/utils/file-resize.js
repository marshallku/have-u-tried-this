import sharp from "sharp";
import path from "path";
import dotenv from "dotenv";
import { writeFile } from "fs";

dotenv.config();

export default async function resizeFile(files) {
  files.forEach((file) => {
    const filePath = path.join(process.env.UPLOAD_PATH, file.filename);

    sharp(filePath)
      .resize({ width: 1080 })
      .withMetadata()
      .toBuffer((err1, buffer) => {
        if (err1) throw err1;
        writeFile(filePath, buffer, (err2) => {
          if (err2) throw err2;
        });
      });
  });
}
