import axios, { AxiosResponse } from "axios";
import { User } from "@type/User";
import { toQueryParams } from "@helpers";
import { DataSiswa, ShortStudentData } from "@type/Student";

type Message = { msg: string };

export const ApiClient = {
  login(username: string, password: string) {
    return axios.get<User>(
      `/api/login?${toQueryParams({ username, password })}`
    );
  },
  checkToken(token: string) {
    return axios.get<boolean>(`/api/check-token?${toQueryParams({ token })}`);
  },
  insertStudent(body: DataSiswa) {
    return axios.post<DataSiswa, AxiosResponse<Message>>(`/api/students`, body);
  },
  updateStudent(body: DataSiswa) {
    return axios.put<DataSiswa, AxiosResponse<Message>>(`/api/students`, body);
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
    return axios.post<User>(`/api/user`, body);
  },
  listUserData() {
    return axios.get<User[]>(`/api/user`);
  },
};
