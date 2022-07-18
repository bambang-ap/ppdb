import { useRecoilState } from "recoil";
import { atomStudent } from "@recoil/atoms";
import { DataSiswa, OrangTua, StudentKey } from "@type/Student";

export const useDataSiswa = () => {
  const [student, setStudent] = useRecoilState(atomStudent);

  const setDataSiswa = (newVal: Partial<DataSiswa>, editable = true) => {
    if (editable) setStudent({ ...student, ...newVal });
  };

  const setDataOrtu = (
    key: StudentKey,
    newVal: Partial<OrangTua>,
    editable = true
  ) => {
    const prevOrtu = student[key]?.[0] ?? {};
    if (editable) setDataSiswa({ [key]: [{ ...prevOrtu, ...newVal }] });
  };

  return { data: student, init: setStudent, setDataSiswa, setDataOrtu };
};
