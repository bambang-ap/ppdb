import { PATHS } from "@constants";
import { storageUserData } from "@utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const user = storageUserData.get();
    if (user) replace(PATHS.APP);
    else replace(PATHS.LOGIN);
  }, []);
};
