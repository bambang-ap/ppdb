import axios, { AxiosResponse } from "axios";
import { User } from "@type/User";
import { toQueryParams } from "@helpers";
import { DataSiswa, ShortStudentData } from "@type/Student";

type Message<T extends MyObject<unknown> = {}> = { msg: string } & T;

export const ApiClient = {
  login(username: string, password: string) {
    return axios.get<User>(
      `/api/login?${toQueryParams({ username, password })}`
    );
  },
  checkToken(token: string) {
    return axios.get<boolean>(`/api/token?${toQueryParams({ token })}`);
  },
  createToken(reporterId: string) {
    return axios.post<Message<{ token: string }>>(`/api/token`, { reporterId });
  },
  insertStudent(body: DataSiswa) {
    return axios.post<Message>(`/api/students`, body);
  },
  updateStudent(body: DataSiswa) {
    return axios.put<Message>(`/api/students`, body);
  },
  getStudent(id: string) {
    return axios.get<DataSiswa>(`/api/students?${toQueryParams({ id })}`);
  },
  listStudents() {
    return axios.get<ShortStudentData[]>(`/api/students`);
  },
  updateUserData(body: User) {
    return axios.put<User>(`/api/user`, body);
  },
  insertUserData(body: User) {
    return axios.post<Message>(`/api/user`, body);
  },
  listUserData() {
    return axios.get<User[]>(`/api/user`);
  },
  getPenilaian(id: string) {
    return axios.get<[string, string][]>(`/api/penilaian?id=${id}`);
  },
  updatePenilaian(body: { id: string; forms: [string, string][] }) {
    return axios.put<Message>(`/api/penilaian`, body);
  },
};
