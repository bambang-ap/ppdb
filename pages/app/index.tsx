import { Header } from "@appComponent";
import {
  BoxSpace,
  Button,
  Container,
  Input,
  Text,
  View,
  Wrapper,
} from "@components";
import { eID, PATHS } from "@constants";
import { atomUserData } from "@recoil/atoms";
import { USER_ROLES } from "@type/User";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";

export default () => {
  const { push } = useRouter();

  const { role = USER_ROLES.SISWA, _id } = useRecoilValue(atomUserData) ?? {};

  const [waNumber, setWaNumber] = useState("");

  const isAdmin = role === USER_ROLES.ADMIN;

  const navigateOwnData = () => {
    const path = PATHS.SISWA_ID.replace(eID, _id);
    push(path);
  };

  const sendToken = async () => {
    if (waNumber.length < 10) {
      return alert("Silahkan input nomor WhatsApp target");
    }

    try {
      const { data } = await ApiClient.createToken(_id);
      const url = `https://wa.me/${waNumber}?text=Silahkan isi data diri anda pada tautan ini ${location.origin}/register?token=${data.token}`;
      window.open(url, "_blank");
    } catch (err) {
      // @ts-ignore
      alert(err?.response?.data?.msg);
    }
  };

  return (
    <Container>
      <Header title="PPDB (Penerimaan Peserta Didik Baru)" />
      {isAdmin ? (
        <>
          <Wrapper>
            <Button flex onClick={() => push(PATHS.SISWA)}>
              Daftar Calon Siswa
            </Button>
            <BoxSpace b />
            <Button flex onClick={() => push(PATHS.USERS)}>
              Daftar Akun
            </Button>
          </Wrapper>
          <BoxSpace b />
          <Wrapper itemsEnd>
            <View flex>
              <Text>Input nomor whatsapp</Text>
              <BoxSpace />
              <Input
                value={waNumber}
                onChangeText={setWaNumber}
                placeholder="contoh : 62857xxxxxxxx"
              />
            </View>
            <BoxSpace b />
            <Button onClick={sendToken}>Kirim Token</Button>
          </Wrapper>
        </>
      ) : (
        <Button onClick={navigateOwnData}>Lihat data saya</Button>
      )}
    </Container>
  );
};
