import { imagesData } from "./dummy";

export default async function getImages(): Promise<Array<string>> {
  return imagesData;
}
