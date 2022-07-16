export interface DataSiswa {
  wali: OrangTua;
  ayah: OrangTua;
  ibu: OrangTua;
  siswa: Siswa;
}

export interface Siswa {
  id: string;
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
  kebutuhanKhusus: boolean;
  alamat: string;
  kodePos: string;
  tempatTinggal: string;
  modaTransportasi: string;
  anakKe: string;
  punyaKip: boolean;
  noKip: string;
  telponRumah: string;
  pilihanJurusan: string[];
  jenisPendaftaran: string;
  asalSekolah: string;
}

export interface OrangTua {
  nama: string;
  nik: string;
  tahunLahir: string;
  pendidikan: string;
  pekerjaan: string;
  penghasilanBulanan: string;
  hp: string;
}