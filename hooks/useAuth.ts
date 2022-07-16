import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuth = () => {
  const { replace } = useRouter();
  const hasLoggedIn = true;

  useEffect(() => {
    if (hasLoggedIn) replace("/auth");
    else replace("/login");
  }, []);
};
