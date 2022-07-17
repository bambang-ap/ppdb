import { Text, View } from "@components";
import { StudentKey } from "@type/Student";
import FormDataOrangTua from "./FormOrangTua";
import DataPribadiSiswa from "./DataPribadiSiswa";
import FormKontakSiswa from "./FormKontakSiswa";
import { COLORS, SIZES } from "@constants";

export const FormDataSiswa = () => {
  return (
    <>
      <View style={style}>
        <DataPribadiSiswa />
      </View>

      <View style={style}>
        <Text alignCenter>Data Ayah Kandung</Text>
        <FormDataOrangTua id={StudentKey.AYAH} />
      </View>

      <View style={style}>
        <Text alignCenter>Data Ibu Kandung</Text>
        <FormDataOrangTua id={StudentKey.IBU} />
      </View>

      <View style={style}>
        <Text alignCenter>Data Wali Peserta Didik(Jika ada)</Text>
        <FormDataOrangTua id={StudentKey.WALI} />
      </View>

      <View style={style}>
        <FormKontakSiswa />
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
