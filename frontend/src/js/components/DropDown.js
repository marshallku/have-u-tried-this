import el from "../utils/dom";
import { removeUser } from "../data/user";
import { addClickEvent } from "../router";
import "../../css/DropDown.css";

export default function DropDown() {
  const backdrop = el("div", {
    className: "backdrop",
    events: { click: () => backdrop.remove() },
  });

  const dropDownList = (text, path) => {
    const list = el("a", {}, text);
    addClickEvent(list, path);

    return list;
  };

  backdrop.append(
    el(
      "nav",
      { className: "drop-down" },
      el(
        "ul",
        { className: "drop-down__list" },
        el(
          "li",
          {},
          el("i", { className: "icon-utensil-spoon-solid" }),
          dropDownList("작성 글", "/user"),
        ),
        el(
          "li",
          {},
          el("i", { className: "icon-utensil-spoon-solid" }),
          dropDownList("추천한 글", "/user/liked"),
        ),
        el(
          "li",
          {},
          el("i", { className: "icon-utensil-spoon-solid" }),
          dropDownList("작성 댓글", "/user/comment"),
        ),
        el(
          "li",
          { className: "logout" },
          el("button", { events: { click: () => removeUser() } }, "로그아웃"),
        ),
      ),
    ),
  );

  return backdrop;
}
