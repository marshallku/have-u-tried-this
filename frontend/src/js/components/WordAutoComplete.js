import { fetchAddressData } from "../api/dummy";

export default function WordAutoComplete(dataList) {
  const optionFragment = document.createDocumentFragment();

  fetchAddressData().then((response) => {
    Object.entries(response)
          .map(([wideAddr, localAddr]) => {
    localAddr
          .map((city) => {
            const option = document.createElement("option");
            option.value = `${wideAddr} ${city}`;
            optionFragment.appendChild(option);
          });
        });
    dataList.appendChild(optionFragment);
    return dataList;
  });
}
