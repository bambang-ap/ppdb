import { MongoClient } from "mongodb";

export const DB_NAME = "ppdb";

export enum COLLECTIONS {
  SISWA = "siswa",
  AYAH = "ayah",
  IBU = "ibu",
  WALI = "wali",
  TOKEN = "token",
  USER = "user",
  HASIL_TEST = "hasil_test",
}

export const mongoClient = new MongoClient(process.env.MONGODB_URI ?? "");
