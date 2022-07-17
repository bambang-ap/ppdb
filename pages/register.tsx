import { FormDataSiswa } from "@appComponent";
import { Button, Container } from "@components";
import { PATHS } from "@constants";
import { queryParamsToObject } from "@helpers";
import { useDataSiswa } from "@hooks";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

const Register = () => {
  const { replace } = useRouter();
  const { data, init: setDataSiswa } = useDataSiswa();

  const checkToken = async (token: string) => {
    if (!token) {
      alert("Token invalid");
      replace(PATHS.LOGIN);
    }
    const { data } = await ApiClient.checkToken(token);

    ApiClient.getStudent("1").then(({ data }) => setDataSiswa(data));

    if (data) return;

    alert("Token invalid");
    replace(PATHS.LOGIN);
  };

  useLayoutEffect(() => {
    // const query = queryParamsToObject(location.search);
    // checkToken(query.token);
  }, []);

  return (
    <Container>
      <FormDataSiswa />
      <Button onClick={() => console.log(data)}>Show Data</Button>
    </Container>
  );
};

export default Register;
