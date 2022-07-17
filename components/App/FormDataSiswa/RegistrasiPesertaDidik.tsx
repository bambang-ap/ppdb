import { FormCheckbox, FormInput, FormRadio, Text } from "@components";
import { useDataSiswa } from "@hooks";

const RegistrasiPesertaDidik = () => {
  const { data, setDataSiswa } = useDataSiswa();

  const { asalSekolah, jenisPendaftaran, nisn, pilihanJurusan } = data ?? {};

  return (
    <>
      <Text alignCenter>Registrasi Peserta Didik</Text>
      <FormRadio
        value={jenisPendaftaran}
        title="Jenis Pendaftaran"
        onChange={({ value }) => setDataSiswa({ jenisPendaftaran: value })}
        data={[
          { name: "Siswa Baru", value: "1" },
          { name: "Pindahan", value: "2" },
          { name: "Kembali Bersekolah", value: "3" },
        ]}
      />
      <FormCheckbox
        showIndex
        value={pilihanJurusan}
        title="Kompetensi Keahlian yang dipilih"
        onChange={({ value }) => {
          const prev = pilihanJurusan ?? [];
          if (prev.includes(value))
            setDataSiswa({ pilihanJurusan: prev.filter((v) => v !== value) });
          else setDataSiswa({ pilihanJurusan: [...prev, value] });
        }}
        data={[
          { name: "Akuntansi & Keuangan Lembaga", value: "1" },
          { name: "Multimedia & Desain Grafis", value: "2" },
          { name: "Teknik Komputer & Jaringan", value: "3" },
          { name: "Teknik Kendaraan Ringan Otomotif", value: "4" },
        ]}
      />
      <FormInput value={nisn} title="NISN" disabled />
      <FormInput
        onChangeText={(asalSekolah) => setDataSiswa({ asalSekolah })}
        value={asalSekolah}
        title="Nama Asal Sekolah"
      />
    </>
  );
};

export default RegistrasiPesertaDidik;
