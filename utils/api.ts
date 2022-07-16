import { Sheets } from "@constants";
import { btoa } from "abab";
import Stein from "stein-client";

const client = new Stein("62d24025bca21f053ea40b0f");

export type IUser = Record<
  "id" | "username" | "password" | "name" | "image" | "role",
  string
>;

export const loginApi = async (username: string, password: string) => {
  const resp = await client.get<IUser>(Sheets.USER, {
    search: { username, password: btoa(password) ?? "" },
  });

  if (resp.length === 1) return resp[0];

  return null;
};

export const tokenValidApi = async (token: string) => {
  const resp = await client.getWithType(Sheets.TOKEN, {
    search: { token, registered: "false" },
  });
  return resp
  // return resp?.length === 1;
};
