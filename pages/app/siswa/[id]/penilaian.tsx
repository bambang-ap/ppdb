import { Header } from "@appComponent";
import {
  BoxSpace,
  Container,
  Wrapper,
  FormInput,
  Button,
  View,
  Input,
  Text,
} from "@components";
import { useArray } from "@hooks";
import { ShortStudentData } from "@type/Student";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default () => {
  const { query } = useRouter();
  const [forms, setForms] = useArray<[string, string]>([]);

  const { push, remove, replace, initialize } = setForms;
  const { id, namaLengkap } = query as ShortStudentData & { id: string };
  const title = `Penilaian: ${namaLengkap}`;

  const updatePenilaian = async () => {
    try {
      await ApiClient.updatePenilaian({
        id,
        forms: forms.filter(([key]) => Boolean(key)),
      });
    } catch (err) {
      // @ts-ignore
      alert(err?.response?.data?.msg);
    }
  };

  useEffect(() => {
    if (id) ApiClient.getPenilaian(id).then(({ data }) => initialize(data));
  }, [id]);

  return (
    <Container>
      <Header title={title} />
      <Wrapper>
        <Text flex>Jenis penilaian</Text>
        <Text flex>Nilai / Catatan</Text>
        <View width="10%" />
      </Wrapper>
      <BoxSpace b />
      {forms.map(([key, value], index) => {
        return (
          <>
            <Wrapper itemsCenter>
              <Input
                value={key}
                style={{ flex: 1 }}
                onChangeText={(key) => replace(index, [key, value])}
              />
              <BoxSpace b />
              <Input
                value={value}
                style={{ flex: 1 }}
                onChangeText={(value) => replace(index, [key, value])}
              />
              <BoxSpace b />
              <Button width="10%" onClick={() => remove(index)}>
                Hapus
              </Button>
            </Wrapper>
            <BoxSpace b />
          </>
        );
      })}
      <Wrapper>
        <Button flex onClick={() => push([["", ""]])}>
          Tambah jenis penilaian
        </Button>
        <BoxSpace a />
        <Button flex onClick={updatePenilaian}>
          Simpan Penilaian
        </Button>
      </Wrapper>
    </Container>
  );
};
