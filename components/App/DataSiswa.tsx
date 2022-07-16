import { Input, Text, TextArea } from "@components";

export const DataSiswa = () => {
  return (
    <>
      <Text>Nama Lengkap</Text>
      <Input />
      <Text>Nomor HP</Text>
      <Input />
      <Text>Jenis Kelamin</Text>
      <Input />
      <Text>NISN</Text>
      <Input />
      <Text>NIK</Text>
      <Input />
      <Text>Tempat Lahir</Text>
      <Input />
      <Text>Tanggal Lahir</Text>
      <Input />
      <Text>Nomor Akta Lahir</Text>
      <Input />
      <Text>Kepercayaan</Text>
      <Input />
      <Text>Kewarganegaraan</Text>
      <Input />
      <Text>Berkebutuhan Khusus</Text>
      <Input />
      <Text>Alamat</Text>
      <TextArea />
      <Text>Kode POS</Text>
      <Input />
      <Text>Tempat Tinggal</Text>
      <Input />
      <Text>Moda Transportasi</Text>
      <Input />
      <Text>Anak Keberapa</Text>
      <Input />
      <Text>Punya KIP</Text>
      <Input />
      <Text>Nomor KIP</Text>
      <Input />
      <Text>Data Ayah</Text>
      <DataOrangTua />
      <Text>Data Ibu</Text>
      <DataOrangTua />
      <Text>Data Wali (Jika ada)</Text>
      <DataOrangTua />
    </>
  );
};

const DataOrangTua = () => {
  return (
    <>
      <Text>Nama</Text>
      <Input />
      <Text>NIK</Text>
      <Input />
      <Text>Tahun Lahir</Text>
      <Input />
      <Text>Pendidikan Terakhir</Text>
      <Input />
      <Text>Pekerjaan</Text>
      <Input />
      <Text>Penghasilan Per Bulan</Text>
      <Input />
    </>
  );
};
