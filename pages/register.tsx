import { PATHS } from "@constants";
import { queryParams } from "@utils";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";

const Register = () => {
  const { replace } = useRouter();

  const checkToken = async (token: string) => {
    if (!token) {
      alert("Token invalid");
      replace(PATHS.LOGIN);
    }

    const { tokenValidApi } = await import("@utils/api");
    const resp = await tokenValidApi(token);

    if (resp) return;

    alert("Token invalid");
    replace(PATHS.LOGIN);
  };

  useLayoutEffect(() => {
    const query = queryParams();
    checkToken(query.token);
  }, []);

  return "null";
};

export default Register;
