import { Header } from "@appComponent";
import { Button, Container } from "@components";
import { PATHS } from "@constants";
import { atomUserData } from "@recoil/atoms";
import { ShortStudentData } from "@type/Student";
import { USER_ROLES } from "@type/User";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

export default () => {
  const { push } = useRouter();

  return (
    <Container>
      <Header title="PPDB (Penerimaan Peserta Didik Baru)" />
      <Button onClick={() => push(PATHS.SISWA)}>Daftar Calon Siswa</Button>
      <Button onClick={() => push(PATHS.USERS)}>Daftar Akun</Button>
      <Button onClick={() => push(PATHS.SETTINGS)}>Akun</Button>
    </Container>
  );
};
