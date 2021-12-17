import { fetchAddressData } from "../api/dummy";

export default function WordAutoComplete(dataList) {
  const optionFragment = document.createDocumentFragment();

  fetchAddressData().then((response) => {
    Object.entries(response).forEach(([wideAddr, localAddr]) => {
      localAddr.forEach((city) => {
        const option = document.createElement("option");
        option.value = `${wideAddr} ${city}`;
        optionFragment.appendChild(option);
      });
    });
    dataList.appendChild(optionFragment);
    return dataList;
  });
}
