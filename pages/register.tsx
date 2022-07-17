import { FormDataSiswa } from "@appComponent";
import { Button, Container } from "@components";
import { PATHS } from "@constants";
import { queryParamsToObject } from "@helpers";
import { DataSiswa } from "@type/Student";
import { ApiClient, queryParams } from "@utils";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";

const Register = () => {
  const { replace } = useRouter();
  const [student, setStudent] = useState({} as DataSiswa);

  const checkToken = async (token: string) => {
    if (!token) {
      alert("Token invalid");
      replace(PATHS.LOGIN);
    }
    const { data } = await ApiClient.checkToken(token);

    ApiClient.getStudent("1").then(({ data }) => setStudent(data));

    if (data) return;

    alert("Token invalid");
    replace(PATHS.LOGIN);
  };

  useLayoutEffect(() => {
    const query = queryParamsToObject(location.search);
    checkToken(query.token);
  }, []);

  return (
    <Container>
      <FormDataSiswa data={student} />
      <Button onClick={() => console.log(student)}>Show Data</Button>
    </Container>
  );
};

export default Register;
