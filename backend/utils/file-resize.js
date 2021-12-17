import sharp from "sharp";
import path from "path";
import { writeFile } from "fs";

export default (files) => {
  // eslint-disable-next-line no-underscore-dangle
  const __dirname = path.resolve();

  files.forEach((file) => {
    const filePath = path.join(__dirname, "public/uploads", file.filename);

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
};
