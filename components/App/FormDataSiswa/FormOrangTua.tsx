import { FormInput, FormRadio, Input } from "@components";
import { useDataSiswa } from "@hooks";
import { StudentKey } from "@type/Student";

type OrtuProps = {
  id: StudentKey;
};

const FormDataOrangTua = (props: OrtuProps) => {
  const { id: key } = props;

  const {
    data: { [key]: data },
    setDataOrtu,
  } = useDataSiswa();

  const { nama, nik, pekerjaan, pendidikan, penghasilanBulanan, tahunLahir } =
    data?.[0] ?? {};

  return (
    <>
      <FormInput
        value={nama}
        title="Nama"
        onChangeText={(nama) => setDataOrtu(key, { nama })}
      />
      <FormInput
        value={nik}
        title="NIK"
        type="number"
        onChangeText={(nik) => setDataOrtu(key, { nik })}
      />
      <FormInput
        type="number"
        value={tahunLahir}
        title="Tahun Lahir"
        onChangeText={(tahunLahir) =>
          setDataOrtu(key, { tahunLahir: Number(tahunLahir) })
        }
      />
      <FormRadio
        value={pendidikan}
        title="Pendidikan"
        onChange={({ value }) => setDataOrtu(key, { pendidikan: value })}
        data={[
          { name: "Tidak Sekolah", value: "1" },
          { name: "Putus SD", value: "2" },
          { name: "SD Sederajat", value: "3" },
          { name: "SMP Sederajat", value: "4" },
          { name: "SMA Sederajat", value: "5" },
          { name: "Diploma 1", value: "6" },
          { name: "Diploma 2", value: "7" },
          { name: "Diploma 3", value: "8" },
          { name: "Strata 1", value: "9" },
          { name: "Strata 2", value: "10" },
          { name: "Strata 3", value: "11" },
        ]}
      />
      <FormRadio
        value={pekerjaan}
        title="Pekerjaan"
        onChange={({ value }) => setDataOrtu(key, { pekerjaan: value })}
        data={[
          { name: "Tidak Bekerja", value: "1" },
          { name: "Guru", value: "2" },
          { name: "Petani", value: "3" },
          { name: "Peternak", value: "4" },
          { name: "PNS/TNI/POLRI", value: "5" },
          { name: "Karyawan Swasta", value: "6" },
          { name: "Pedagang Kecil", value: "7" },
          { name: "Pedagang Besar", value: "8" },
          { name: "Wiraswasta", value: "9" },
          { name: "Wirausaha", value: "10" },
          { name: "Buruh", value: "11" },
          { name: "Pensiunan", value: "12" },
          { name: "Lain-lain", value: "99" },
        ]}
      />
      <FormRadio
        value={penghasilanBulanan}
        title="Penghasilan Per Bulan"
        onChange={({ value }) =>
          setDataOrtu(key, { penghasilanBulanan: value })
        }
        data={[
          { name: "Kurang dari 500.000", value: "1" },
          { name: "500.000 - 999.999", value: "2" },
          { name: "1 juta - 1.999.999", value: "3" },
          { name: "2 juta - 4.999.999", value: "4" },
          { name: "5 juta - 20 juta", value: "5" },
          { name: "lebih dari 20 juta", value: "6" },
        ]}
      />
    </>
  );
};

export default FormDataOrangTua;
