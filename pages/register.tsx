import { PATHS } from "@constants";
import { queryParams } from "@utils";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";

const Register = () => {
  const { replace } = useRouter();
  const [isTokenValid, setIsTokenValid] = useState<boolean>();

  const checkToken = async (token: string) => {
    const { tokenValidApi } = await import("@utils/api");
    const resp = await tokenValidApi(token);
    console.log({resp})
    // setIsTokenValid(resp);
  };

  useLayoutEffect(() => {
    const query = queryParams();
    checkToken(query.token);
  }, []);

  console.log({ isTokenValid });

  if (isTokenValid === false) replace(PATHS.LOGIN);
  if (isTokenValid === undefined) return null;

  return "null";
};

export default Register;
