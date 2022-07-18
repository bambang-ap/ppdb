import { FormDataSiswa, Header } from "@appComponent";
import { Container } from "@components";
import { useDataSiswa } from "@hooks";
import { atomUserData } from "@recoil/atoms";
import { USER_ROLES } from "@type/User";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const DataSiswa = () => {
  const { query } = useRouter();

  const {
    data: { checked, namaLengkap },
    init,
  } = useDataSiswa();

  const { _id, role } = useRecoilValue(atomUserData);

  const title = `Siswa: ${namaLengkap || (query.id as string)}`;
  const editable = role === USER_ROLES.ADMIN || (_id === query.id && !checked);

  useEffect(() => {
    if (query.id)
      ApiClient.getStudent(query.id as string).then(({ data }) => init(data));
  }, [query]);

  return (
    <Container>
      <Header title={title} />
      <FormDataSiswa editable={editable} />
    </Container>
  );
};

export default DataSiswa;
