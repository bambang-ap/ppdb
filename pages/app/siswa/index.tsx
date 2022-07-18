import { Header } from "@appComponent";
import { Container } from "@components";
import { PATHS } from "@constants";
import { USER_ROLES } from "@type/User";
import { storageUserData } from "@utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ListSiswa = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const userData = storageUserData.get();
    if (userData?.role !== USER_ROLES.ADMIN) replace(PATHS.APP);
  }, []);

  return (
    <Container>
      <Header title="Data Siswa" />
    </Container>
  );
};

export default ListSiswa;
