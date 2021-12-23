import el from "../utils/dom";
import { getAddressData } from "../api";
import { debounce } from "../utils/optimize";
import toast from "../utils/toast";

const WAIT = 100;

export default function WordAutoComplete({ formAttr, inputAttr, onSubmit }) {
  window.locationData = {};
  const dataListId = `${inputAttr.id}-address` || `address-${Date().now()}`;
  const dataList = el("datalist", { id: dataListId });
  const input = el("input", inputAttr, dataList);
  const form = el("form", formAttr, input);

  const setListAttribute = (str) => {
    if (!str || str.length < 2) {
      input.setAttribute("list", "");
      return;
    }

    input.setAttribute("list", dataListId);
  };
  const filter = (str, isSubmit) => {
    const filtered = window.locationData.filter((city) => city.includes(str));
    const [firstCity] = filtered;

    setListAttribute(str);

    if (filtered.length === 1 && isSubmit) {
      input.value = firstCity;
      onSubmit();
      toast("정확한 주소를 입력해주세요!");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    filter(input.value, true);
  };
  const handleInput = debounce(() => {
    filter(input.value);
  }, WAIT);

  input.addEventListener("change", handleInput);
  input.addEventListener("keydown", handleInput);
  input.addEventListener("keyup", handleInput);
  form.addEventListener("submit", handleSubmit);

  getAddressData().then((response) => {
    window.locationData = Object.entries(response).flatMap(
      ([wideAddr, localAddr]) => localAddr.map((city) => `${wideAddr} ${city}`),
    );
    const fragment = document.createDocumentFragment();

    window.locationData.forEach((city) => {
      fragment.append(el("option", { value: city }));
    });

    dataList.append(fragment);
  });
  setListAttribute();

  return form;
}
