import "../../css/UploadImage.css";
import toast from "../utils/toast";
import { fetchAddressAPI } from "../api";
import EXIF from "exif-js";

export default function UploadPage() {
  const container = document.createElement("section");
  const form = document.createElement("form");
  const imageContent = document.createElement("div");
  const imageContentPreview = document.createElement("div");
  const imageUploadGPS = document.createElement("div");
  const imageUploadInput = document.createElement("input");
  const dataList = document.createElement("datalist");
  const imageContentCompleteBox = document.createElement("div");
  const imageContentLabel = document.createElement("label");
  const imageContentInner = document.createElement("div");
  const imageContentText = document.createElement("div");
  const imageContentInput = document.createElement("input");
  const imageContentInfo = document.createElement("div");
  const imageContentTitle = document.createElement("input");
  const imageContentDesc = document.createElement("textarea");
  const submitBtn = document.createElement("button");

  const wrapperElement = (inner, element, className) => {
    const el = document.createElement(`${element}`);
    el.classList.add(`${className}`);
    el.append(inner);
    return el;
  };

  const createImgWithEvent = (event) => {
    const img = document.createElement("img");
    img.classList.add("imgStyle");
    img.src = event.target.result;
    return img;
  };

  const changeStyleAttribute = (querySelector, attribute, value) => {
    const el = document.querySelector(`${querySelector}`);
    el.style[`${attribute}`] = `${value}`;
  };

  const handleUpdate = (filesInfo) => {
    const fileList = [...filesInfo];
    const preview = document.querySelector(".image-content__preview");

    if (filesInfo.length > 4) {
      toast("사진은 최대 4장까지 올릴 수 있습니다.");
      return;
    }

    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", async (event) => {
        const img = createImgWithEvent(event);

        try {
          const { longitude, latitude } = await getGPSCoordinate(img);
          const { wideAddr, localAddr } = await fetchAddressAPI(
            longitude,
            latitude,
          );
          updateLocation(wideAddr, localAddr);
        } catch (e) {
          console.log(e);
        }

        const imgDiv = wrapperElement(img, "div", "imgDivStyle");
        const div = wrapperElement(imgDiv, "div", "divStyle");
        preview.append(div);
      });
      reader.readAsDataURL(file);
    });

    changeStyleAttribute(".image-content__label", "display", "none");
    changeStyleAttribute(".image-content__completeBox", "display", "block");
  };

  const getGPSTag = (library = EXIF, img) => {
    return {
      latitude: library.getTag(img, "GPSLatitude"),
      latitudeRef: library.getTag(img, "GPSLatitudeRef"),
      longitude: library.getTag(img, "GPSLongitude"),
      longitudeRef: library.getTag(img, "GPSLongitudeRef"),
    };
  };

  const getGPSCoordinate = (img) => {
    return new Promise((resolve, reject) => {
      img.addEventListener("load", function () {
        EXIF.getData(this, function () {
          const { latitude, latitudeRef, longitude, longitudeRef } = getGPSTag(
            EXIF,
            this,
          );

          if (latitude === undefined || longitude === undefined) {
            reject("GPS 정보가 없습니다.");
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

  const getCoordinateSign = (direction) => {
    return direction === "E" || direction === "N" ? 1 : -1;
  };

  const calculateDegreeToDecimal = (coordinate, sign) => {
    const [degrees, minutes, seconds] = coordinate;
    return sign * (degrees + minutes / 60 + seconds / 3600).toFixed(8);
  };

  const updateLocation = (wideAddr, localAddr) => {
    const input = document.querySelector("#image-upload__input");
    input.value = `${wideAddr} ${localAddr}`;
  };

  const preventEvent = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  // image upload
  imageContentInput.addEventListener("change", (e) => {
    const filesInfo = e.target.files;
    handleUpdate(filesInfo);
  });

  // image drag & drop
  imageContentLabel.addEventListener("dragover", (e) => {
    preventEvent(e);
    changeStyleAttribute(".image-content__label", "backgroundColor", "#616161");
  });

  imageContentLabel.addEventListener("dragleave", (e) => {
    preventEvent(e);
    changeStyleAttribute(".image-content__label", "backgroundColor", "#434343");
  });

  imageContentLabel.addEventListener("drop", (e) => {
    preventEvent(e);
    const fileInfo = e.dataTransfer.files;
    changeStyleAttribute(".image-content__label", "backgroundColor", "#434343");
    handleUpdate(fileInfo);
  });

  // container
  container.classList.add("container");
  form.classList.add("image-form");
  form.method = "post";
  form.action = "/post/tmp";
  imageContent.classList.add("image-content");
  submitBtn.innerText = "제출";
  submitBtn.classList.add("image-content__submit");

  // preview
  imageContentPreview.classList.add("image-content__preview");

  // upload
  imageUploadGPS.classList.add("image-upload__gps");
  imageUploadInput.classList.add("image-upload__input");
  imageUploadInput.type = "text";
  imageUploadInput.setAttribute("list", "address");
  imageUploadInput.id = "image-upload__input";
  imageUploadInput.name = "image-upload__input";
  imageUploadInput.placeholder = "사진 촬영 장소";
  dataList.classList.add("image-content__datalist");
  dataList.id = "address";
  imageUploadGPS.append(imageUploadInput, dataList);

  // completeBox
  imageContentCompleteBox.classList.add("image-content__completeBox");
  imageContentCompleteBox.innerText = "✅ 사진 업로드 완료";

  // drag & drop
  imageContentLabel.classList.add("image-content__label");
  imageContentLabel.for = "#image-content__label";
  imageContentInner.classList.add("image-content__inner");
  imageContentText.classList.add("image-content__text");
  imageContentText.innerText = "드래그하거나 클릭하여 업로드";
  imageContentInput.classList.add("image-content__input");
  imageContentInput.id = "image-content__input";
  imageContentInput.name = "image-content__input";
  imageContentInput.accept = "image/*";
  imageContentInput.type = "file";
  imageContentInput.required = true;
  imageContentInput.multiple = true;
  imageContentText.append(imageContentInput);
  imageContentInner.append(imageContentText);
  imageContentLabel.append(imageContentInner);

  // info
  imageContentInfo.classList.add("image-content__info");
  imageContentTitle.classList.add("image-content__title");
  imageContentTitle.type = "text";
  imageContentTitle.name = "image-content__title";
  imageContentTitle.placeholder = "게시글 제목";
  imageContentDesc.classList.add("image-content__desc");
  imageContentDesc.name = "image-content__desc";
  imageContentDesc.maxLength = "100";
  imageContentDesc.placeholder = "게시글 설명(100자 이내)";
  imageContentInfo.append(imageContentTitle, imageContentDesc);

  // image content
  imageContent.append(imageContentPreview, imageUploadGPS);
  imageContent.append(imageContentCompleteBox, imageContentLabel);
  imageContent.append(imageContentInfo);

  // append
  form.append(imageContent, submitBtn);
  container.append(form);

  return container;
}
