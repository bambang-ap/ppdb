import { FormDataSiswa, Header } from "@appComponent";
import { BoxSpace, Button, Container, Wrapper } from "@components";
import { eID, PATHS } from "@constants";
import { useDataSiswa } from "@hooks";
import { atomUserData } from "@recoil/atoms";
import { ShortStudentData } from "@type/Student";
import { USER_ROLES } from "@type/User";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default () => {
  const { _id, role } = useRecoilValue(atomUserData);
  const { query, push } = useRouter();
  const {
    data: { checked, namaLengkap, ...dataSiswa },
    init,
  } = useDataSiswa();

  const id = query.id as string;
  const title = `Siswa: ${namaLengkap || (id as string)}`;
  const isAdmin = role === USER_ROLES.ADMIN;
  const isSiswaNotChecked = _id === id && !checked;
  const editable = isAdmin || isSiswaNotChecked;

  const navigatePenilaian = () => {
    const { alamat, asalSekolah, nisn, noHp } = dataSiswa;
    const pathname = PATHS.PENILAIAN_SISWA.replace(eID, id);
    const query = {
      alamat,
      asalSekolah,
      namaLengkap,
      nisn,
      noHp,
    } as ShortStudentData;
    push({ pathname, query });
  };

  const getData = async () => {
    const { data } = await ApiClient.getStudent(id as string);
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
    if (id) getData();
  }, [id]);

  return (
    <Container>
      <Header title={title} />
      {isAdmin && (
        <>
          <Button onClick={navigatePenilaian}>Penilaian</Button>
          <BoxSpace b />
        </>
      )}
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
