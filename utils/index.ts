import { StorageObject } from "./localStorage";

export const storageUserData = new StorageObject("userData");

export const queryParams = (): Record<string, string> => {
  return location.search
    .replace(/^\?/, "")
    .split("&")
    .reduce((ret, curr) => {
      const [key, value] = curr.split("=");
      return { ...ret, [key]: value };
    }, {});
};
