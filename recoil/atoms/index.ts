import { DataSiswa } from "@type/Student";
import { atom } from "recoil";

export const atomStudent = atom({
  key: "atomStudent",
  default: {} as DataSiswa,
});
