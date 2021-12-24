import sharp from "sharp";
import path from "path";
import dotenv from "dotenv";
import { writeFileSync } from "fs";

dotenv.config();

export default async function resizeFile(files) {
  files.forEach((file) => {
    const filePath = path.join(process.env.UPLOAD_PATH, file.filename);

    sharp(filePath)
      .resize({ width: 1080 })
      .withMetadata()
      .toBuffer((err1, buffer) => {
        if (err1) throw err1;
        writeFileSync(filePath, buffer);
      });
  });
}
