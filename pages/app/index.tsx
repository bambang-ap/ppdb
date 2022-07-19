import { Header } from "@appComponent";
import { Button, Container } from "@components";
import { eID, PATHS } from "@constants";
import { atomUserData } from "@recoil/atoms";
import { USER_ROLES } from "@type/User";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

export default () => {
  const { role = USER_ROLES.SISWA, _id } = useRecoilValue(atomUserData) ?? {};
  const { push } = useRouter();

  const isAdmin = role === USER_ROLES.ADMIN;

  return (
    <Container>
      <Header title="PPDB (Penerimaan Peserta Didik Baru)" />
      {isAdmin ? (
        <>
          <Button onClick={() => push(PATHS.SISWA)}>Daftar Calon Siswa</Button>
          <Button onClick={() => push(PATHS.USERS)}>Daftar Akun</Button>
        </>
      ) : (
        <Button
          onClick={() => {
            const path = PATHS.SISWA_ID.replace(eID, _id);
            push(path);
          }}
        >
          Lihat data saya
        </Button>
      )}
    </Container>
  );
};
