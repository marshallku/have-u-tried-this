import el from "../utils/dom";
import { getAddressData } from "../api";

export default function WordAutoComplete() {
  const dataList = el("datalist", { id: "address" });
  const fragment = document.createDocumentFragment();

  new Promise((resolve) => {
    getAddressData().then((response) => {
      Object.entries(response).forEach(([wideAddr, localAddr]) => {
        localAddr.forEach((city) => {
          fragment.append(el("option", { value: `${wideAddr} ${city}` }));
        });
      });
    });
    resolve(fragment);
  }).then((fragment) => dataList.append(fragment));
  return dataList;
}
