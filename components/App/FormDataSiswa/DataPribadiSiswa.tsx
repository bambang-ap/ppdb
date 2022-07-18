import {
  FormInput,
  FormInputDate,
  FormRadio,
  FormTextarea,
  Text,
} from "@components";
import { useDataSiswa } from "@hooks";
import { FormDataSiswaProps } from "@appComponent";

const DataPribadiSiswa = ({ editable }: FormDataSiswaProps) => {
  const { data, setDataSiswa } = useDataSiswa();

  const {
    alamat,
    anakKe,
    jenKel,
    kebutuhanKhusus,
    kepercayaan,
    kewarganegaraan,
    kodePos,
    modaTransportasi,
    namaLengkap,
    nik,
    nisn,
    noAktaLahir,
    noKip,
    punyaKip,
    tanggalLahir,
    tempatLahir,
    tempatTinggal,
  } = data ?? {};

  const isWni = kewarganegaraan?.toLowerCase?.() === "indonesia";

  return (
    <>
      <Text alignCenter>Data Pribadi Calon Peserta Didik</Text>
      <FormInput
        disabled={!editable}
        value={namaLengkap}
        title="Nama Lengkap"
        onChangeText={(namaLengkap) => setDataSiswa({ namaLengkap })}
      />
      <FormRadio
        value={jenKel}
        title="Jenis Kelamin"
        onChange={({ value }) => setDataSiswa({ jenKel: value }, editable)}
        data={[
          { name: "Laki-laki", value: "1" },
          { name: "Perempuan", value: "2" },
        ]}
      />
      <FormInput
        disabled={!editable}
        onChangeText={(nisn) => setDataSiswa({ nisn })}
        value={nisn}
        type="number"
        title="NISN"
      />
      <FormInput
        disabled={!editable}
        onChangeText={(nik) => setDataSiswa({ nik })}
        value={nik}
        type="number"
        title="NIK"
      />
      <FormInput
        disabled={!editable}
        onChangeText={(tempatLahir) => setDataSiswa({ tempatLahir })}
        value={tempatLahir}
        title="Tempat Lahir"
      />
      <FormInputDate
        disabled={!editable}
        value={tanggalLahir}
        title="Tanggal Lahir"
      />
      <FormInput
        disabled={!editable}
        onChangeText={(noAktaLahir) => setDataSiswa({ noAktaLahir })}
        value={noAktaLahir}
        title="Nomor Akta Lahir"
      />
      <FormRadio
        value={kepercayaan}
        title="Kepercayaan"
        onChange={({ value }) => setDataSiswa({ kepercayaan: value }, editable)}
        data={[
          { name: "Islam", value: "1" },
          { name: "Kristen/ Protestan", value: "2" },
          { name: "Katholik", value: "3" },
          { name: "Hindu", value: "4" },
          { name: "Budha", value: "5" },
          { name: "Khonghucu", value: "6" },
          { name: "Adat/Tradisi", value: "7" },
          { name: "Lainnya", value: kepercayaan },
        ]}
      />
      <FormRadio
        value={kewarganegaraan}
        title="Kewarganegaraan"
        onChange={({ value }) =>
          setDataSiswa({ kewarganegaraan: value }, editable)
        }
        data={[
          { name: "Indonesia (WNI)", value: "indonesia" },
          {
            name: "Asing (WNA)",
            value: isWni ? "" : kewarganegaraan,
          },
        ]}
      />
      {!isWni && (
        <FormInput
          disabled={!editable}
          onChangeText={(kewarganegaraan) => setDataSiswa({ kewarganegaraan })}
          value={kewarganegaraan}
          title="Nama Negara"
        />
      )}
      <FormRadio
        title="Berkebutuhan Khusus"
        value={kebutuhanKhusus}
        data={[
          { name: "Tidak", value: "1" },
          { name: "Netra", value: "2" },
          { name: "Rungu", value: "3" },
          { name: "Wicara", value: "4" },
          { name: "Hiper Aktif", value: "5" },
          { name: "Kesulitan Belajar", value: "6" },
          { name: "Ketergantungan Obat", value: "7" },
          { name: "Indigo", value: "8" },
          { name: "Down Sindrome", value: "9" },
          { name: "Autis", value: "10" },
        ]}
        onChange={({ value }) =>
          setDataSiswa({ kebutuhanKhusus: value }, editable)
        }
      />
      <FormTextarea disabled={!editable} value={alamat} title="Alamat" />
      <FormInput
        disabled={!editable}
        onChangeText={(kodePos) => setDataSiswa({ kodePos: Number(kodePos) })}
        type="number"
        value={kodePos}
        title="Kode POS"
      />
      <FormRadio
        value={tempatTinggal}
        title="Tempat Tinggal"
        onChange={({ value }) =>
          setDataSiswa({ tempatTinggal: value }, editable)
        }
        data={[
          { name: "Bersama Orang Tua", value: "1" },
          { name: "Wali", value: "2" },
          { name: "Kos", value: "3" },
          { name: "Asrama", value: "4" },
          { name: "Panti Asuhan", value: "5" },
          { name: "Lainnya", value: "9" },
        ]}
      />
      <FormRadio
        value={modaTransportasi}
        title="Moda Transportasi"
        onChange={({ value }) =>
          setDataSiswa({ modaTransportasi: value }, editable)
        }
        data={[
          { name: "Jalan Kaki", value: "1" },
          { name: "Kendaraan Pribadi", value: "2" },
          { name: "Kendaraan Umum / Angkutan", value: "3" },
          { name: "Jemputan Pribadi", value: "4" },
          { name: "Ojek", value: "5" },
          { name: "Lainnya", value: "6" },
        ]}
      />
      <FormInput
        disabled={!editable}
        onChangeText={(anakKe) => setDataSiswa({ anakKe })}
        value={anakKe}
        type="number"
        title="Anak Keberapa"
      />
      <FormRadio
        value={punyaKip}
        title="Punya KIP"
        onChange={({ value }) => setDataSiswa({ punyaKip: value }, editable)}
        data={[
          { name: "Ya", value: true },
          { name: "Tidak", value: false },
        ]}
      />
      {punyaKip && (
        <FormInput
          disabled={!editable}
          onChangeText={(noKip) => setDataSiswa({ noKip })}
          value={noKip}
          title="Nomor KIP"
        />
      )}
    </>
  );
};

export default DataPribadiSiswa;
