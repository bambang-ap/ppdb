export * from "./api";

import { StorageObject } from "@helpers";
import { User } from "@type/User";

export const storageUserData = new StorageObject<User>("userData");

export const queryParams = (): Record<string, string> => {
  return location.search
    .replace(/^\?/, "")
    .split("&")
    .reduce((ret, curr) => {
      const [key, value] = curr.split("=");
      return { ...ret, [key]: value };
    }, {});
};
