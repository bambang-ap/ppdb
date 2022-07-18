import { Header } from "@appComponent";
import { Container } from "@components";
import { PATHS } from "@constants";
import { USER_ROLES } from "@type/User";
import { storageUserData } from "@utils";
import { useRouter } from "next/router";
import { useEffect } from "react";

const App = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const userData = storageUserData.get();
    if (userData?.role === USER_ROLES.SISWA)
      replace(`${PATHS.SISWA}/${userData._id}`);
  }, []);

  return (
    <Container>
      <Header title="PPDB (Penerimaan Peserta Didik Baru)" />
    </Container>
  );
};

export default App;
