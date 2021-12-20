import el from "../utils/dom";
import { fetchAddressData } from "../api";

export default function WordAutoComplete() {
  const dataList = el("datalist", {});
  const fragment = document.createDocumentFragment();

  fetchAddressData().then((response) => {
    Object.entries(response).forEach(([wideAddr, localAddr]) => {
      localAddr.forEach((city) => {
        fragment.append(el("option", { value: `${wideAddr} ${city}` }));
      });
    });
  });

  dataList.append(fragment);
  return dataList;
}
