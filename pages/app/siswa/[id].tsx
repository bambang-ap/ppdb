import { FormDataSiswa, Header } from "@appComponent";
import { Button, Container, Wrapper } from "@components";
import { useDataSiswa } from "@hooks";
import { atomUserData } from "@recoil/atoms";
import { USER_ROLES } from "@type/User";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default () => {
  const { query } = useRouter();
  const { _id, role } = useRecoilValue(atomUserData);
  const {
    data: { checked, namaLengkap, ...dataSiswa },
    init,
  } = useDataSiswa();

  const title = `Siswa: ${namaLengkap || (query.id as string)}`;
  const isSiswaNotChecked = _id === query.id && !checked;
  const editable = role === USER_ROLES.ADMIN || isSiswaNotChecked;

  const getData = async () => {
    const { data } = await ApiClient.getStudent(query.id as string);
    init(data);
  };

  const updateData = async (checked = false) => {
    const params = {
      ...dataSiswa,
      namaLengkap,
      checked,
    };
    await ApiClient.updateStudent(params);
    getData();
  };

  useEffect(() => {
    if (query.id) getData();
  }, [query]);

  return (
    <Container>
      <Header title={title} />
      <FormDataSiswa editable={editable} />
      <Wrapper>
        {editable && (
          <Button flex onClick={() => updateData()}>
            Edit
          </Button>
        )}
        {isSiswaNotChecked && (
          <Button flex onClick={() => updateData(true)}>
            Check
          </Button>
        )}
      </Wrapper>
    </Container>
  );
};
