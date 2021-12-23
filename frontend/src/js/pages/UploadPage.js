import el from "../utils/dom";
import toast from "../utils/toast";
import { debounce } from "../utils/optimize";
import { checkLock, lock } from "../router/lock";
import { getWideAddrLocalAddr } from "../utils/gps";
import "../../css/UploadImage.css";

const MAX_UPLOAD_IMAGES = 4;
const IMAGE_TYPES = [
  "image/apng",
  "image/bmp",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/tiff",
  "image/webp",
];
const MEGA_BYTES = 20;
const BASE_UNIT = 1024;
const MAXIMUM_IMAGE_SIZE = MEGA_BYTES * BASE_UNIT * BASE_UNIT;

export default function UploadPage() {
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

  const updateLocation = (wideAddr, localAddr) => {
    const input = document.getElementById("image-upload-location");
    input.value = `${wideAddr} ${localAddr}`;
  };

  const isValidSize = (fileSize) => MAXIMUM_IMAGE_SIZE > fileSize;

  const isValidType = (fileType) =>
    IMAGE_TYPES.filter((imageType) => imageType === fileType).length >= 1;

  const handleUpdate = (filesInfo) => {
    const fileList = [...filesInfo];
    const validTypeList = fileList
      .filter((file) => isValidType(file.type))
      .filter((file) => isValidSize(file.size));

    const preview = document.querySelector(".image-content__preview");

    if (filesInfo.length > MAX_UPLOAD_IMAGES) {
      toast(`사진은 최대 ${MAX_UPLOAD_IMAGES}장까지 올릴 수 있습니다.`);
      return;
    }

    validTypeList.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", async (event) => {
        const img = embedImgElement(event);
        lock();

        try {
          const { wideAddr, localAddr } = await getWideAddrLocalAddr(img);
          updateLocation(wideAddr, localAddr);
        } catch (error) {
          toast("GPS정보를 찾을 수 없습니다. 사진 촬영 장소를 입력해주세요.");
        }

        const imgDiv = wrapperElement("div", "grid-div__image", img);
        const div = wrapperElement("div", "grid-div", imgDiv);
        preview.append(div);
      });
      reader.readAsDataURL(file);
    });

    preview.classList.remove("image-content__preview--hidden");
    document.getElementById("label")?.remove();
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
        el("div", {
          className: "image-content__preview image-content__preview--hidden",
        }),
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

                label.classList.add("image-content__label--hovered");
              },

              mouseout: (event) => {
                preventEvent(event);
                const label = document.getElementById("label");

                label.classList.remove("image-content__label--hovered");
              },

              dragover: (event) => {
                preventEvent(event);
                const label = document.getElementById("label");

                label.classList.add("image-content__label--hovered");
              },
              dragleave: (event) => {
                preventEvent(event);
                const label = document.getElementById("label");

                label.classList.remove("image-content__label--hovered");
              },
              drop: (event) => {
                preventEvent(event);
                const label = document.getElementById("label");
                const fileInfo = event.dataTransfer.files;

                label.classList.remove("image-content__label--hovered");
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
          { className: "image-content__info" },
          el("input", {
            className: "image-content__title",
            type: "text",
            name: "title",
            placeholder: "게시글 제목",
            events: {
              input: debounce((event) => {
                checkLock(event);
              }),
            },
          }),
          el("textarea", {
            className: "image-content__desc",
            name: "description",
            placeholder: "게시글 설명",
            events: {
              input: debounce((event) => {
                checkLock(event);
              }),
            },
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
