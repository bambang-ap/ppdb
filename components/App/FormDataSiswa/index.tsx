import {
  FormInput,
  FormInputDate,
  FormRadio,
  FormTextarea,
  Input,
  InputDate,
  Text,
  Textarea,
} from "@components";
import { DataSiswa, OrangTua } from "@type/Student";
import { FormDataOrangTua } from "./FormOrangTua";

type Props = {
  data: DataSiswa;
};

export const FormDataSiswa = (props: Props) => {
  const { data } = props;

  const { ayah, ibu, wali, ...siswa } = data ?? {};
  const {
    alamat,
    anakKe,
    asalSekolah,
    checked,
    jenKel,
    jenisPendaftaran,
    kebutuhanKhusus,
    kepercayaan,
    kewarganegaraan,
    kodePos,
    modaTransportasi,
    namaLengkap,
    nik,
    nisn,
    noAktaLahir,
    noHp,
    noKip,
    pilihanJurusan,
    punyaKip,
    tanggalLahir,
    tempatLahir,
    tempatTinggal,
    token,
  } = siswa;

  return (
    <>
      <FormInput value={namaLengkap} title="Nama Lengkap" />
      <FormInput value={noHp} title="Nomor HP" />
      <FormRadio
        value={jenKel}
        title="Jenis Kelamin"
        onChange={() => null}
        data={[
          { name: "Laki-laki", value: "1" },
          { name: "Perempuan", value: "2" },
        ]}
      />
      <FormInput value={nisn} title="NISN" />
      <FormInput value={nik} title="NIK" />
      <FormInput value={tempatLahir} title="Tempat Lahir" />
      <FormInputDate value={tanggalLahir} title="Tanggal Lahir" />
      <FormInput value={noAktaLahir} title="Nomor Akta Lahir" />
      <FormRadio
        value={kepercayaan}
        title="Kepercayaan"
        onChange={() => null}
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
        onChange={() => null}
        data={[
          { name: "Indonesia (WNI)", value: "Indonesia" },
          { name: "Asing (WNA)", value: kewarganegaraan },
        ]}
      />
      {kewarganegaraan !== "Indonesia" && (
        <FormInput value={kewarganegaraan} title="Nama Negara" />
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
        onChange={(value) => console.log(value)}
      />
      <FormTextarea value={alamat} title="Alamat" />
      <FormInput value={kodePos} title="Kode POS" />
      <FormRadio
        value={tempatTinggal}
        title="Tempat Tinggal"
        onChange={() => null}
        data={[
          { name: "Bersama Orang Tua", value: '1' },
          { name: "Wali", value: '2' },
          { name: "Kos", value: '3' },
          { name: "Asrama", value: '4' },
          { name: "Panti Asuhan", value: '5' },
          { name: "Lainnya", value: '9' },
        ]}
      />
      <FormInput value={modaTransportasi} title="Moda Transportasi" />
      <FormRadio
        value={modaTransportasi}
        title="Moda Transportasi"
        onChange={() => null}
        data={[
          { name: "Jalan Kaki", value: '1' },
          { name: "Kendaraan Pribadi", value: '2' },
          { name: "Kendaraan Umum / Angkutan", value: '3' },
          { name: "Jemputan Pribadi", value: '4' },
          { name: "Ojek", value: '5' },
          { name: "Lainnya", value: '6' },
        ]}
      />
      <FormInput value={anakKe} title="Anak Keberapa" />
      <FormRadio
        value={punyaKip}
        title="Punya KIP"
        onChange={() => null}
        data={[
          { name: "Ya", value: true },
          { name: "Tidak", value: false },
        ]}
      />
      {punyaKip && <FormInput value={noKip} title="Nomor KIP" />}
      <Text>Data Ayah</Text>
      <FormDataOrangTua data={ayah} />
      <Text>Data Ibu</Text>
      <FormDataOrangTua data={ibu} />
      <Text>Data Wali (Jika ada)</Text>
      <FormDataOrangTua data={wali} />
    </>
  );
};
