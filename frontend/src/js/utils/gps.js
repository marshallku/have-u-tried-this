import EXIF from "exif-js";
import { MINUTE_TO_SECOND, HOUR_TO_SECOND } from "./time";
import { getAddressAPI } from "../api";

export const POSITIVE_VALUE = 1;
export const NEGATIVE_VALUE = -1;

export function getGPSTag(img) {
  return {
    latitude: EXIF.getTag(img, "GPSLatitude"),
    latitudeRef: EXIF.getTag(img, "GPSLatitudeRef"),
    longitude: EXIF.getTag(img, "GPSLongitude"),
    longitudeRef: EXIF.getTag(img, "GPSLongitudeRef"),
  };
}

export function getCoordinateSign(direction) {
  return direction === "E" || direction === "N"
    ? POSITIVE_VALUE
    : NEGATIVE_VALUE;
}

export function calculateDegreeToDecimal(coordinate, sign) {
  const [degrees, minutes, seconds] = coordinate;
  return (
    sign *
    (degrees + minutes / MINUTE_TO_SECOND + seconds / HOUR_TO_SECOND).toFixed(8)
  );
}

export function getDecimalCoordinate(coordinate) {
  const {
    latitudeInfo: { latitude, latitudeRef },
  } = coordinate;
  const {
    longitudeInfo: { longitude, longitudeRef },
  } = coordinate;

  const latitudeSign = getCoordinateSign(latitudeRef);
  const latitudeDecimal = calculateDegreeToDecimal(latitude, latitudeSign);
  const longitudeSign = getCoordinateSign(longitudeRef);
  const longitudeDecimal = calculateDegreeToDecimal(longitude, longitudeSign);

  return {
    latitudeDecimal,
    longitudeDecimal,
  };
}

export function getGPSCoordinate(img) {
  return new Promise((resolve, reject) => {
    img.addEventListener("load", () => {
      EXIF.getData(img, () => {
        const { latitude, latitudeRef, longitude, longitudeRef } =
          getGPSTag(img);

        if (latitude === undefined || longitude === undefined) {
          reject(
            new Error("GPS 정보가 없습니다. 사진 촬영 장소를 입력해주세요."),
          );
          return;
        }

        const coordinate = {
          latitudeInfo: {
            latitude,
            latitudeRef,
          },
          longitudeInfo: {
            longitude,
            longitudeRef,
          },
        };

        const { latitudeDecimal, longitudeDecimal } =
          getDecimalCoordinate(coordinate);

        resolve({
          latitude: latitudeDecimal,
          longitude: longitudeDecimal,
        });
      });
    });
  });
}

export async function getWideAddrLocalAddr(img) {
  try {
    const { longitude, latitude } = await getGPSCoordinate(img);
    const { wideAddr, localAddr } = await getAddressAPI(longitude, latitude);
    return { wideAddr, localAddr };
  } catch (error) {
    return error(error);
  }
}
