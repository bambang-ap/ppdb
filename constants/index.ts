export * from "./colors";
export * from "./sizes";

export enum Sheets {
  USER = "users",
  TOKEN = "token",
  STUDENTS = "students",
}

export const eID = "{id}";

export enum PATHS {
  LOGIN = "/login",
  REGISTER = "/register",
  APP = "/app",
  // Add id to SISWA path
  SISWA = "/app/siswa",
  SISWA_ID = "/app/siswa/{id}",
  PENILAIAN_SISWA = "/app/siswa/{id}/penilaian",
  USERS = "/app/users",
  SETTINGS = "/app/users/settings",
}
