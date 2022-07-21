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
import { useArray, useLoader } from "@hooks";
import { ShortStudentData } from "@type/Student";
import { ApiClient } from "@utils";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

export default () => {
  const loader = useLoader();
  const { query, back } = useRouter();
  const [forms, setForms] = useArray<[string, string]>([]);

  const { push, remove, replace, initialize } = setForms;
  const { id, namaLengkap } = query as ShortStudentData & { id: string };
  const title = `Penilaian: ${namaLengkap}`;

  const updatePenilaian = async () => {
    loader.show();
    // try {
    //   await ApiClient.updatePenilaian({
    //     id,
    //     forms: forms.filter(([key]) => Boolean(key)),
    //   });
    // } catch (err) {
    //   // @ts-ignore
    //   alert(err?.response?.data?.msg);
    // }
    // loader.hide();
  };

  const getData = async () => {
    loader.show();
    try {
      const { data } = await ApiClient.getPenilaian(id);
      initialize(data);
    } catch (err) {
      // @ts-ignore
      alert(err?.response?.data?.msg);
      back();
    }
    loader.hide();
  };

  useEffect(() => {
    if (id) getData();
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
          <Fragment key={key}>
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
          </Fragment>
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
