export * from "./localStorage";
export * from "./mongodb";

export const toQueryParams = (params: Record<string, string>) => {
  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};

export const queryParamsToObject = (search: string): Record<string, string> => {
  return search
    .replace(/^\?/, "")
    .split("&")
    .reduce((ret, curr) => {
      const [key, value] = curr.split("=");
      return { ...ret, [key]: value };
    }, {});
};
