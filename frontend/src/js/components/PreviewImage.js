import MakeDiv from "./MakeDiv";
import MakeImg from "./MakeImg";

export default function PreviewImage(e) {
  const filesInfo = e.target.files;
  const fileList = [...filesInfo];
  const previewZone = document.querySelector(".image-content__preview");

  if (filesInfo.length > 4) {
    alert("사진은 4장까지 올릴 수 있습니다.");
    return;
  }

  fileList.map((file) => {
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
      const img = MakeImg(e);
      const div = MakeDiv(img, file);
      previewZone.appendChild(div);
    });
    reader.readAsDataURL(file);
  });
}
