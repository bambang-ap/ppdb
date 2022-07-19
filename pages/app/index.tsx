import { Header } from "@appComponent";
import { Button, Container } from "@components";
import { PATHS } from "@constants";
import { atomUserData } from "@recoil/atoms";
import { USER_ROLES } from "@type/User";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

export default () => {
  const { role = USER_ROLES.SISWA } = useRecoilValue(atomUserData) ?? {};
  const { push } = useRouter();

  const isAdmin = role === USER_ROLES.ADMIN;

  return (
    <Container>
      <Header title="PPDB (Penerimaan Peserta Didik Baru)" />
      {isAdmin && (
        <>
          <Button onClick={() => push(PATHS.SISWA)}>Daftar Calon Siswa</Button>
          <Button onClick={() => push(PATHS.USERS)}>Daftar Akun</Button>
        </>
      )}
    </Container>
  );
};
