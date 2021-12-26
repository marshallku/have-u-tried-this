import el from "../utils/dom";
import { getAddressData } from "../api";
import { debounce } from "../utils/optimize";
import toast from "../utils/toast";

const WAIT = 500;

export default function WordAutoComplete({
  formAttr,
  inputAttr,
  onSubmit,
}: {
  // TODO: Remove any
  formAttr: any;
  inputAttr: any;
  onSubmit?: () => void;
}) {
  let locationData: string[] = [];
  const dataListId = `${inputAttr.id}-address` || `address-${Date.now()}`;
  const dataList = el("datalist", { id: dataListId });
  const input = el("input", inputAttr, dataList);
  const form = el("form", formAttr, input);

  const setListAttribute = (str?: string) => {
    if (!str || str.length < 2) {
      input.setAttribute("list", "");
      return;
    }

    input.setAttribute("list", dataListId);
  };
  const filter = (str: string, event?: SubmitEvent | FocusEvent) => {
    const filtered = locationData.filter((city) => city.includes(str));
    const [firstCity] = filtered;

    setListAttribute(str);

    if (event) {
      if (filtered.length === 1) {
        input.value = firstCity;
        if (event instanceof SubmitEvent && onSubmit) onSubmit();
        return;
      }

      input.value = "";
      toast("정확한 주소를 입력해주세요!");
    }
  };
  const handleSubmit = (event: SubmitEvent | FocusEvent) => {
    event.preventDefault();
    filter(input.value, event);
  };
  const handleInput = debounce(() => {
    filter(input.value);
  }, WAIT);

  input.addEventListener("change", handleInput);
  input.addEventListener("keydown", handleInput);
  input.addEventListener("keyup", handleInput);
  input.addEventListener("blur", handleSubmit);
  form.addEventListener("submit", handleSubmit);

  getAddressData().then((response) => {
    locationData = Object.entries(response).flatMap(([wideAddr, localAddr]) =>
      localAddr.map((city: string) => `${wideAddr} ${city}`),
    );
    const fragment = document.createDocumentFragment();

    locationData.forEach((city) => {
      fragment.append(el("option", { value: city }));
    });

    dataList.append(fragment);
  });
  setListAttribute();

  return form;
}
