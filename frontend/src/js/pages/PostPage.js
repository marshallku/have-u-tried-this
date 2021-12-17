import Carousel from "../components/Carousel";
import LikesCount from "../components/LikesCount";
import { fetchPostData } from "../api/dummy";
import "../../css/PostDetails.css";

function renderPostDetails(data) {
  const frag = document.createDocumentFragment();
  const carousel = Carousel(data.pictures);
  const smallContainer = document.createElement("section");
  const postInfo = document.createElement("div");
  const likes = LikesCount(data.likes);
  const edit = document.createElement("button");
  const title = document.createElement("h2");
  const author = document.createElement("div");
  const authorAvatar = document.createElement("img");
  const authorName = document.createElement("span");
  const desc = document.createElement("p");
  const editing = {
    status: false,
    title: "",
    desc: "",
  };

  // Post Info
  likes.classList.add("details__rate");
  postInfo.classList.add("details__info");
  postInfo.append(likes);
  if (data.isAuthor) {
    edit.classList.add("icon-create");
    edit.addEventListener("click", () => {
      const nextStatus = !editing.status;

      title.contentEditable = nextStatus;
      desc.contentEditable = nextStatus;

      if (editing.status) {
        // End editing
        // Remove Attributes
        title.removeAttribute("role");
        title.classList.remove("details__title--editing");
        desc.removeAttribute("role");
        desc.classList.remove("details__desc--editing");

        // Fill Text if empty
        if (!title.innerText) title.innerText = editing.title;
        if (!desc.innerText) desc.innerText = editing.desc;

        // Validate text
        if (title.innerText.includes("\n"))
          title.innerText = title.innerText.replaceAll("\n", " ");

        // TODO: Update post with api
      } else {
        // Start editing
        editing.title = title.innerText;
        editing.desc = desc.innerText;
        title.setAttribute("role", "textbox");
        title.classList.add("details__title--editing");
        desc.setAttribute("role", "textbox");
        desc.classList.add("details__desc--editing");
        title.focus();
      }

      editing.status = nextStatus;
    });
    postInfo.append(edit);
  }

  // Title
  title.classList.add("details__title");
  title.innerText = data.title;

  // Author
  author.classList.add("details__author");
  authorName.innerText = `by ${data.author.nickname}`;
  author.append(authorName);

  // desc
  desc.classList.add("details__desc");
  desc.innerText = data.content;

  // Container
  smallContainer.classList.add("small-container", "details");
  smallContainer.append(postInfo, title, author, desc);
  frag.append(carousel, smallContainer);

  return frag;
}

export default function PostDetails() {
  const div = document.createElement("div");

  fetchPostData().then((data) => {
    div.append(renderPostDetails(data));
  });

  return div;
}
