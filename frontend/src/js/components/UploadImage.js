import "../../css/reset.css";
import "../../css/style.css";
import "../../css/gnb_footer.css";
import "../../css/UploadImage.css";
import PreviewImage from "./PreviewImage";

export default function UploadImage() {
  const uploadImageTemplate = `<article class="container">
    <form class="image-form" method="post" action="/upload">

    <div class="image-content">
      <div class="image-content__upload">
        <div class="image-content__box">
          <label for="image-content__input" class="image-content__label">드래그하거나 클릭하여 업로드
            <input type="file" id="image-content__input" name="image-content__input" class="image-content__input" accept="img/*" required multiple>
          </label>
        </div>
  
      <div class="image-content__preview"></div>
      </div>
        <div class="image-content__info">
          <p><input type="text" name="image-content__title" class="image-content__title" placeholder="제목"></p>
          <p><textarea maxlength= "100" name="image-content__desc" class="image-content__desc" placeholder="설명"></textarea></p>
        </div>
    </div>
      <button class="image-content__submit">제출</button>
    </form>
  </article>
  `;

  document.getElementById("app").innerHTML = uploadImageTemplate;

  const inputBoxEl = document.querySelector(".image-content__label");
  inputBoxEl.addEventListener("change", function (event) {
    PreviewImage(event);
  });
}
