import "../../css/UploadImage.css";

export default function UploadImage() {
  const container = document.createElement("section");
  const form = document.createElement("form");
  const imageContent = document.createElement("div");
  const imageContentUpload = document.createElement("div");
  const imageContentBox = document.createElement("div");
  const imageContentLabel = document.createElement("label");
  const imageContentInput = document.createElement("input");
  const imageContentPreview = document.createElement("div");
  const imageContentInfo = document.createElement("div");
  const inputTitleWrap = document.createElement("div");
  const inputTitle = document.createElement("input");
  const inputDescWrap = document.createElement("div");
  const inputDesc = document.createElement("textarea");
  const submitBtn = document.createElement("button");

  const Div = (img) => {
    const div = document.createElement("div");
    div.classList.add("divStyle");
    div.appendChild(img);
    return div;
  };

  const Img = (e) => {
    const img = document.createElement("img");
    img.classList.add("imgStyle");
    img.src = e.target.result;
    return img;
  };

  const handleUpdate = (e) => {
    const filesInfo = e.target.files;
    const fileList = [...filesInfo];
    const previewZone = document.querySelector(".image-content__preview");

    if (filesInfo.length > 4) {
      alert("사진은 4장까지 올릴 수 있습니다.");
      return;
    }

    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", (event) => {
        const img = Img(event);
        const div = Div(img);
        previewZone.appendChild(div);
      });
      reader.readAsDataURL(file);
    });
  };

  imageContentInput.addEventListener("change", handleUpdate);

  // Container
  container.classList.add("container");
  form.classList.add("image-form");
  form.method = "POST";
  submitBtn.innerText = "제출";
  submitBtn.classList.add("image-content__submit");

  // Image content
  imageContent.classList.add("image-content");

  // Upload file
  imageContentUpload.classList.add("image-content__upload");
  imageContentBox.classList.add("image-content__box");
  imageContentPreview.classList.add("image-content__preview");
  imageContentLabel.for = "#upload-image";
  imageContentLabel.classList.add("image-content__label");
  imageContentInput.id = "upload-image";
  imageContentInput.name = "images";
  imageContentInput.accept = "image/*";
  imageContentInput.type = "file";
  imageContentInput.required = true;
  imageContentInput.multiple = true;
  imageContentInput.classList.add("image-content__input");
  imageContentLabel.append(
    document.createTextNode("드래그하거나 클릭하여 업로드"),
  );
  imageContentLabel.append(imageContentInput);
  imageContentBox.append(imageContentLabel);
  imageContentUpload.append(imageContentBox, imageContentPreview);

  // Input information
  imageContentInfo.classList.add("image-content__info");
  inputTitle.type = "text";
  inputTitle.placeholder = "제목";
  inputTitle.name = "title";
  inputTitle.classList.add("image-content__title");
  inputDesc.placeholder = "내용";
  inputDesc.name = "description";
  inputDesc.classList.add("image-content__desc");
  inputTitleWrap.append(inputTitle);
  inputDescWrap.append(inputDesc);
  imageContentInfo.append(inputTitleWrap, inputDescWrap);

  // Image content
  imageContent.append(imageContentUpload, imageContentInfo);

  // append
  form.append(imageContent, submitBtn);
  container.append(form);

  return container;
}
