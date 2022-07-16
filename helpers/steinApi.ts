import { Sheets } from "@constants";
import { btoa } from "abab";
import { Stein } from "@helpers";

const client = new Stein("62d24025bca21f053ea40b0f");

export type IUser = Record<
  "id" | "username" | "password" | "name" | "image" | "role",
  string
>;

export const loginApi = async (username: string, pass: string) => {
  const password = btoa(pass) ?? "";
  const resp = await client.get<IUser>(Sheets.USER, {
    search: { username, password },
  });

  if (resp.length === 1) return resp[0];

  return null;
};

export const studentsApi = (id = "") => {
  return client.get(Sheets.STUDENTS, { search: { id } });
};

export const tokenValidApi = async (token: string) => {
  const resp = await client.get(Sheets.TOKEN, {
    search: { token, registered: "false" },
  });
  return resp?.length === 1;
};
