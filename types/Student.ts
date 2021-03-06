export type DataSiswa = StudentData & {
  ayah: OrangTua[];
  ibu: OrangTua[];
  wali: OrangTua[];
};

export type ShortStudentData = {
  _id: string;
  alamat: string;
  asalSekolah: string;
  namaLengkap: string;
  nisn: string;
  noHp: string;};

export type StudentData = ShortStudentData & {
  token: string;
  checked: boolean;
  jenKel: string;
  nik: string;
  tempatLahir: string;
  tanggalLahir: string;
  noAktaLahir: string;
  kepercayaan: string;
  kewarganegaraan: string;
  kebutuhanKhusus: string;
  kodePos: number;
  tempatTinggal: string;
  modaTransportasi: string;
  anakKe: string;
  punyaKip: boolean;
  noKip: string;
  pilihanJurusan: string[];
  jenisPendaftaran: string;

  telpRumah: string;
  hpAyah: string;
  hpIbu: string;
  hpWali: string;
  socmed: [fb?: string, ig?: string, tw?: string, yt?: string, tt?: string];
  info: [
    fb?: string,
    ig?: string,
    tw?: string,
    yt?: string,
    teman?: string,
    guruBk?: string,
    guruSmk?: string,
    lain?: string
  ];
};

export interface OrangTua {
  _id: string;
  nama: string;
  nik: string;
  tahunLahir: number;
  pendidikan: string;
  pekerjaan: string;
  penghasilanBulanan: string;
}

export enum StudentKey {
  AYAH = "ayah",
  IBU = "ibu",
  WALI = "wali",
}
