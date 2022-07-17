import { MongoClient } from "mongodb";

export const DB_NAME = "ppdb";

export enum COLLECTIONS {
  SISWA = "siswa",
  AYAH = "ayah",
  IBU = "ibu",
  WALI = "wali",
  TOKEN = "token",
  USER = "user",
}

export const mongoClient = new MongoClient(
  `mongodb+srv://uci:1234ABcd@cluster0.aaqcovj.mongodb.net/?retryWrites=true&w=majority`
);
