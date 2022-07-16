import axios from "axios";
import { User } from "@type/User";
import { toQueryParams } from "@helpers";
import { DataSiswa } from "@type/Student";

export const ApiClient = {
  login(username: string, password: string) {
    return axios.get<User>(
      `/api/login?${toQueryParams({ username, password })}`
    );
  },
  checkToken(token: string) {
    return axios.get<boolean>(`/api/check-token?${toQueryParams({ token })}`);
  },
  listStudents() {
    return axios.get<DataSiswa[]>(`/api/students`);
  },
  getStudent(id: string) {
    return axios.get<DataSiswa>(`/api/students?${toQueryParams({ id })}`);
  },
};
