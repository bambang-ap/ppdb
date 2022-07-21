import { atom } from "recoil";
import { User } from "@type/User";
import { DataSiswa, ShortStudentData } from "@type/Student";

export const atomLoader = atom({
  key: "atomLoader",
  default: false,
});

export const atomStudent = atom({
  key: "atomStudent",
  default: {} as DataSiswa,
});

export const atomUserData = atom({
  key: "atomUserData",
  default: {} as User,
});

export const atomListSiswa = atom<ShortStudentData[]>({
  key: "atomListSiswa",
  default: [],
});

export const atomListUsers = atom<User[]>({
  key: "atomListUsers",
  default: [],
});
