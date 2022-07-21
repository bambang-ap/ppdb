import { FormDataSiswa } from "@appComponent";
import { BoxSpace, Button, Container, Text } from "@components";
import { PATHS } from "@constants";
import { queryParamsToObject } from "@helpers";
import { useDataSiswa, useLoader } from "@hooks";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export default () => {
  const { replace } = useRouter();
  const { data, init } = useDataSiswa();

  const loader = useLoader();

  const checkToken = async (token: string) => {
    if (!token) {
      alert("Token invalid");
      replace(PATHS.LOGIN);
    }

    init({ token });
    loader.show();
    try {
      await ApiClient.checkToken(token);
    } catch (err) {
      // @ts-ignore
      alert(err?.response?.data?.msg);
      replace(PATHS.LOGIN);
    }
    loader.hide();
  };

  const register = async () => {
    loader.show();
    try {
      const { data: resp } = await ApiClient.insertStudent(data);
      alert(resp.msg);
      replace(PATHS.LOGIN);
    } catch (err) {
      // @ts-ignore
      alert(err?.response?.data?.msg);
    }
    loader.hide();
  };

  useLayoutEffect(() => {
    const query = queryParamsToObject(location.search);
    checkToken(query.token);
  }, []);

  return (
    <Container>
      <Text alignCenter>Silahkan isi data diri anda</Text>
      <BoxSpace b />
      <FormDataSiswa editable />
      <Button onClick={register}>Daftar</Button>
    </Container>
  );
};
