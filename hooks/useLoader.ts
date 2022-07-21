import { atomLoader } from "@recoil/atoms";
import { useSetRecoilState } from "recoil";

export const useLoader = () => {
  const setLoader = useSetRecoilState(atomLoader);

  return {
    show() {
      setLoader(true);
    },
    hide() {
      setLoader(false);
    },
  };
};
