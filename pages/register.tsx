import { DataSiswa } from "@appComponent";
import { Container } from "@components";
import { PATHS } from "@constants";
import { queryParamsToObject } from "@helpers";
import { ApiClient, queryParams } from "@utils";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";

const Register = () => {
  const { replace } = useRouter();

  const checkToken = async (token: string) => {
    if (!token) {
      alert("Token invalid");
      replace(PATHS.LOGIN);
    }
    const resp = await ApiClient.checkToken(token);

    if (resp) return;

    alert("Token invalid");
    replace(PATHS.LOGIN);
  };

  useLayoutEffect(() => {
    const query = queryParamsToObject(location.search);
    checkToken(query.token);
  }, []);

  return (
    <Container>
      <DataSiswa />
    </Container>
  );
};

export default Register;
