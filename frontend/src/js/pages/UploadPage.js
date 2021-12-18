import "../../css/UploadImage.css";
import toast from "../utils/toast";
import { fetchAddressAPI } from "../api/dummy";
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

  const Img = (event) => {
    const img = document.createElement("img");
    img.classList.add("imgStyle");
    img.src = event.target.result;
    return img;
  };

  const ImgDiv = (img) => {
    const div = document.createElement("div");
    div.classList.add("imgDivStyle");
    div.appendChild(img);
    return div;
  };

  const Div = (imgDiv) => {
    const div = document.createElement("div");
    div.classList.add("divStyle");
    div.append(imgDiv);
    return div;
  };

  const HiddenDropBox = () => {
    const dropBox = document.querySelector(".image-content__label");
    dropBox.style.display = "none";
  };

  const ShowCompleteBox = () => {
    const completeBox = document.querySelector(".image-content__completeBox");
    completeBox.style.display = "block";
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
        const img = Img(event);

        try {
          const [longitude, latitude] = await getGPSCoordinate(img);
          const [wide_addr, local_addr] = await fetchAddressAPI(
            latitude,
            longitude,
          );
          updateLocation(wide_addr, local_addr);
        } catch (e) {
          console.log(e);
        }

        const imgDiv = ImgDiv(img);
        const div = Div(imgDiv);
        preview.append(div);
      });
      reader.readAsDataURL(file);
    });
    HiddenDropBox();
    ShowCompleteBox();
  };

  function getGPSCoordinate(img) {
    return new Promise((resolve, reject) => {
      img.addEventListener("load", function () {
        EXIF.getData(this, async function () {
          const GPSLatitude = EXIF.getTag(this, "GPSLatitude");
          const GPSLatitudeRef = EXIF.getTag(this, "GPSLatitudeRef");
          const GPSLongitude = EXIF.getTag(this, "GPSLongitude");
          const GPSLongitudeRef = EXIF.getTag(this, "GPSLongitudeRef");

          if (GPSLatitude === undefined || GPSLongitude === undefined) {
            reject("GPS 정보가 없습니다.");
            return;
          }

          const [latitudeDecimal, longitudeDecimal] = [
            convertCoordinateToDecimal(GPSLatitude, GPSLatitudeRef),
            convertCoordinateToDecimal(GPSLongitude, GPSLongitudeRef),
          ];
          resolve([latitudeDecimal, longitudeDecimal]);
        });
      });
    });
  }

  function convertCoordinateToDecimal([d, m, s], direction) {
    const sign = direction === "S" || direction === "W" ? -1 : 1;
    return (sign * (d + m / 60 + s / 3600)).toFixed(8);
  }

  function updateLocation(wide_addr, local_addr) {
    const input = document.querySelector("#image-upload__input");
    input.value = `${wide_addr} ${local_addr}`;
  }

  // image upload
  imageContentInput.addEventListener("change", (e) => {
    const filesInfo = e.target.files;
    handleUpdate(filesInfo);
  });

  // image drag & drop
  imageContentLabel.addEventListener("dragover", (e) => {
    e.stopPropagation();
    e.preventDefault();
    imageContentLabel.style.backgroundColor = "#616161";
  });

  imageContentLabel.addEventListener("dragleave", (e) => {
    e.stopPropagation();
    e.preventDefault();
    imageContentLabel.style.backgroundColor = "#434343";
  });

  imageContentLabel.addEventListener("drop", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const fileInfo = e.dataTransfer.files;
    imageContentLabel.style.backgroundColor = "#434343";
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
