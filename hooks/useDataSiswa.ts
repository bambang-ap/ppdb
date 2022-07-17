import { useRecoilState } from "recoil";
import { atomStudent } from "@atoms";

export const useDataSiswa = () => {
  const [dataSiswa, setDataSiswa] = useRecoilState(atomStudent);

  return { data: dataSiswa };
};
