import { Text, View, BoxSpace } from "@components";
import { StudentKey } from "@type/Student";
import { COLORS, SIZES } from "@constants";
import FormDataOrangTua from "./FormOrangTua";
import DataPribadiSiswa from "./DataPribadiSiswa";
import FormKontakSiswa from "./FormKontakSiswa";
import RegistrasiPesertaDidik from "./RegistrasiPesertaDidik";

export type FormDataSiswaProps = {
  editable?: boolean;
};

export const FormDataSiswa = (props: FormDataSiswaProps) => {
  return (
    <>
      <View style={style}>
        <DataPribadiSiswa {...props} />
      </View>

      <View style={style}>
        <RegistrasiPesertaDidik {...props} />
      </View>

      <View style={style}>
        <Text alignCenter>Data Ayah Kandung</Text>
        <BoxSpace b />
        <FormDataOrangTua id={StudentKey.AYAH} {...props} />
      </View>

      <View style={style}>
        <Text alignCenter>Data Ibu Kandung</Text>
        <BoxSpace b />
        <FormDataOrangTua id={StudentKey.IBU} {...props} />
      </View>

      <View style={style}>
        <Text alignCenter>Data Wali Peserta Didik(Jika ada)</Text>
        <BoxSpace b />
        <FormDataOrangTua id={StudentKey.WALI} {...props} />
      </View>

      <View style={style}>
        <FormKontakSiswa {...props} />
      </View>
    </>
  );
};

const style = {
  borderStyle: "solid",
  borderRadius: SIZES._radius,
  borderWidth: SIZES._outline,
  borderColor: COLORS.BLACK100,
  padding: SIZES.padding,
  marginBottom: SIZES.padding,
};
