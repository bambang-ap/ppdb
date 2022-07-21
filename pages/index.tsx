import { PATHS } from "@constants";
import { storageUserData } from "@utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default () => {
  const { replace } = useRouter();

  useEffect(() => {
    const user = storageUserData.get();
    if (user) replace(PATHS.APP);
    else replace(PATHS.LOGIN);
  }, []);

  return null;
};
