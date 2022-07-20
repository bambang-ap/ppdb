import { FormDataSiswa } from "@appComponent";
import { Button, Container } from "@components";
import { PATHS } from "@constants";
import { queryParamsToObject } from "@helpers";
import { useDataSiswa } from "@hooks";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export default () => {
  const { replace } = useRouter();
  const { data, init } = useDataSiswa();

  const checkToken = async (token: string) => {
    init({});
    if (!token) {
      alert("Token invalid");
      replace(PATHS.LOGIN);
    }

    try {
      await ApiClient.checkToken(token);
    } catch (err) {
      // @ts-ignore
      alert(err?.response?.data?.msg);
      replace(PATHS.LOGIN);
    }
  };

  const register = async () => {
    try {
      const { data: resp } = await ApiClient.insertStudent(data);
      alert(resp.msg);
      replace(PATHS.LOGIN);
    } catch (err) {
      // @ts-ignore
      alert(err?.response?.data?.msg);
    }
  };

  useLayoutEffect(() => {
    const query = queryParamsToObject(location.search);
    checkToken(query.token);
  }, []);

  return (
    <Container>
      <FormDataSiswa editable />
      <Button onClick={register}>Daftar</Button>
    </Container>
  );
};
