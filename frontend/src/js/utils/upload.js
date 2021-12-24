export const IMAGE_TYPES = [
  "image/apng",
  "image/bmp",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/tiff",
  "image/webp",
];

export const MEGA_BYTES = 20;
export const BASE_UNIT = 1024;
export const MAXIMUM_IMAGE_SIZE = MEGA_BYTES * BASE_UNIT * BASE_UNIT;
export const MAX_UPLOAD_IMAGES = 4;

export const isValidType = (fileType) =>
  IMAGE_TYPES.filter((imageType) => imageType === fileType).length >= 1;

export const isValidSize = (fileSize) => MAXIMUM_IMAGE_SIZE > fileSize;
