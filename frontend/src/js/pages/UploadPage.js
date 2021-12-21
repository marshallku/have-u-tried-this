import EXIF from "exif-js";
import el from "../utils/dom";
import toast from "../utils/toast";
import { fetchAddressAPI } from "../api";
import "../../css/UploadImage.css";

export default function UploadPage() {
  const MAX_UPLOAD_IMAGES = 4;
  const SECONDS_PER_MINUTE = 60;
  const SECONDS_PER_HOUR = 3600;
  const POSITIVE_VALUE = 1;
  const NEGATIVE_VALUE = -1;

  const wrapperElement = (
    element,
    className,
    inner = document.createElement("div"),
  ) => {
    const elt = document.createElement(element);
    elt.classList.add(className);
    elt.append(inner);
    return elt;
  };

  const embedImgElement = (event) => {
    const img = wrapperElement("img", "embed-image");
    img.src = event.target.result;
    return img;
  };

  const preventEvent = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const getGPSTag = (img) => ({
    latitude: EXIF.getTag(img, "GPSLatitude"),
    latitudeRef: EXIF.getTag(img, "GPSLatitudeRef"),
    longitude: EXIF.getTag(img, "GPSLongitude"),
    longitudeRef: EXIF.getTag(img, "GPSLongitudeRef"),
  });

  const getCoordinateSign = (direction) =>
    direction === "E" || direction === "N" ? POSITIVE_VALUE : NEGATIVE_VALUE;

  const calculateDegreeToDecimal = (coordinate, sign) => {
    const [degrees, minutes, seconds] = coordinate;
    return (
      sign *
      (
        degrees +
        minutes / SECONDS_PER_MINUTE +
        seconds / SECONDS_PER_HOUR
      ).toFixed(8)
    );
  };

  const getDecimalCoordinate = (coordinate) => {
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
  };

  const getGPSCoordinate = (img) =>
    new Promise((resolve, reject) => {
      img.addEventListener("load", () => {
        EXIF.getData(img, () => {
          const { latitude, latitudeRef, longitude, longitudeRef } =
            getGPSTag(img);

          if (latitude === undefined || longitude === undefined) {
            reject(new Error("GPS 정보가 없습니다."));
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

  const updateLocation = (wideAddr, localAddr) => {
    const input = document.getElementById("image-upload-location");
    input.value = `${wideAddr} ${localAddr}`;
  };

  const handleUpdate = (filesInfo) => {
    const fileList = [...filesInfo];
    const preview = document.querySelector(".image-content__preview");

    if (filesInfo.length > MAX_UPLOAD_IMAGES) {
      toast(`사진은 최대 ${MAX_UPLOAD_IMAGES}장까지 올릴 수 있습니다.`);
      return;
    }

    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", async (event) => {
        const img = embedImgElement(event);

        try {
          const { longitude, latitude } = await getGPSCoordinate(img);
          const { wideAddr, localAddr } = await fetchAddressAPI(
            longitude,
            latitude,
          );
          updateLocation(wideAddr, localAddr);
        } catch (error) {
          console.log(error);
        }

        const imgDiv = wrapperElement("div", "grid-div__image", img);
        const div = wrapperElement("div", "grid-div", imgDiv);
        preview.append(div);
      });
      reader.readAsDataURL(file);
    });

    const completeBox = document.querySelector(".image-content__completeBox");
    label.style.display = "none";
    completeBox.style.display = "block";
  };

  return el(
    "section",
    { className: "container" },
    el(
      "form",
      {
        id: "form",
        className: "image-form",
        method: "POST",
      },
      el(
        "div",
        { className: "image-content" },
        el("div", { className: "image-content__preview" }),
        el(
          "div",
          { className: "image-upload__gps" },
          el("input", {
            id: "image-upload-location",
            className: "image-upload__input",
            type: "text",
            list: "address",
            name: "location",
            placeholder: "사진 촬영 장소",
            autocomplete: "off",
          }),
          el("datalist", {
            className: "image-upload_datalist",
            id: "address",
          }),
        ),
        el(
          "div",
          { className: "image-content__completeBox" },
          "✅ 사진 업로드 완료",
        ),

        el(
          "label",
          {
            id: "label",
            className: "image-content__label",
            for: "image-upload-images",
            events: {
              mouseover: (event) => {
                preventEvent(event);
                const label = document.getElementById("label");
                label.classList.remove("image-content__label");
                label.classList.add("image-content__label--status");
              },

              mouseout: (event) => {
                preventEvent(event);
                const label = document.getElementById("label");
                label.classList.remove("image-content__label--status");
                label.classList.add("image-content__label");
              },

              dragover: (event) => {
                preventEvent(event);
                const label = document.getElementById("label");
                label.classList.remove("image-content__label");
                label.classList.add("image-content__label--status");
              },
              dragleave: (event) => {
                preventEvent(event);
                const label = document.getElementById("label");
                label.classList.remove("image-content__label--status");
                label.classList.add("image-content__label");
              },
              drop: (event) => {
                preventEvent(event);
                const label = document.getElementById("label");
                label.classList.remove("image-content__label--status");
                label.classList.add("image-content__label");
                const fileInfo = event.dataTransfer.files;
                handleUpdate(fileInfo);
              },
            },
          },
          el(
            "div",
            { className: "image-content__inner" },
            el(
              "div",
              { className: "image-content__text" },
              "드래그하거나 클릭하여 업로드",
            ),
            el("input", {
              id: "image-upload-images",
              className: "image-content__input",
              name: "images",
              accept: "image/*",
              type: "file",
              required: true,
              multiple: true,
              events: {
                change: (event) => {
                  const filesInfo = event.target.files;
                  handleUpdate(filesInfo);
                },
              },
            }),
          ),
        ),
        el(
          "div",
          { className: "image-content__info" },
          el("input", {
            className: "image-content__title",
            type: "text",
            name: "title",
            placeholder: "게시글 제목",
          }),
          el("textarea", {
            className: "image-content__desc",
            name: "description",
            placeholder: "게시글 설명",
          }),
        ),
      ),
      el(
        "button",
        {
          className: "image-content__submit",
          type: "submit",
          events: {
            submit: (event) => {
              console.log(event);
              event.preventDefault();
            },
          },
        },
        "제출",
      ),
    ),
  );
}
