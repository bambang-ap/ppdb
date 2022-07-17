export interface User {
  _id: string;
  username: string;
  password: string;
  name: string;
  image: string;
  role: USER_ROLES;
}

export enum USER_ROLES {
  ADMIN = "admin",
  SISWA = "siswa",
}
