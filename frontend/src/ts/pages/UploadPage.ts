import el from "../utils/dom";
import toast from "../utils/toast";
import { debounce } from "../utils/optimize";
import { checkLock, lock, unlock } from "../router/lock";
import { getWideAddrLocalAddr } from "../utils/gps";
import WordAutoComplete from "../components/WordAutoComplete";
import { createPostData } from "../api/post";
import { updatePath } from "../router";
import { MAX_UPLOAD_IMAGES, isValidType, isValidSize } from "../utils/upload";
import "../../css/UploadImage.css";

export default function UploadPage() {
  const preventEvent = (event: Event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const updateLocation = (wideAddr: string, localAddr: string) => {
    const location = document.getElementById("location");
    if (location && location instanceof HTMLInputElement)
      location.value = `${wideAddr} ${localAddr}`;
  };

  const moreUpdate = (fileList: FileList | null, id: string) => {
    if (!fileList) return;
    const file = [...fileList];
    const [validFile] = file
      .filter((item) => isValidType(item.type))
      .filter((item) => isValidSize(item.size));

    if (!validFile) {
      toast("이미지가 규격에 맞지 않습니다. 다른 이미지를 올려주세요.");
      return;
    }

    const parents = document.querySelector(`.grid-div__${id}`);
    const firstChild = parents?.firstElementChild;
    firstChild && parents.removeChild(firstChild);

    const reader = new FileReader();

    reader.addEventListener("load", async (event) => {
      const img = el("img", {
        className: "embed-image",
        src: event.target?.result,
      });

      try {
        const { wideAddr, localAddr } = await getWideAddrLocalAddr(img);
        updateLocation(wideAddr, localAddr);
      } catch (error) {
        const location = document.getElementById("location");
        if (location && location instanceof HTMLInputElement && !location.value)
          toast("GPS정보를 찾을 수 없습니다. 사진 촬영 장소를 입력해주세요.");
      }

      const imgContainer = el("div", { className: "grid-div__image" }, img);
      parents?.append(imgContainer);
    });
    reader.readAsDataURL(validFile);
  };

  const emptyBox = (id: string) =>
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
          },
          el("i", {
            className: "icon-add_circle",
          }),
        ),
      ),
      el("input", {
        className: "empty-box__input",
        id: `empty-input__${id}`,
        type: "file",
        name: "photos",
        accept: "image/*",
        hidden: true,
        events: {
          change: (event: DragEvent) => {
            const { target } = event;
            if (!target || !(target instanceof HTMLInputElement)) return;
            const files = target.files;
            moreUpdate(files, id);
          },
        },
      }),
    );

  const handleUpdate = (fileList: FileList | null) => {
    if (!fileList) return;
    const files = [...fileList];
    const validTypeList = files
      .filter((file) => isValidType(file.type))
      .filter((file) => isValidSize(file.size));

    const preview = document.querySelector(".image-content__preview");

    if (fileList.length > MAX_UPLOAD_IMAGES) {
      toast(`사진은 최대 ${MAX_UPLOAD_IMAGES}장까지 올릴 수 있습니다.`);
      return;
    }

    let currentIndex = 0;
    validTypeList.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", async (event) => {
        const img = el("img", {
          className: "embed-image",
          src: event.target?.result,
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
        preview?.append(imgContainer);

        currentIndex += 1;

        if (currentIndex === files.length) {
          const emptyBoxLimit = MAX_UPLOAD_IMAGES - currentIndex;
          for (let i = 0; i < emptyBoxLimit; i += 1) {
            preview?.append(emptyBox(`${i + 1}`));
          }
        }
      });
      reader.readAsDataURL(file);
    });

    preview?.classList.remove("image-content__preview--hidden");
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
        el(
          "div",
          { className: "image-header-wrapper" },
          el("i", {
            className: "icon-utensil-spoon-solid",
          }),
          el("div", { className: "image-header" }, "맛식 등록"),
        ),
        el(
          "div",
          {
            className: "image-content__info",
          },
          el("input", {
            className: "image-content__title",
            type: "text",
            name: "title",
            placeholder: "맛식 제목을 입력해주세요",
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
          "label",
          {
            id: "label",
            className: "image-content__label",
            for: "image-upload-images",
            events: {
              mouseover: (event: MouseEvent) => {
                preventEvent(event);
                const label = document.getElementById("label");

                label?.classList.add("image-content__label--hovered");
              },

              mouseout: (event: MouseEvent) => {
                preventEvent(event);
                const label = document.getElementById("label");

                label?.classList.remove("image-content__label--hovered");
              },

              dragover: (event: DragEvent) => {
                preventEvent(event);
                const label = document.getElementById("label");

                label?.classList.add("image-content__label--hovered");
              },
              dragleave: (event: DragEvent) => {
                preventEvent(event);
                const label = document.getElementById("label");

                label?.classList.remove("image-content__label--hovered");
              },
              drop: (event: DragEvent) => {
                preventEvent(event);
                const label = document.getElementById("label");
                const fileInfo = event.dataTransfer?.files;

                if (!fileInfo) return;

                label?.classList.remove("image-content__label--hovered");
                handleUpdate(fileInfo);
              },
            },
          },
          el(
            "div",
            { className: "image-content__inner" },
            el("i", { className: "icon-insert_photo" }),
            el(
              "div",
              { className: "image-content__text" },
              "드래그하거나 클릭해서 업로드",
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
            change: (event: InputEvent) => {
              const { target } = event;

              if (!target || !(target instanceof HTMLInputElement)) return;

              const filesInfo = target.files;

              handleUpdate(filesInfo);
            },
          },
        }),
        el("div", {
          className: "image-content__preview image-content__preview--hidden",
          id: "preview",
        }),
        el(
          "div",
          { className: "image-upload__gps" },
          el("i", {
            className: "icon-location_on",
          }),
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
          }),
        ),
        el(
          "div",
          {
            className: "image-content__info",
          },
          el("textarea", {
            className: "image-content__desc",
            name: "contents",
            placeholder: "맛식에 대해 설명해주세요.",
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
              click: async (event: MouseEvent) => {
                event.preventDefault();
                const location = document.getElementById("location");
                if (!location || !(location instanceof HTMLInputElement))
                  return;
                const [wideAddr, localAddr] = location.value.split(" ");

                const form = document.getElementById("form");
                if (!form || !(form instanceof HTMLFormElement)) return;
                const formData = new FormData(form);
                formData.append("wideAddr", wideAddr);
                formData.append("localAddr", localAddr);

                const response = await createPostData(formData);
                if (response && !("error" in response)) {
                  unlock();
                  updatePath(`/post/${response.id}`);
                  return;
                }

                toast(response.message);
              },
            },
          },
          "등록하기",
        ),
      ),
    ),
  );
}
