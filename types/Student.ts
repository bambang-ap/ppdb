export interface DataSiswa {
  _id: string;
  token: string;
  checked: boolean;
  namaLengkap: string;
  noHp: string;
  jenKel: string;
  nisn: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  noAktaLahir: string;
  kepercayaan: string;
  kewarganegaraan: string;
  kebutuhanKhusus: string;
  alamat: string;
  kodePos: number;
  tempatTinggal: string;
  modaTransportasi: string;
  anakKe: string;
  punyaKip: boolean;
  noKip: string;
  pilihanJurusan: string[];
  jenisPendaftaran: string;
  asalSekolah: string;
  ayah: OrangTua[];
  ibu: OrangTua[];
  wali: OrangTua[];
}

export interface OrangTua {
  _id: string;
  nama: string;
  nik: string;
  tahunLahir: number;
  pendidikan: string;
  pekerjaan: string;
  penghasilanBulanan: string;
  hp: string;
}