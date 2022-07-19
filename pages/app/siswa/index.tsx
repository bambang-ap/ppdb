import { Header } from "@appComponent";
import { Button, Container, Text, View, Wrapper } from "@components";
import { PATHS } from "@constants";
import { atomListSiswa, atomUserData } from "@recoil/atoms";
import { ShortStudentData } from "@type/Student";
import { USER_ROLES } from "@type/User";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const ListSiswa = () => {
  const { replace, push } = useRouter();
  const [students, setStudents] = useRecoilState(atomListSiswa);
  const userData = useRecoilValue(atomUserData);

  const navigate = (id: string) => {
    push(`${PATHS.SISWA}/${id}`);
  };

  useEffect(() => {
    ApiClient.listStudents().then(({ data }) => setStudents(data));
    if (userData?.role !== USER_ROLES.ADMIN) replace(PATHS.APP);
  }, []);

  return (
    <Container>
      <Header title="Data Siswa" />
      <Wrapper>
        <Text flex alignCenter>
          NISN
        </Text>
        <Text flex alignCenter>
          Nama Lengkap
        </Text>
        <Text flex alignCenter>
          Asal Sekolah
        </Text>
        <Text flex alignCenter>
          Nomor Handphone
        </Text>
        <Text flex alignCenter>
          Alamat
        </Text>
        <View flex />
      </Wrapper>
      {students.map((siswa) => {
        const { _id, alamat, asalSekolah, namaLengkap, nisn, noHp } = siswa;
        return (
          <Wrapper>
            <Text flex>{nisn}</Text>
            <Text flex>{namaLengkap}</Text>
            <Text flex>{asalSekolah}</Text>
            <Text flex>{noHp}</Text>
            <Text flex>{alamat}</Text>
            <View flex>
              <Button flex onClick={() => navigate(_id)}>
                Detail
              </Button>
            </View>
          </Wrapper>
        );
      })}
    </Container>
  );
};

export default ListSiswa;
