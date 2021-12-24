import el from "../utils/dom";
import toast from "../utils/toast";
import { debounce } from "../utils/optimize";
import { checkLock, lock, unlock } from "../router/lock";
import { getWideAddrLocalAddr } from "../utils/gps";
import WordAutoComplete from "../components/WordAutoComplete";
import { postData } from "../api/post";
import { updatePath } from "../router";
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
  const preventEvent = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const updateLocation = (wideAddr, localAddr) => {
    const location = document.getElementById("location");
    location.value = `${wideAddr} ${localAddr}`;
  };

  const isValidType = (fileType) =>
    IMAGE_TYPES.filter((imageType) => imageType === fileType).length >= 1;

  const isValidSize = (fileSize) => MAXIMUM_IMAGE_SIZE > fileSize;

  const moreUpdate = (fileInfo, id) => {
    const file = [...fileInfo];
    const [validFile] = file
      .filter((item) => isValidType(item.type))
      .filter((item) => isValidSize(item.size));

    if (!validFile) {
      toast("이미지가 규격에 맞지 않습니다. 다른 이미지를 올려주세요.");
      return;
    }

    const parents = document.querySelector(`.grid-div__${id}`);
    parents.removeChild(parents.firstElementChild);

    const reader = new FileReader();

    reader.addEventListener("load", async (event) => {
      const img = el("img", {
        className: "embed-image",
        src: event.target.result,
      });

      try {
        const { wideAddr, localAddr } = await getWideAddrLocalAddr(img);
        updateLocation(wideAddr, localAddr);
      } catch (error) {
        const location = document.getElementById("location");
        if (!location.value) {
          toast("GPS정보를 찾을 수 없습니다. 사진 촬영 장소를 입력해주세요.");
        }
      }

      const imgContainer = el("div", { className: "grid-div__image" }, img);
      parents.append(imgContainer);
    });
    reader.readAsDataURL(validFile);
  };

  const emptyBox = (id) =>
    el(
      "div",
      {
        className: `grid-div__${id}`,
      },
      el(
        "label",
        {
          className: "grid-div__image grid-div__image--cursor",
          for: `empty-input__${id}`,
        },
        el(
          "div",
          {
            className: "empty-div",
            events: {
              change: (event) => {
                const fileInfo = event.target.files;
                moreUpdate(fileInfo, id);
              },
            },
          },
          el("input", {
            className: "empty-box__input",
            id: `empty-input__${id}`,
            type: "file",
          }),
          el("i", {
            className: "icon-add_circle",
          }),
        ),
      ),
    );

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

    let currentIndex = 0;
    validTypeList.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", async (event) => {
        const img = el("img", {
          className: "embed-image",
          src: event.target.result,
        });
        lock();

        try {
          const { wideAddr, localAddr } = await getWideAddrLocalAddr(img);
          updateLocation(wideAddr, localAddr);
        } catch (error) {
          toast("GPS정보를 찾을 수 없습니다. 사진 촬영 장소를 입력해주세요.");
        }

        const imgContainer = el(
          "div",
          { className: "grid-div" },
          el(
            "div",
            {
              className: "grid-div__image",
            },
            img,
          ),
        );
        preview.append(imgContainer);

        currentIndex += 1;

        if (currentIndex === fileList.length) {
          const emptyBoxLimit = MAX_UPLOAD_IMAGES - currentIndex;
          for (let i = 0; i < emptyBoxLimit; i += 1) {
            preview.append(emptyBox(i + 1));
          }
        }
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
        method: "post",
        enctype: "multipart/form-data",
      },
      el(
        "div",
        { className: "image-content" },
        el("div", {
          className: "image-content__preview image-content__preview--hidden",
          id: "preview",
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
          ),
        ),
        el("input", {
          id: "image-upload-images",
          className: "image-content__input",
          name: "photos",
          accept: "image/*",
          type: "file",
          required: true,
          multiple: true,
          hidden: true,
          events: {
            change: (event) => {
              const filesInfo = event.target.files;
              handleUpdate(filesInfo);
            },
          },
        }),
        el(
          "div",
          { className: "image-upload__gps" },
          WordAutoComplete({
            formAttr: {},
            inputAttr: {
              type: "text",
              id: "location",
              className: "image-upload__location",
              list: "address",
              placeholder: "사진 촬영 장소",
              required: true,
              autocomplete: "off",
            },
            onSubmit: {},
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
            required: true,
            autocomplete: "off",
            spellcheck: "false",
            events: {
              input: debounce((event) => {
                checkLock(event);
              }),
            },
          }),
          el("textarea", {
            className: "image-content__desc",
            name: "contents",
            placeholder: "게시글 설명",
            required: true,
            autocomplete: "off",
            spellcheck: "false",
            events: {
              input: debounce((event) => {
                checkLock(event);
              }),
            },
          }),
        ),
        el(
          "button",
          {
            className: "image-content__submit",
            type: "submit",
            events: {
              click: async (event) => {
                event.preventDefault();
                const location = document.getElementById("location");
                const [wideAddr, localAddr] = location.value.split(" ");

                const form = document.getElementById("form");
                const formData = new FormData(form);
                formData.append("wideAddr", wideAddr);
                formData.append("localAddr", localAddr);

                const response = await postData(formData);
                if (response && !response.error) {
                  unlock();
                  updatePath(`/post/${response.id}`);
                } else {
                  toast(response.message);
                }
              },
            },
          },
          "제출",
        ),
      ),
    ),
  );
}
