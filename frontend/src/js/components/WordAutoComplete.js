import el from "../utils/dom";
import { fetchAddressData } from "../api/dummy";

export default function WordAutoComplete() {
  const dataList = el("datalist", {});

  fetchAddressData().then((response) => {
    Object.entries(response).forEach(([wideAddr, localAddr]) => {
      localAddr.forEach((city) => {
        dataList.appendChild(el("option", { value: `${wideAddr} ${city}` }));
      });
    });
  });

  return dataList;
}
