import { DataSiswa, ShortStudentData } from "@type/Student";
import { User } from "@type/User";
import { atom } from "recoil";

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
